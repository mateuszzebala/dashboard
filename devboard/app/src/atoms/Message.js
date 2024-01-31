import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { FiX } from 'react-icons/fi'

const StyledWrapper = styled.div`
    display: inline-flex;
    gap: 5px;
    padding: 10px;
    width: 300px;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: 25px;
    opacity: ${({ show }) => (show ? 1 : 0)};
    transition: opacity 0.5s, transform 0.5s;
    transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(100%)')};
    outline: 3px solid
        ${({ error, warning, success, theme }) => {
            if (error) return theme.error
            if (warning) return theme.warning
            if (success) return theme.success
            return theme.primary
        }}88;
    background-color: ${({ error, warning, success, theme }) => {
        if (error) return theme.error
        if (warning) return theme.warning
        if (success) return theme.success
        return theme.primary
    }};
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
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
    transition: background 0.1s;
    border-radius: 50%;

    &:hover {
        background-color: ${({ theme }) => theme.secondary}44;
    }
`

export const Message = ({ id, text = '', onClose, error = false, success = false, warning = false }) => {
    const [show, setShow] = React.useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 10000)
    })

    React.useEffect(() => {
        if (!show) {
            setTimeout(() => {
                onClose(id)
            }, 500)
        }
    }, [show])

    return (
        <StyledWrapper show={toBoolStr(show)} error={toBoolStr(error)} success={toBoolStr(success)} warning={toBoolStr(warning)}>
            <StyledText>{text}</StyledText>
            <StyledExitButton
                onClick={() => {
                    setShow(false)
                }}
            >
                <FiX />
            </StyledExitButton>
        </StyledWrapper>
    )
}
