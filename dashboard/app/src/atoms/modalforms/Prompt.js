import React from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
`
const StyledButtons = styled.div`
   
    gap: 5px;
   
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
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
                    second
                    width={'100%'}
                    onKey={'Escape'}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    CANCEL
                </Button>
                <Button
                    width={'100%'}
                    onKey={'Enter'}
                    onClick={() => {
                        setOpen(false)
                        todo(value)
                    }}
                >
                    SET
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
