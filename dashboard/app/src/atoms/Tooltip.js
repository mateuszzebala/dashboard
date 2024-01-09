import React from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
const StyledWrapper = styled.span`
    display: inline-block;
`

const StyledTooltip = styled.div`
    position: fixed;
    text-overflow: ellipsis;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
    border-radius: 5px;
    left: ${({ x }) => x + 10 + 'px'};
    transform: translateX(-50%);
    top: ${({ y }) => y + 10 + 'px'};
    opacity: 0;
    max-width: 300px;
    overflow: hidden;
    white-space: pre-wrap;
    z-index: 10;
    font-size: 16px;
    user-select: none;
    padding: 5px 10px;
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

export const Tooltip = ({ children, text = '', wrapper: Wrapper = StyledWrapper, ...props }) => {
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
        <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} {...props}>
            {children}
            {show && !isMobile && text && (
                <StyledTooltip x={position.x} y={position.y}>
                    {text}
                </StyledTooltip>
            )}
        </Wrapper>
    )
}
