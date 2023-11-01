import React from 'react'
import { Button } from '../Button'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`

const StyledTitle = styled.span`
  font-size: 20px;
`

const StyledButtons = styled.div`
  display: flex;
  gap: 10px;
  
`

export const Confirm = ({ setOpen, todo = () => {}, text='' }) => {
    return (
        <StyledWrapper>
            <StyledTitle>{text}</StyledTitle>
            <StyledButtons>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                    size={1.5}
                    second
                >
                    NO
                </Button>
                <Button
                    onKey={'Enter'}
                    onClick={() => {
                        setOpen(false)
                        todo()
                    }}
                    size={1.5}
                >
                    YES
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
