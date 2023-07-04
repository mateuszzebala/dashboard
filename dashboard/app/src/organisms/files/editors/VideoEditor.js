import React from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { ENDPOINTS } from '../../../api/endpoints'

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
    return (
        <StyledPlayerWrapper>
            <StyledVideo
                controls
                src={ENDPOINTS.files.file(searchParams.get('path'))}
            ></StyledVideo>
        </StyledPlayerWrapper>
    )
}
