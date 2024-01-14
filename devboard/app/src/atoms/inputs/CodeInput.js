import React from 'react'
import styled from 'styled-components'
import { range } from '../../utils/utils'
import String from 'string'

const StyledInput = styled.input`
    font-size: 30px;
    width: 40px;
    border-radius: 3px;
    border: 3px solid ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    text-align: center;
`

const StyledWrapper = styled.div`
    display: flex;
    gap: 5px;
`

const CodeInputChar = ({ value, id, focused, focus, onKeyUp }) => {
    const inputRef = React.useRef()

    React.useEffect(() => {
        focused && inputRef.current.focus()
    }, [focused])

    return (
        <StyledInput
            ref={inputRef}
            maxLength={1}
            size={1}
            onFocus={() => {
                focus(id)
            }}
            onKeyUp={onKeyUp}
            value={value || ''}
        />
    )
}

export const CodeInput = ({ value, setValue, length = 4 }) => {
    const [focus, setFocus] = React.useState(0)
    return (
        <StyledWrapper>
            {range(0, length).map((key) => (
                <CodeInputChar
                    value={value[key]}
                    setValue={(value) => {
                        setValue((prev) => {
                            prev[key] = value
                            return prev
                        })
                        setFocus(key + 1)
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Backspace') {
                            setFocus(key - 1)
                            setValue((prev) => {
                                prev[key] = ''
                                prev[key - 1] = ''
                                return prev
                            })
                        } else if (e.key.length === 1) {
                            e.key !== 'Backspace' && setFocus(key + 1)
                            setValue((prev) => {
                                const val = String(e.key.charAt(0))
                                prev[key] = val.isAlphaNumeric
                                    ? val.toString().toUpperCase()
                                    : ''
                                return prev
                            })
                        }
                    }}
                    key={key}
                    focus={(id) => {
                        setFocus(id)
                    }}
                    id={key}
                    focused={key === focus}
                />
            ))}
        </StyledWrapper>
    )
}
