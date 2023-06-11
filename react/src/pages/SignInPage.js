import React from 'react'
import styled from 'styled-components'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { Typography } from '../atoms/Typography'
import { FETCH } from '../api/api'
import { endpoints } from '../api/endpoints'
import { useNavigate } from 'react-router'
import { links } from '../router/links'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.ligth};
    min-height: 100vh;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 0 10px -6px black;
`

const StyledError = styled.p`
    color: ${({ theme }) => theme.error};
    text-align: center;
`

export const SignInPage = () => {
    const navigate = useNavigate()
    const [sending, setSending] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        FETCH(endpoints.auth.me()).then((data) => {
            data.data.signin && navigate(links.home())
        })
    }, [])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        setSending(true)

        FETCH(endpoints.auth.signin(), {
            username,
            password,
        })
            .then((data) => {
                if (data.data.done) {
                    navigate(links.home())
                } else {
                    setError(true)
                }
                setSending(false)
            })
            .catch(() => {
                setError(true)
                setSending(false)
            })
    }

    return (
        <StyledWrapper>
            <StyledForm onSubmit={handleSubmitForm}>
                <Typography variant={'h1'}>SIGN IN</Typography>
                <Input
                    value={username}
                    setValue={setUsername}
                    label={'USERNAME'}
                />
                <Input
                    value={password}
                    setValue={setPassword}
                    type="password"
                    label={'PASSWORD'}
                />

                <Button loading={sending}>SIGN IN</Button>
            </StyledForm>
            {error && <StyledError>Dad data</StyledError>}
        </StyledWrapper>
    )
}
