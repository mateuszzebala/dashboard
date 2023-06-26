import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { HiXMark } from 'react-icons/hi2'

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
        return theme.message.background
    }};
    box-shadow: 0 0 8px -3px black;
`
const StyledText = styled.span`
    font-size: 17px;
    color: ${({ theme }) => theme.message.font};
`

const StyledExitButton = styled.button`
    background-color: transparent;
    border: 0;
    color: ${({ theme }) => theme.message.font};
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

    React.useEffect(()=>{
        setTimeout(()=>{onClose(id)}, 10000)
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
                <HiXMark />
            </StyledExitButton>
        </StyledWrapper>
    )
}
