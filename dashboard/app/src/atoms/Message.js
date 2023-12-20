import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { HiXMark } from 'react-icons/hi2'
import { FiX } from 'react-icons/fi'

const StyledWrapper = styled.div`
    display: inline-flex;
    gap: 5px;
    padding: 15px;
    width: 300px;
    border-radius: 5px;
    justify-content: space-between;
    font-size: 25px;
    background-color: ${({ error, warning, success, theme }) => {
        if (error) return theme.error
        if (warning) return theme.warning
        if (success) return theme.success
        return theme.primary
    }};
    box-shadow: 0 0 8px -3px ${({ theme }) => theme.primary};
`
const StyledText = styled.span`
    font-size: 17px;
    color: ${({ theme }) => theme.secondary};
`

const StyledExitButton = styled.button`
    background-color: transparent;
    border: 0;
    color: ${({ theme }) => theme.secondary};
    display: grid;
    place-items: center;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
`

export const Message = ({
    id,
    text = '',
    onClose,
    error = false,
    success = false,
    warning = false,
}) => {
    React.useEffect(() => {
        setTimeout(() => {
            onClose(id)
        }, 10000)
    })

    return (
        <StyledWrapper
            error={toBoolStr(error)}
            success={toBoolStr(success)}
            warning={toBoolStr(warning)}
        >
            <StyledText>{text}</StyledText>
            <StyledExitButton
                onClick={() => {
                    onClose(id)
                }}
            >
                <FiX />
            </StyledExitButton>
        </StyledWrapper>
    )
}
