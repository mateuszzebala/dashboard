import React from 'react'
import styled from 'styled-components'
import { Loading } from './Loading'

const StyledWrapper = styled.div`
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: ${({ theme }) => theme.secondary};
`

const LoadingBar = styled.div`
    height: 10px;
    position: fixed;
    top: 3px;
    left: 3px;
    background-color: ${({ theme }) => theme.primary};
    @keyframes loading {
        from {
            width: 0;
        }
        to {
            width: calc(100% - 6px);
        }
    }
    animation: loading ${({ time }) => time + 's'} forwards;
`

export const Curtain = ({ loading = false, time = 3 }) => {
    if (!loading) return ''
    return (
        <StyledWrapper>
            <Loading size={3} />
            <LoadingBar time={time} />
        </StyledWrapper>
    )
}
