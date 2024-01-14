import React from 'react'
import { Button } from '../Button'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`

const StyledTitle = styled.span`
    font-size: 18px;
    text-align: center;
`

const StyledButtons = styled.div`
    gap: 10px;
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
`

export const Confirm = ({ setOpen, todo = () => {}, text='', yesText='YES', noText='NO' }) => {
    return (
        <StyledWrapper>
            <StyledTitle>{text}</StyledTitle>
            <StyledButtons>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                    size={1.2}
                    second
                    width={'100%'}
                >
                    {noText}
                </Button>
                <Button
                    onKey={'Enter'}
                    onClick={() => {
                        setOpen(false)
                        todo()
                    }}
                    size={1.2}
                    width={'100%'}
                >
                    {yesText}
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
