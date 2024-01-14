import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Typography } from '../../atoms/Typography'
import styled from 'styled-components'
import { Input } from '../../atoms/inputs/Input'
import { Switch } from '../../atoms/inputs/Switch'
import { Select } from '../../atoms/inputs/Select'
import { useUser } from '../../utils/hooks'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { LuPlug2 } from 'react-icons/lu'
import { EMAIL_SERVICES } from '../../data/emailServices'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useMessage } from '../../utils/messages'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    justify-content: center;
    font-weight: normal;
    height: 100%;
    border-radius: 7px;
    padding: 30px 0;
    >span{
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        gap: 10px;
    }
`



export const AddEmailPage = () => {

    const {user} = useUser()
    const [name, setName] = React.useState(user.username)
    const [email, setEmail] = React.useState('')
    const [smtpUrl, setSmtpUrl] = React.useState('')
    const [service, setService] = React.useState()
    const [otherService, setOtherService] = React.useState(false)
    const [smtpPort, setSmtpPort] = React.useState('')
    const [imapUrl, setImapUrl] = React.useState('')
    const [imapPort, setImapPort] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [sending, setSending] = React.useState(false)
    const {newMessage} = useMessage()
    const navigate = useNavigate()


    React.useEffect(()=>{
        if(!service) return
        setSmtpUrl(EMAIL_SERVICES[service].smtpUrl)
        setSmtpPort(EMAIL_SERVICES[service].smtpPort)
        setImapUrl(EMAIL_SERVICES[service].imapUrl)
        setImapPort(EMAIL_SERVICES[service].imapPort)
    }, [service])

    const handleSubmit = () => {
        setSending(true)
        FETCH(ENDPOINTS.email.connect(), {emailData: JSON.stringify({name, password, email, smtpUrl, smtpPort, imapUrl, imapPort})}).then(data => {
            console.log(data.data)
            if(data.data.error) {
                newMessage({
                    text: 'Connection failed',
                    error: true
                })
            }
            else {
                newMessage({
                    text: 'Connection succesfull',
                    success: true
                })
                navigate(LINKS.email.inbox(email))
            }
            setSending(false)
        }).catch(()=>{
            setSending(false)
        })
    }



    return (
        <MainTemplate app={APPS.email} title='CONNECT NEW EMAIL'>

            <StyledForm>
                <Input value={name} setValue={setName} type='text' size={1.2} label={'NAME'}/>
                <Input value={email} setValue={setEmail} type='email' size={1.2} label={'E-MAIL'}/>
                <Input value={password} setValue={setPassword} type='password' size={1.2} label={'PASSWORD'}/>
                <span><Typography variant={'span'}>OTHER SERVICE</Typography><Switch size={1.4} value={otherService} setValue={setOtherService}/></span>
                {otherService && <>
                    <Input value={smtpUrl} setValue={setSmtpUrl} type='url' size={1.2} label={'SMTP URL'}/>
                    <Input value={smtpPort} setValue={setSmtpPort} type='number' size={1.2} label={'SMTP PORT'}/>
                    <Input value={imapUrl} setValue={setImapUrl} type='url' size={1.2} label={'IMAP URL'}/>
                    <Input value={imapPort} setValue={setImapPort} type='number' size={1.2} label={'IMAP PORT'}/>
                </>}
                {!otherService && <>
                    <Select canBeNull={false} emptyName='Email Server' value={service} setValue={setService} size={1.2} data={{
                        gmail: 'gmail.com',
                        outlook: 'outlook.com',
                        yahoo: 'yahoo.com',
                        iCloud: 'icloud.com',
                        mail: 'mail.com',
                    }}/>
                </>}
            </StyledForm>
            <FloatingActionButton loading={sending} size={1.4} subContent='CONNECT' onClick={handleSubmit} icon={<LuPlug2 />}/>

        </MainTemplate>
    )
}
