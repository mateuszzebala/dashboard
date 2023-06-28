import React from 'react'
import styled from 'styled-components'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { Typography } from '../atoms/Typography'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { useNavigate } from 'react-router'
import { links } from '../router/links'
import { FaLock, FaReact } from 'react-icons/fa'
import { SiDjango } from 'react-icons/si'
import { toBoolStr } from '../utils/utils'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 30px;
    background-color: ${({ theme }) => theme.light};
    min-height: 100vh;
    overflow: hidden;
`

const StyledBackgroundDecoration1 = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.primary};
    position: absolute;
    top: 0;
    padding: 0;

    clip-path: polygon(0 75%, 0% 100%, 100% 100%);
    @keyframes move-up {
        from {
            transform: translateY(25%);
        }
        to {
            transform: translateY(0);
        }
    }
    animation: move-up 0.7s forwards;
`

const StyledBackgroundDecoration2 = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.primary};
    position: absolute;
    top: 0;

    padding: 0;
    clip-path: polygon(100% 0, 0 0, 100% 25%);
    @keyframes move-down {
        from {
            transform: translateY(-25%);
        }
        to {
            transform: translateY(0);
        }
    }
    animation: move-down 0.7s forwards;
`

const StyledLock = styled.div`
    position: absolute;
    top: 30px;
    right: 30px;
    color: ${({ theme }) => theme.light};
    font-size: 30px;
`

const StyledDeveloperName = styled.a`
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: ${({ theme }) => theme.light};
    font-size: 15px;
    text-decoration: none;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 40px;
    align-items: center;
    border-radius: 30px;
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 8px -6px black;
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    animation: fade-in 0.7s forwards;
`

const StyledError = styled.span`
    color: ${({ error, theme }) => (error ? theme.error : 'transparent')};
    transition: color 0.3s;
    opacity: ${({ error }) => (error ? 1 : 0)};
    text-align: center;
    font-weight: bold;
`

const StyledIcon = styled.div`
    font-size: 70px;
    color: ${({ theme }) => theme.primary};
`

export const SignInPage = () => {
    const navigate = useNavigate()
    const [sending, setSending] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        FETCH(ENDPOINTS.auth.me()).then((data) => {
            data.data.signin && navigate(links.home())
        })
    }, [])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        setSending(true)

        FETCH(ENDPOINTS.auth.signin(), {
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
            <StyledBackgroundDecoration1 />
            <StyledBackgroundDecoration2 />
            <StyledIcon>
                <SiDjango />
            </StyledIcon>

            <StyledForm onSubmit={handleSubmitForm}>
                <Typography variant={'h6'}>ADMIN DASHBOARD</Typography>
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
                <StyledError error={toBoolStr(error)}>
                    BAD USERNAME OR PASSWORD
                </StyledError>
                <Button loading={sending}>SIGN IN</Button>
            </StyledForm>
            <StyledIcon>
                <FaReact />
            </StyledIcon>

            <StyledLock>
                <FaLock />
            </StyledLock>
            <StyledDeveloperName
                target="_blank"
                href="https://mateuszzebala.pl"
            >
                MATEUSZZEBALA
            </StyledDeveloperName>
        </StyledWrapper>
    )
}
