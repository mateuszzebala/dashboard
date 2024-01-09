import React from 'react'
import { Button } from '../Button'
import { Input } from '../inputs/Input'
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

export const Prompt = ({ setOpen, todo = () => {}, initValue, setButton, ...props }) => {
    const [value, setValue] = React.useState(initValue || '')
    const wrapperRef = React.useRef()

    React.useEffect(() => {
        wrapperRef.current.querySelector('input').focus()
    }, [])

    return (
        <StyledWrapper ref={wrapperRef}>
            <Input
                size={1.3}
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
                    size={1.2}
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
                    size={1.2}
                    width={'100%'}
                    onKey={'Enter'}
                    onClick={() => {
                        setOpen(false)
                        todo(value)
                    }}
                >
                    {setButton ? setButton : 'SET'}
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
