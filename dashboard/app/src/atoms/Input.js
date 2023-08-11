import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { useGlobalKey } from '../utils/hooks'

const StyledWrapper = styled.div`
    display: inline-flex;
    position: relative;
    padding: 8px;
    min-width: 300px;
    max-width: 300px;
    border-radius: 3px;
    border: 3px solid ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
`

const StyledLabel = styled.label`
    position: absolute;
    top: -3px;
    left: 5px;
    padding: 0 10px;
    font-size: 10px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
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
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    &:focus {
        outline: none;
    }
    &::-webkit-file-upload-button {
        display: none;
    }
    &:disabled {
        color: ${({ theme }) => theme.tertiary};
    }
`

const StyledTextarea = styled.textarea`
    border: 0;
    font-size: 20px;
    width: 100%;
    height: 200px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
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
    onKey,
    ...props
}) => {
    const [tempValue, setTempValue] = React.useState(value)
    const inputRef = React.useRef()

    useGlobalKey(
        () => {
            inputRef.current.focus()
        },
        onKey,
        onKey
    )

    React.useEffect(() => {
        value !== tempValue && setTempValue(value)
    }, [value])

    return (
        <StyledWrapper>
            {icon && <StyledIcon>{icon}</StyledIcon>}
            <StyledLabel label={toBoolStr(label)}>{label || ''}</StyledLabel>
            {textarea ? (
                <StyledTextarea
                    type={type}
                    ref={inputRef}
                    value={tempValue}
                    onChange={(e) => {
                        setTempValue(e.target.value)
                        setValue(e.target.value)
                    }}
                    {...props}
                />
            ) : (
                <StyledInput
                    type={type}
                    value={tempValue}
                    ref={inputRef}
                    onChange={(e) => {
                        setTempValue(e.target.value)
                        type === 'file' &&
                            setValue(e.target.files ? e.target.files[0] : '')
                        type !== 'file' && setValue(e.target.value)
                    }}
                    {...props}
                />
            )}
        </StyledWrapper>
    )
}
