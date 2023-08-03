import React from 'react'
import styled from 'styled-components'
import clockImage from '../assets/atoms/clock.png'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { Loading } from './Loading'

const StyledClockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const StyledAnalogClock = styled.div`
    background-image: url(${({ bg }) => bg});
    width: 300px;
    height: 300px;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    box-shadow: 0 0 10px -5px ${({ theme }) => theme.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
`

const StyledAnalogClockDot = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 10px -5px ${({ theme }) => theme.primary};
    z-index: 1;
`

const StyledHourHand = styled.div`
    width: 10px;
    height: 60px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 10px;
    transform: ${({ hour }) =>
        hour > 12
            ? `rotate(${(hour - 12) * 30 - 180}deg)`
            : `rotate(${hour * 30 - 180}deg)`};
    transform-origin: top center;
    position: absolute;
    top: 50%;
    left: calc(50% - 5px);
`

const StyledMinuteHand = styled.div`
    width: 8px;
    height: 80px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 8px;
    transform: ${({ minute }) => `rotate(${minute * 6 - 180}deg)`};
    transform-origin: top center;
    position: absolute;
    top: 50%;
    left: calc(50% - 4px);
`

const StyledSecondHand = styled.div`
    width: 4px;
    height: 100px;
    background-color: ${({ theme }) => theme.accent};
    border-radius: 8px;
    transform: ${({ second }) => `rotate(${second * 6 - 180}deg)`};
    transform-origin: top center;
    position: absolute;
    top: 50%;
    left: calc(50% - 2px);
`

const StyledDigitalClock = styled.div`
    text-align: center;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledTimeZone = styled.span`
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    width: 100%;
    display: inline-block;
`

export const ServerClock = () => {
    const [time, setTime] = React.useState({
        time_zone: 0,
        hour: 19,
        minute: 30,
        second: 10,
    })
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        FETCH(ENDPOINTS.other.time()).then((data) => {
            setTime(data.data)
            setLoading(false)
        })
        const interval = setInterval(() => {
            setTime((prev) => {
                let { second, minute, hour } = prev

                second += 1
                if (second >= 60) {
                    second = 0
                    minute += 1
                }
                if (minute >= 60) {
                    minute = 0
                    hour += 1
                }
                if (hour >= 24) {
                    hour = 0
                }

                return {
                    ...prev,
                    second,
                    minute,
                    hour,
                }
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    if (loading) return <Loading />
    return (
        <StyledClockWrapper>
            <StyledTimeZone>UTC {time.time_zone}</StyledTimeZone>
            <StyledAnalogClock bg={clockImage}>
                <StyledHourHand hour={time.hour} />
                <StyledMinuteHand minute={time.minute} />
                <StyledSecondHand second={time.second} />
                <StyledAnalogClockDot />
            </StyledAnalogClock>
            <StyledDigitalClock>
                {time.hour.toString().padStart(2, '0')}:
                {time.minute.toString().padStart(2, '0')}:
                {time.second.toString().padStart(2, '0')}
            </StyledDigitalClock>
        </StyledClockWrapper>
    )
}
