import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { useGlobalKey } from '../utils/hooks'

const StyledWrapper = styled.div`
    display: inline-flex;
    position: relative;
    padding: ${({size})=>size*8+'px'};
    min-width: ${({size})=>size*300+'px'};
    height: ${({textarea, size}) => textarea ? 'auto' : size * 45 + 'px'};
    max-width: ${({size})=>size*300+'px'};
    border-radius: ${({size})=>size*3+'px'};
    border: ${({size})=>size*2.5+'px'} solid ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
`

const StyledLabel = styled.label`
    position: absolute;
    top: ${({size})=>size*(-3)+'px'};
    left: ${({size})=>size*5+'px'};
    user-select: none;
    padding: 0 ${({size})=>size*10+'px'};
    font-size: ${({size})=>size*10+'px'};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
`
const StyledIcon = styled.span`
    display: grid;
    place-items: center;
    padding: 0 ${({size})=>size*5+'px'};
`

const StyledInput = styled.input`
    border: 0;
    font-size: ${({size})=>size*20+'px'};
    width: 100%;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    caret-color:${({ theme }) => theme.primary};

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
    caret-color: ${({ theme }) => theme.primary};
    font-size: ${({ size })=> size * 20 + 'px'};
    width: 100%;
    height: ${({ size })=> size * 200 + 'px'};
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
    size=1,
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
        <StyledWrapper size={size} textarea={toBoolStr(textarea)}>
            {icon && <StyledIcon size={size}>{icon}</StyledIcon>}
            <StyledLabel size={size} label={toBoolStr(label)}>{label || ''}</StyledLabel>
            {textarea ? (
                <StyledTextarea
                    type={type}
                    size={size}
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
                    size={size}
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
