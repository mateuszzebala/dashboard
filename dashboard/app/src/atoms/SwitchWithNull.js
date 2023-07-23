import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'

const StyledWrapper = styled.button`
    background-color: ${({
        theme: {
            switch: { on, off },
            error,
        },
        value,
    }) => (value === null ? error : value ? on : off)};
    border: 0;
    transition: background-color 0.3s, outline 0.1s;
    border-radius: ${({ size }) => size * 7 + 'px'};
    height: ${({ size }) => size * 28 + 'px'};
    width: ${({ size }) => size * 68 + 'px'};
    padding: ${({ size }) => size * 4 + 'px'};
    cursor: pointer;
    outline: 0px solid
        ${({ theme, value }) => (value ? theme.switch.on : theme.switch.off)}88;
    &:focus,
    &:hover {
        outline-width: ${({ size }) => size * 2 + 'px'};
    }
`
const StyledDot = styled.div`
    width: ${({ size }) => size * 20 + 'px'};
    height: ${({ size }) => size * 20 + 'px'};
    background-color: ${({ theme }) => theme.switch.dot};
    border-radius: ${({ size }) => size * 5 + 'px'};
    transition: transform 0.3s;
    transform: ${({ value, size }) =>
        'translateX(' +
        (value === null ? size * 20 + 'px' : value ? size * 40 + 'px' : 0) +
        ')'};
`

export const SwitchWithNull = ({ value, setValue, size = 1 }) => {
    const [vector, setVector] = React.useState(1)

    React.useEffect(() => {
        value !== null && value === true && setVector(-1)
        value !== null && value === false && setVector(1)
    }, [value])

    return (
        <StyledWrapper
            onClick={() => {
                setValue(value !== null ? null : vector > 0 ? true : false)
            }}
            value={value === null ? value : toBoolStr(value)}
            size={size}
        >
            <StyledDot
                value={value === null ? value : toBoolStr(value)}
                size={size}
            />
        </StyledWrapper>
    )
}
