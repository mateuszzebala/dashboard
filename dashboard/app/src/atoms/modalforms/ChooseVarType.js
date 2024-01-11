import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { SiDotnet } from 'react-icons/si'

const StyledButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
    width: 300px;
    align-items: stretch;
    justify-content: center;
`

export const ChooseVarType = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledButtons>
            <Button onClick={() => {
                todo('STRING')
                setOpen(false)
            }} width={'100%'} second size={1.2}>str</Button>
            <Button onClick={() => {
                todo('BOOL')
                setOpen(false)
            }} width={'100%'} second size={1.2}>bool</Button>
            <Button onClick={() => {
                todo('INTEGER')
                setOpen(false)
            }} width={'100%'} second size={1.2}>int</Button>
            <Button onClick={() => {
                todo('FLOAT')
                setOpen(false)
            }} width={'100%'} second size={1.2}>float</Button>
            <Button onClick={() => {
                todo('NONE')
                setOpen(false)
            }} width={'100%'} second size={1.2}>None</Button>
        </StyledButtons>
    )
}
