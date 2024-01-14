import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ size }) => size * 20 + 'px'};
    width: 100%;
    min-width: 200px;
`

const StyledDraggableDot = styled.button`
    width: ${({ size }) => size * 18 + 'px'};
    height: ${({ size }) => size * 18 + 'px'};
    background-color: ${({ theme }) => theme.primary};
    border-radius: 50%;
    cursor: move;
    position: absolute;
    border: 0;
    left: ${({ x }) => x + '%'};
    outline: 0px solid ${({ theme }) => theme.primary}88;
    transition: outline-width 0.1s;
    &:focus,
    &:hover {
        outline-width: ${({ size }) => size * 3 + 'px'};
    }
`

const StyledLine = styled.div`
    height: ${({ size }) => size * 4 + 'px'};
    border-radius: ${({ size }) => size * 4 + 'px'};
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.tertiary};
    display: flex;
    align-items: center;
`
const StyledRange = styled.div`
    height: ${({ size }) => size * 6 + 'px'};
    border-radius: ${({ size }) => size * 6 + 'px'};
    width: calc(
        ${({ width }) => width + '%'} + ${({ size }) => size * 5 + 'px'}
    );
    background-color: ${({ theme }) => theme.primary};
`

export const Range = ({
    value = 0,
    setValue = () => {},
    min = 0,
    max = 100,
    size = 1,
}) => {
    const [x, setX] = React.useState(0)
    const lineRef = React.useRef()
    const mouseUpListener = React.useRef(null)
    const mouseMoveListener = React.useRef(null)

    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mousemove', handleValueChange)
    }

    const handleMouseDown = () => {
        mouseUpListener.current = document.addEventListener(
            'mouseup',
            handleMouseUp
        )
        mouseMoveListener.current = document.addEventListener(
            'mousemove',
            handleValueChange
        )
    }
    const handleValueChange = (e) => {
        const bcr = lineRef.current.getBoundingClientRect()
        const width = bcr.width - 18 * size
        const px = e.clientX - bcr.x
        const range = max - min
        let val = Math.round(range * (px / width)) + min
        if (val < min) val = min
        if (val > max) val = max
        setX(((((val - min) / range) * width) / bcr.width) * 100)
        setValue(val)
    }

    React.useEffect(() => {
        const bcr = lineRef.current.getBoundingClientRect()
        const width = bcr.width - 18 * size
        const range = max - min
        setX(((((value - min) / range) * width) / bcr.width) * 100)
    }, [value])

    return (
        <StyledWrapper size={size}>
            <StyledLine size={size} ref={lineRef} onClick={handleValueChange}>
                <StyledRange
                    width={x}
                    size={size}
                    onClick={handleValueChange}
                />
                <StyledDraggableDot
                    size={size}
                    onMouseDown={handleMouseDown}
                    x={x}
                />
            </StyledLine>
        </StyledWrapper>
    )
}
