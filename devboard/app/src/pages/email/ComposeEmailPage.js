import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { FiSend } from 'react-icons/fi'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { LINKS } from '../../router/links'

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    border: none;
    font-weight: 200;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: ${({ theme }) => theme.primary};
    }
`

const StyledContent = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    border: none;
    height: 100%;
    font-weight: 200;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: ${({ theme }) => theme.primary};
    }
`

export const ComposeEmailPage = () => {
    const [searchParams] = useSearchParams()
    const [recipients, setRecipients] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [content, setContent] = React.useState('')
    const [sending, setSending] = React.useState(false)
    const navigate = useNavigate()

    const handleSend = () => {
        setSending(true)
        FETCH(ENDPOINTS.email.send(), {
            email: searchParams.get('mail'),
            content,
            subject,
            recipients,
        }).then(() => {
            navigate(LINKS.email.inbox(searchParams.get('mail')))
            setSending(false)
        })
    }

    return (
        <MainTemplate
            app={APPS.email}
            title="COMPOSE"
            submenuChildren={
                <>
                    <Button loading={sending} size={1.4} icon={<FiSend />} subContent="SEND" onClick={handleSend} />
                </>
            }
        >
            <StyledForm>
                <StyledInput value={recipients} onChange={(event) => setRecipients(event.target.value)} placeholder="Recipients" />
                <StyledInput value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" />
                <StyledContent placeholder="Content" onChange={(event) => setContent(event.target.value)} value={content} />
            </StyledForm>
        </MainTemplate>
    )
}
