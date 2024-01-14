import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
`

export const BoolPrompt = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledWrapper>
            <Button second width={'100%'} onClick={() => { 
                todo(true)
                setOpen(false)
            }} size={1.3}>TRUE</Button>
            <Button second width={'100%'} onClick={() => { 
                todo(false)
                setOpen(false)
            }} size={1.3}>FALSE</Button>
        </StyledWrapper>
    )
}
