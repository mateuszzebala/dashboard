import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { BsCheck2 } from 'react-icons/bs'

const StyledWrapper = styled.button`
    display: grid;
    place-items: center;
    background-color: ${({ value, theme }) =>
        value ? theme.primary : 'white'};
    font-size: ${({ size }) => size * 20 + 'px'};
    padding: 0px;
    border: ${({ size }) => size * 3 + 'px'} solid
        ${({ theme }) => theme.primary};
    border-radius: ${({ size }) => size * 5 + 'px'};
    color: white;
    transition: background-color 0.3s, color 0.3s, outline-width 0.1s;
    outline: 0px solid ${({ theme }) => theme.primary}88;
    cursor: pointer;

    svg {
        stroke-width: ${({ size }) => size * 0.5 + 'px'};
    }
    &:hover {
        outline-width: ${({ size }) => size * 2 + 'px'};
    }
`

export const Checkbox = ({ value, setValue, size = 1 }) => {
    return (
        <StyledWrapper
            size={size}
            onClick={() => {
                setValue((prev) => !prev)
            }}
            value={toBoolStr(value)}
        >
            <BsCheck2 />
        </StyledWrapper>
    )
}
