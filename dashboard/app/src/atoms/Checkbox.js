import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { BsCheck2 } from 'react-icons/bs'

const StyledWrapper = styled.button`
    display: grid;
    place-items: center;
    background-color: ${({ value, theme }) =>
        value ? theme.checkbox : 'white'};
    font-size: ${({ size }) => size * 20 + 'px'};
    padding: 0px;
    border: ${({ size }) => size * 3 + 'px'} solid
        ${({ theme }) => theme.checkbox};
    border-radius: ${({ size }) => size * 5 + 'px'};
    color: white;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    svg {
        stroke-width: ${({ size }) => size * 0.5 + 'px'};
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
