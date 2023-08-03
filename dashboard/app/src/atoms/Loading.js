import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    width: ${({ size }) => size * 50 + 'px'};
    height: ${({ size }) => size * 50 + 'px'};
    display: flex;
    align-items: center;
    justify-content: center;
`

const BigCircle = styled.div`
    border: ${({ size }) => size * 4 + 'px'} solid
        ${({ theme }) => theme.primary};
    width: ${({ size }) => size * 50 + 'px'};
    height: ${({ size }) => size * 50 + 'px'};
    border-radius: 50%;
    position: relative;
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    animation: rotate ${({ speed }) => speed + 's'} linear infinite;
`
const MiddleCircle = styled.div`
    border-top: ${({ size }) => size * 8 + 'px'} solid
        ${({ theme }) => theme.primary};
    border-left: ${({ size }) => size * 8 + 'px'} solid transparent;
    border-right: ${({ size }) => size * 8 + 'px'} solid transparent;
    border-bottom: ${({ size }) => size * 8 + 'px'} solid transparent;
    width: ${({ size }) => size * 43 + 'px'};
    height: ${({ size }) => size * 43 + 'px'};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const SmallCircle = styled.div`
    border: ${({ size }) => size * 4 + 'px'} solid
        ${({ theme }) => theme.primary};
    width: ${({ size }) => size * 34 + 'px'};
    height: ${({ size }) => size * 34 + 'px'};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const Loading = ({ size = 1, speed = 1 }) => {
    return (
        <StyledWrapper>
            <BigCircle size={size} speed={speed}>
                <MiddleCircle size={size}>
                    <SmallCircle size={size}></SmallCircle>
                </MiddleCircle>
            </BigCircle>
        </StyledWrapper>
    )
}
