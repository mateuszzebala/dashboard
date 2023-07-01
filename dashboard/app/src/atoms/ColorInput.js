import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.label`
    height: 40px;
    width: 80px;
    background-color: ${({ value }) => value};
    padding: 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid ${({ theme }) => theme.primary};
`

const StyledInput = styled.input`
    display: block;
    width: 0;
    height: 0;
    opacity: 0;
`

export const ColorInput = ({ value, setValue }) => {
    const [wrapperColor, setWrapperColor] = React.useState(value)
    const id = React.useId()
    const inputRef = React.useRef()

    React.useEffect(() => {
        setWrapperColor(value)
        inputRef.current.value = value
    }, [value])

    return (
        <StyledWrapper htmlFor={id} value={wrapperColor}>
            <StyledInput
                ref={inputRef}
                type={'color'}
                id={id}
                onBlur={(e) => {
                    setValue(e.target.value)
                    setWrapperColor(e.target.value)
                }}
            />
        </StyledWrapper>
    )
}
