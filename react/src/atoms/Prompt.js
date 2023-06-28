import React from 'react'
import { Button } from './Button'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { Input } from './Input'

const StyledButtons = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 20px;
`
const StyledWrapper = styled.div`
    position: fixed;
    top: ${({ open }) => (open ? '10px' : '-100%')};
    transition: top 0.2s;
    left: 50%;
    gap: 10px;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, 0);
    z-index: 10;
    padding: 20px;
    background-color: ${({ theme }) => theme.modal.background};
    color: ${({ theme }) => theme.modal.font};

    box-shadow: 0 0 162.2px rgba(0, 0, 0, 0.02),
        0 0 208.2px rgba(0, 0, 0, 0.028), 0 0 218.4px rgba(0, 0, 0, 0.035),
        0 0 215.3px rgba(0, 0, 0, 0.042), 0 0 216.8px rgba(0, 0, 0, 0.05),
        0 0 293px rgba(0, 0, 0, 0.07);
    border-radius: 5px;

    @keyframes fade-in {
        from {
            top: -100%;
        }
        to {
            top: 10px;
        }
    }
    @keyframes fade-out {
        from {
            top: 10px;
        }
        to {
            top: -100%;
        }
    }

    animation: ${({ open }) => (open ? 'fade-in' : 'fade-out')} 0.4s ease
        forwards;
`

const StyledCaption = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    padding-bottom: 10px;
    align-items: center;
`

const StyledTitle = styled.span`
    font-weight: bold;
    max-width: 300px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 25px;
`
export const Prompt = ({
    question = 'PROMPT',
    todo = () => {},
    type = 'text',
    onCancel = () => {},
}) => {
    const [open, setOpen] = React.useState(true)
    const [show, setShow] = React.useState(true)
    const [inputValue, setInputValue] = React.useState('')

    React.useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setShow(false)
                onCancel()
            }, 400)
        }
    }, [open])

    if (!show) return ''
    return (
        <StyledWrapper open={toBoolStr(open)}>
            <StyledCaption>
                <StyledTitle>{question}</StyledTitle>
            </StyledCaption>
            <Input type={type} value={inputValue} setValue={setInputValue} />
            <StyledButtons>
                <Button
                    size={1}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    CANCEL
                </Button>
                <Button
                    size={1}
                    onClick={() => {
                        setOpen(false)
                        todo(inputValue)
                    }}
                >
                    OK
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
