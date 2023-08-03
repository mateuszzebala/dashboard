import React from 'react'
import styled from 'styled-components'
import { Input } from '../../atoms/Input'
import { Button } from '../../atoms/Button'
import { Typography } from '../../atoms/Typography'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { FaLock, FaQrcode } from 'react-icons/fa'
import { toBoolStr } from '../../utils/utils'
import { useModalForm, useUser } from '../../utils/hooks'
import { ResetPassword } from '../../atoms/modalforms/ResetPassword'
import { BiReset } from 'react-icons/bi'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 30px;
    background-color: ${({ theme }) => theme.secondary};
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
    color: ${({ theme }) => theme.secondary};
    font-size: 30px;
`

const StyledDeveloperName = styled.a`
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: ${({ theme }) => theme.secondary};
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
    box-shadow: 0px 0px 239.1px rgba(0, 0, 0, 0.028),
        0px 0px 291.6px rgba(0, 0, 0, 0.036),
        0px 0px 313.3px rgba(0, 0, 0, 0.041),
        0px 0px 322.7px rgba(0, 0, 0, 0.045), 0px 0px 329px rgba(0, 0, 0, 0.05),
        0px 0px 340.3px rgba(0, 0, 0, 0.059),
        0px 0px 370.9px rgba(0, 0, 0, 0.076), 0px 0px 500px rgba(0, 0, 0, 0.15);
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

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const StyledResetPassword = styled.span`
    cursor: pointer;
`

export const SignInPage = () => {
    const [sending, setSending] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)
    const modalForm = useModalForm()
    const { setUser } = useUser()

    const handleSubmitForm = (e) => {
        e.preventDefault()
        setSending(true)

        FETCH(ENDPOINTS.auth.signin(), {
            username,
            password,
        })
            .then((data) => {
                if (data.data.done) {
                    FETCH(ENDPOINTS.auth.me()).then((dataUser) => {
                        setUser(dataUser.data)
                    })
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
                <StyledButtons>
                    <Button loading={sending}>SIGN IN</Button>
                    <Button
                        type="button"
                        second
                        icon={<FaQrcode />}
                        onClick={() => {
                            modalForm({
                                content: () => (
                                    <img
                                        width={300}
                                        src="https://clockwork-poznan.pl/wp-content/uploads/2021/09/qr-code.png"
                                    />
                                ),
                                title: 'QRCODE',
                                icon: <FaQrcode />,
                            })
                        }}
                    />
                </StyledButtons>
                <StyledResetPassword
                    onClick={() => {
                        modalForm({
                            content: ResetPassword,
                            title: 'RESET PASSWORD',
                            icon: <BiReset />,
                        })
                    }}
                >
                    RESET PASSWORD
                </StyledResetPassword>
            </StyledForm>
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
