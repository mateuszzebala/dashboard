import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Typography } from '../../atoms/Typography'
import styled from 'styled-components'
import { Input } from '../../atoms/Input'
import { Button } from '../../atoms/Button'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    justify-content: center;
    background-color: ${({theme})=>theme.primary}22;
    font-weight: normal;
    height: 100%;
    border-radius: 7px;
    padding: 30px 0;
`

export const AddEmailPage = () => {

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [smtpUrl, setSmtpUrl] = React.useState('')
    const [port, setPort] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [sending, setSending] = React.useState(false)


    const handleSubmit = (event) => {
        event.preventDefault()
        setSending(true)
    }


    return (
        <MainTemplate app={APPS.email} title='ADD'>

            <StyledForm>
                <Typography variant={'h2'}>ADD NEW EMAIL</Typography>
                <Input value={name} setValue={setName} type='text' size={1.2} label={'NAME'}/>                
                <Input value={email} setValue={setEmail} type='email' size={1.2} label={'E-MAIL'}/>                
                <Input value={smtpUrl} setValue={setSmtpUrl} type='url' size={1.2} label={'SMTP URL'}/>                
                <Input value={port} setValue={setPort} type='number' size={1.2} label={'PORT'}/>                
                <Input value={password} setValue={setPassword} type='password' size={1.2} label={'PASSWORD'}/>     
                <Button loading={sending} size={1.2} onClick={handleSubmit}>ADD AND CONNECT</Button>           
            </StyledForm>

        </MainTemplate>
    )
}
