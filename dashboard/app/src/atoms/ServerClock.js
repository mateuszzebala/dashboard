import React from 'react'
import styled from 'styled-components'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { Loading } from './Loading'

const StyledClockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
`

const StyledAnalogClock = styled.div`
    background-image: url(${({ bg }) => bg});
    width: 400px;
    height: 400px;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
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
            <StyledAnalogClock>
                <StyledHourHand hour={time.hour} />
                <StyledMinuteHand minute={time.minute} />
                <StyledSecondHand second={time.second} />
                <StyledAnalogClockDot />
                <ClockBoard />
            </StyledAnalogClock>
            <StyledDigitalClock>
                {time.hour.toString().padStart(2, '0')}:
                {time.minute.toString().padStart(2, '0')}:
                {time.second.toString().padStart(2, '0')}
            </StyledDigitalClock>
        </StyledClockWrapper>
    )
}

const StyledClockBoard = styled.svg`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    path {
        fill: ${({ theme }) => theme.primary};
        stroke: ${({ theme }) => theme.primary};
    }
    text {
        fill: ${({ theme }) => theme.primary};
    }
`

const ClockBoard = () => {
    return (
        <StyledClockBoard
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
            version="1.1"
            viewBox="0 0 400 400"
            xmlSpace="preserve"
        >
            <defs>
                <path d="M650.615 266.668H995.469V483.074H650.615z"></path>
                <path d="M714.762 135.252H842.6099999999999V214.72500000000002H714.762z"></path>
                <path d="M695.017 118.469H704.889V136.733H695.017z"></path>
            </defs>
            <g>
                <text
                    xmlSpace="preserve"
                    style={{}}
                    x="175.236"
                    y="30"
                    fill="#000"
                    fontSize="41"
                    fontStretch="normal"
                    fontStyle="normal"
                    fontVariant="normal"
                    fontWeight="bold"
                    transform="scale(.99716 1.00285)"
                >
                    <tspan x="175.236" y="30.074" strokeWidth="0.313">
                        12
                    </tspan>
                </text>
                <text
                    xmlSpace="preserve"
                    style={{}}
                    x="0"
                    y="212.735"
                    fill="#000"
                    strokeWidth="0.313"
                    fontSize="41.722"
                    fontStretch="normal"
                    fontStyle="normal"
                    fontVariant="normal"
                    fontWeight="bold"
                    transform="scale(.99716 1.00285)"
                >
                    <tspan x="-1.467" y="212.735" strokeWidth="0.313">
                        9
                    </tspan>
                </text>
                <text
                    xmlSpace="preserve"
                    style={{}}
                    x="188.519"
                    y="398.397"
                    fill="#000"
                    strokeWidth="0.313"
                    fontSize="41.722"
                    fontStretch="normal"
                    fontStyle="normal"
                    fontVariant="normal"
                    fontWeight="bold"
                    transform="scale(.99716 1.00285)"
                >
                    <tspan x="188.519" y="398.397" strokeWidth="0.313">
                        6
                    </tspan>
                </text>
                <text
                    xmlSpace="preserve"
                    style={{}}
                    x="380.359"
                    y="212.735"
                    fill="#000"
                    strokeWidth="0.313"
                    fontSize="41.722"
                    fontStretch="normal"
                    fontStyle="normal"
                    fontVariant="normal"
                    fontWeight="bold"
                    transform="scale(.99716 1.00285)"
                >
                    <tspan x="370.359" y="212.735" strokeWidth="0.313">
                        3
                    </tspan>
                </text>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M99.576 375.133l8.24-15.412"
                ></path>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M25.972 300.782l14.121-8.676"
                ></path>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M26.184 99.72l12.929 7.444"
                ></path>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M99.614 26.26l7.701 12.857"
                ></path>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M290.987 41.131l8.625-15.18"
                ></path>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M358.637 107.57l14.993-8.95"
                ></path>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M372.197 300.454l-13.76-8.074"
                ></path>
                <path
                    fill="#c83737"
                    stroke="#000"
                    strokeDasharray="none"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeOpacity="1"
                    strokeWidth="3.27"
                    d="M299.445 374.496l-8.423-14.755"
                ></path>
            </g>
        </StyledClockBoard>
    )
}
