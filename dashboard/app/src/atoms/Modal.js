import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'

const StyledWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 300;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: ${({ theme }) => theme.modal.background};
    color: ${({ theme }) => theme.modal.font};
    /* box-shadow: 0 0 8px -5px ${({ theme }) => theme.primary},
        0 0 20px -5px ${({ theme }) => theme.primary},
        0 0 40px -5px ${({ theme }) => theme.primary},
        2px 2px 10px 0px ${({ theme }) => theme.primary}33; */
    box-shadow: 0px 0px 239.1px rgba(0, 0, 0, 0.028),
        0px 0px 291.6px rgba(0, 0, 0, 0.036),
        0px 0px 313.3px rgba(0, 0, 0, 0.041),
        0px 0px 322.7px rgba(0, 0, 0, 0.045), 0px 0px 329px rgba(0, 0, 0, 0.05),
        0px 0px 340.3px rgba(0, 0, 0, 0.059),
        0px 0px 370.9px rgba(0, 0, 0, 0.076), 0px 0px 500px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    animation: fade-in 0.5s forwards;
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

const StyledIcon = styled.span`
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
`

const StyledExitButton = styled.button`
    background-color: transparent;
    border: 0;
    font-size: 30px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`

export const Modal = ({ open, setOpen, title = '', children, icon = '' }) => {
    if (!open) return ''
    return (
        <StyledWrapper>
            <StyledCaption>
                <StyledExitButton
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <IoClose />
                </StyledExitButton>
                <StyledTitle>{title}</StyledTitle>
                <StyledIcon>{icon}</StyledIcon>
            </StyledCaption>
            {children}
        </StyledWrapper>
    )
}
