import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'

const StyledWrapper = styled.div`
    display: inline-flex;
    position: relative;
    padding: 8px;
    min-width: 300px;
    max-width: 300px;
    border-radius: 3px;
    border: 3px solid ${({ theme }) => theme.input.border};
    background-color: ${({ theme }) => theme.input.background};
    color: ${({ theme }) => theme.input.font};
`

const StyledLabel = styled.label`
    position: absolute;
    top: -3px;
    left: 5px;
    padding: 0 10px;
    font-size: 10px;
    background-color: ${({ theme }) => theme.input.background};
    color: ${({ theme }) => theme.input.font};
`
const StyledIcon = styled.span`
    display: grid;
    place-items: center;
    padding: 0 5px;
`

const StyledInput = styled.input`
    border: 0;
    font-size: 20px;
    width: 100%;
    background-color: ${({ theme }) => theme.input.background};
    color: ${({ theme }) => theme.input.font};
    &:focus {
        outline: none;
    }
    &::-webkit-file-upload-button {
        display: none;
    }
`

const StyledTextarea = styled.textarea`
    border: 0;
    font-size: 20px;
    width: 100%;
    background-color: ${({ theme }) => theme.input.background};
    color: ${({ theme }) => theme.input.font};
    &:focus {
        outline: none;
    }
    &::-webkit-file-upload-button {
        display: none;
    }
`

export const Input = ({
    value,
    setValue,
    label,
    textarea,
    type = 'text',
    icon,

    ...props
}) => {
    return (
        <StyledWrapper>
            {icon && <StyledIcon>{icon}</StyledIcon>}
            <StyledLabel label={toBoolStr(label)}>{label || ''}</StyledLabel>
            {textarea ? (
                <StyledTextarea
                    type={type}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    {...props}
                />
            ) : (
                <StyledInput
                    type={type}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    {...props}
                />
            )}
        </StyledWrapper>
    )
}
