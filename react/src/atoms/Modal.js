import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { IoClose } from 'react-icons/io5'

const StyledWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: ${({ theme }) => theme.modal.background};
    color: ${({ theme }) => theme.modal.font};
    box-shadow: 0 0 8px -5px black, 2px 2px 10px 0px #00000033;
    border-radius: 10px;
`

const StyledCaption = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 10px;
    align-items: center;
`

const StyledTitle = styled.span`
    font-weight: bold;
    font-size: 20px;
`

export const Modal = ({ open, setOpen, title = '', children }) => {
    if (!open) return ''
    return (
        <StyledWrapper>
            <StyledCaption>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                    icon={<IoClose />}
                />
                <StyledTitle>{title}</StyledTitle>
            </StyledCaption>
            {children}
        </StyledWrapper>
    )
}
