import React from 'react'
import { Button } from './Button'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`

export const Confirm = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledWrapper>
            <Button
                onClick={() => {
                    setOpen(false)
                }}
                size={1.5}
            >
                NO
            </Button>
            <Button
                onClick={() => {
                    setOpen(false)
                    todo()
                }}
                size={1.5}
            >
                YES
            </Button>
        </StyledWrapper>
    )
}
