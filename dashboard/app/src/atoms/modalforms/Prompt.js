import React from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const StyledButtons = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Prompt = ({ setOpen, todo = () => {}, initValue, ...props }) => {
    const [value, setValue] = React.useState(initValue || '')
    const wrapperRef = React.useRef()

    React.useEffect(() => {
        wrapperRef.current.querySelector('input').focus()
    }, [])

    return (
        <StyledWrapper ref={wrapperRef}>
            <Input
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setOpen(false)
                        todo(value)
                    }
                }}
                value={value}
                setValue={setValue}
                {...props}
            />
            <StyledButtons>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    CANCEL
                </Button>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo(value)
                    }}
                >
                    NEXT
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
