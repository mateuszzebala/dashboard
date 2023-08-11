import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.span`
    display: inline-block;
    align-items: center;
    justify-content: center;
`

const StyledTooltip = styled.div`
    position: fixed;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
    padding: 5px;
    border-radius: 5px;
    left: ${({ x }) => x + 10 + 'px'};
    transform: translateX(-50%);
    top: ${({ y }) => y + 10 + 'px'};
    opacity: 0;
    max-width: 300px;
    overflow: hidden;
    white-space: pre-wrap;
    z-index: 10;
    font-size: 18px;
    padding: 8px 12px;
    text-align: center;
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    animation: fadein 0.3s forwards;
    animation-delay: 1s;
`

export const Tooltip = ({ children, text = '' }) => {
    const [show, setShow] = React.useState(false)
    const [position, setPosition] = React.useState(false)

    const handleMouseEnter = () => {
        setShow(true)
    }
    const handleMouseLeave = () => {
        setShow(false)
    }
    const handleMouseMove = (e) => {
        setPosition({
            x: e.pageX,
            y: e.pageY,
        })
    }

    return (
        <StyledWrapper
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {children}
            {show && text && (
                <StyledTooltip x={position.x} y={position.y}>
                    {text}
                </StyledTooltip>
            )}
        </StyledWrapper>
    )
}
