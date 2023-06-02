import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { BsCheckLg } from 'react-icons/bs'

const StyledWrapper = styled.button`
    display: grid;
    place-items: center;
    background-color: ${({ value, theme }) =>
        value ? theme.checkbox : 'white'};
    font-size: 20px;
    padding: 0px;
    border: 3px solid ${({ theme }) => theme.checkbox};
    border-radius: 5px;
    color: white;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    svg {
        stroke-width: 0.5;
    }
`

export const Checkbox = ({ value, setValue }) => {
    return (
        <StyledWrapper
            onClick={() => {
                setValue((prev) => !prev)
            }}
            value={toBoolStr(value)}
        >
            <BsCheckLg />
        </StyledWrapper>
    )
}
