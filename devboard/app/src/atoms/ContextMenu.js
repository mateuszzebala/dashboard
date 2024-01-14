import React from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../utils/hooks'

const StyledWrapper = styled.div`
    display: inline-block;
`
const StyledContextMenu = styled.div`
    position: fixed;
    left: ${({ x }) => x + 'px'};
    top: ${({ y }) => y + 'px'};
    background-color: ${({ theme }) => theme.secondary};
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    border-radius: 2px 10px 10px 10px;
    z-index: 20;
    gap: 8px;
`
const StyledContextMenuItem = styled.button`
    background-color: transparent;
    border: 0;
    font-size: 20px;
    display: inline-flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s, outline 0.3s;
    border-radius: 5px;
    padding: 10px 30px;
    outline: 0 solid ${({ theme }) => theme.tertiary}44;
    span {
        font-size: 20px;
    }
    &:hover {
        outline-width: 4px;
        background-color: ${({ theme }) => theme.tertiary}44;
    }
`

const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`

const StyledText = styled.span`
    font-size: 17px;
`

export const ContextMenu = ({ data = [], children, wrapper=StyledWrapper, ...props }) => {
    const [show, setShow] = React.useState(false)
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const thisRef = React.useRef()
    const handleContextMenu = (e) => {
        if (!show) e.preventDefault()
        setPosition({ x: e.clientX, y: e.clientY })
        setShow(true)
    }
    useOnClickOutside(thisRef, () => {
        setShow(false)
    })
    const Wrapper = wrapper
    return (
        <>
            <Wrapper {...props} onContextMenu={handleContextMenu}>
                {children}
            </Wrapper>
            {show && (
                <StyledContextMenu x={position.x} y={position.y} ref={thisRef}>
                    {data.map((item) => (
                        <StyledContextMenuItem
                            onClick={item.todo ? item.todo : () => {}}
                            key={item.text}
                        >
                            <StyledIcon>
                                {item.icon ? item.icon : <span></span>}
                            </StyledIcon>
                            <StyledText>{item.text}</StyledText>
                            <span></span>
                        </StyledContextMenuItem>
                    ))}
                </StyledContextMenu>
            )}
        </>
    )
}
