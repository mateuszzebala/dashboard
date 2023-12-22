import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../../utils/utils'

const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
`
const StyledOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 5px;
    border-radius: 10px;
`

const StyledRadio = styled.button`
    width: 20px;
    height: 20px;
    background-color: ${({ theme, checked }) =>
        checked ? theme.primary : 'white'};
    border: 3px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    cursor: pointer;
`
const StyledLabel = styled.div`
    font-size: 25px;
`

export const Radio = ({ checked }) => {
    return <StyledRadio checked={toBoolStr(checked)} />
}

export const RadioGroup = ({ value, setValue, options }) => {
    return (
        <StyledWrapper>
            {Object.keys(options).map((key) => (
                <StyledOption
                    key={key}
                    onClick={() => {
                        setValue(key)
                    }}
                >
                    <Radio checked={key === value} />
                    <StyledLabel>{options[key]}</StyledLabel>
                </StyledOption>
            ))}
        </StyledWrapper>
    )
}
