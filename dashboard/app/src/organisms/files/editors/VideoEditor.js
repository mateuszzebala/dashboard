import React from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { ENDPOINTS } from '../../../api/endpoints'
import { Button } from '../../../atoms/Button'
import { BsPause, BsPlay } from 'react-icons/bs'

const StyledTools = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`

const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`

const StyledPlayerWrapper = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
`
const StyledVideo = styled.video`
    max-height: 90%;
    max-width: 90%;
`

export const VideoEditor = () => {
    const [searchParams] = useSearchParams()
    const videoRef = React.useRef()
    const [play, setPlay] = React.useState(false)

    React.useEffect(() => {
        play && videoRef.current.play()
        !play && videoRef.current.pause()
    }, [play])

    return (
        <StyledWrapper>
            <StyledPlayerWrapper>
                <StyledVideo
                    ref={videoRef}
                    play={play}
                    src={ENDPOINTS.files.file(searchParams.get('path'))}
                ></StyledVideo>
            </StyledPlayerWrapper>
            <StyledTools>
                <Button
                    onClick={() => {
                        setPlay((prev) => !prev)
                    }}
                    circle
                    size={1.3}
                    icon={play ? <BsPause /> : <BsPlay />}
                />
            </StyledTools>
        </StyledWrapper>
    )
}
