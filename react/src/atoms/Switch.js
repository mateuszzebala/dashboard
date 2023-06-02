import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'

const StyledWrapper = styled.button`
    background-color: ${({ theme, value }) =>
        value ? theme.switch.on : theme.switch.off};
    border: 0;
    transition: background-color 0.3s;
    border-radius: ${({ size }) => size * 28 + 'px'};
    height: ${({ size }) => size * 28 + 'px'};
    width: ${({ size }) => size * 48 + 'px'};
    padding: ${({ size }) => size * 4 + 'px'};
    cursor: pointer;
`
const StyledDot = styled.div`
    width: ${({ size }) => size * 20 + 'px'};
    height: ${({ size }) => size * 20 + 'px'};
    background-color: ${({ theme }) => theme.switch.dot};
    border-radius: 50%;
    transition: transform 0.3s;
    transform: translateX(
        ${({ value, size }) => (value ? size * 20 + 'px' : 0)}
    );
`

export const Switch = ({ value, setValue, size = 1 }) => {
    return (
        <StyledWrapper
            onClick={() => {
                setValue((prev) => !prev)
            }}
            value={toBoolStr(value)}
            size={size}
        >
            <StyledDot value={toBoolStr(value)} size={size} />
        </StyledWrapper>
    )
}
