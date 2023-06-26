import React from 'react'
import { Button } from './Button'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'

const StyledButtons = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

`
const StyledWrapper = styled.div`
    position: fixed;
    top: ${({open})=>open?'10px':'-100%'};
    transition: top 0.2s;
    left: 50%;
    gap: 10px;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, 0);
    z-index: 10 ;
    padding: 10px;
    background-color: ${({ theme }) => theme.modal.background};
    color: ${({ theme }) => theme.modal.font};
    
    box-shadow:
        0 0 162.2px rgba(0, 0, 0, 0.02),
        0 0 208.2px rgba(0, 0, 0, 0.028),
        0 0 218.4px rgba(0, 0, 0, 0.035),
        0 0 215.3px rgba(0, 0, 0, 0.042),
        0 0 216.8px rgba(0, 0, 0, 0.05),
        0 0 293px rgba(0, 0, 0, 0.07)
    ;
    border-radius: 5px;
    
    @keyframes fade-in {
        from { top: -100%; }
        to{ top: 10px; }
    }
    @keyframes fade-out {
        from { top: 10px; }
        to{ top: -100%; }
    }

    animation: ${ ({ open }) => open ? 'fade-in' : 'fade-out' } 0.2s ease forwards;
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
    font-size: 20px;
`
export const Confirm = ({question='CONFIRM', todo=()=>{}, onCancel=()=>{}}) => {
    const [open, setOpen] = React.useState(true)
    const [show, setShow] = React.useState(true)

    React.useEffect(()=>{
        if(!open){
            setTimeout(()=>{
                setShow(false)
                onCancel()
            }, 200)
        }
    }, [open])

    if (!show) return ''
    return (
        <StyledWrapper open={toBoolStr(open)}>
            <StyledCaption>
                <StyledTitle>{question}</StyledTitle>
            </StyledCaption>
            <StyledButtons>
                <Button size={0.7} onClick={()=>{
                    setOpen(false)
                }}>CANCEL</Button>
                <Button size={0.7} onClick={()=>{
                    setOpen(false)
                    todo()
                }}>OK</Button>
            </StyledButtons>
        </StyledWrapper>
    )
}