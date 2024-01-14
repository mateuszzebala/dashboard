import React from 'react'
import { Button } from '../../../atoms/Button'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { Input } from '../../../atoms/inputs/Input'
import styled from 'styled-components'

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
`

export const CreateEmail = ({emailInfo}) => {
    const [to, setTo] = React.useState('')
    const [content, setContent] = React.useState('')
    const [subject, setSubject] = React.useState('')
    return (
        <StyledForm>
            <Input label={'TO'} value={to} setValue={setTo}/>
            <Input label={'SUBJECT'} value={subject} setValue={setSubject}/>
            <Input textarea label={'CONTENT'} value={content} setValue={setContent}/>
            <Button onClick={()=>{
                FETCH(ENDPOINTS.email.send(), {
                    email: emailInfo.email,
                    to,
                    content,
                    subject
                }).then(data => {
                    console.log(data)
                })
            }}>SEND</Button>
        </StyledForm>
    )
}
