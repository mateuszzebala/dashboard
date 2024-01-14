import React from 'react'
import styled from 'styled-components'
import { Input } from '../inputs/Input'
import { Button } from '../Button'
import { Switch } from '../inputs/Switch'
import { SwitchWithNull } from '../SwitchWithNull'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;
    
`

const StyledButtons = styled.div`
    display: flex;
    width: 400px;
`


const StyledButton = styled.button`
    background-color: ${({ theme, active }) => active ? theme.primary : theme.quaternary};
    color: ${({ theme, active }) => active ? theme.secondary : theme.primary};
    border: 0;
    padding: 10px 5px;
    width: 20%;
    font-size: 15px;
    font-weight: 300;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
    &:first-child{
        border-radius: 5px 0 0 5px;
    }
    &:last-child{
        border-radius: 0 5px 5px 0;
    }
`

const StyledValue = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    >div{
        width: 100%;
    }
`

const types = {
    'str': 'STRING',
    'int': 'INTEGER',
    'bool': 'BOOL',
    'float': 'FLOAT',
    'NoneType': 'NONE',
}

export const ValueProviderModal = ({initValue, todo = () => {}, initType='str', setOpen, ...props}) => {
    const [type, setType] = React.useState(types[initType] || 'STRING')
    const [value, setValue] = React.useState(initValue || '')

    React.useEffect(()=>{
        type == 'STRING' && setValue(initValue || '')
        type == 'BOOL' && setValue(initValue || false)
        type == 'INTEGER' && setValue(initValue || 0)
        type == 'FLOAT' && setValue(initValue || 0.0)
        type == 'NONE' && setValue(null)
    }, [type])

    return <StyledWrapper>
        <StyledButtons>
            <StyledButton active={type == 'STRING'} onClick={() => setType('STRING')}>STRING</StyledButton>
            <StyledButton active={type == 'BOOL'} onClick={() => setType('BOOL')}>BOOL</StyledButton>
            <StyledButton active={type == 'INTEGER'} onClick={() => setType('INTEGER')}>INTEGER</StyledButton>
            <StyledButton active={type == 'FLOAT'} onClick={() => setType('FLOAT')}>FLOAT</StyledButton>
            <StyledButton active={type == 'NONE'} onClick={() => setType('NONE')}>NONE</StyledButton>
        </StyledButtons>
        <StyledValue>
            {type == 'STRING' && <Input size={1.2} label='VALUE' {...props} value={value} setValue={setValue}/>}
            {type == 'BOOL' && <Switch size={2.5} {...props} value={value} setValue={setValue}/>}
            {type == 'INTEGER' && <Input size={1.2} type='number' label='VALUE' {...props} value={value} setValue={setValue}/>}
            {type == 'FLOAT' && <Input size={1.2} type='number' step={'any'} label='VALUE' {...props} value={value} setValue={setValue}/>}
        </StyledValue>
        <Button width={'100%'} second onClick={() => {
            todo(value, type)
            setOpen(false)
        }}>SAVE</Button>
    </StyledWrapper>
}
