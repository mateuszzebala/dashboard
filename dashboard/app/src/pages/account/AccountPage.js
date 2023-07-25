import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { MdOutlineAccountCircle, MdOutlineEmail } from 'react-icons/md'
import { LINKS } from '../../router/links'
import { Input } from '../../atoms/Input'
import { Typography } from '../../atoms/Typography'
import { Button } from '../../atoms/Button'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Switch } from '../../atoms/Switch'
import { FiLock } from 'react-icons/fi'
import { AiOutlineUser } from 'react-icons/ai'
import { LiaIdCard } from 'react-icons/lia'

const StyledForm = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    width: 100%;
    justify-content: center;
    height: 100%;
`

const StyledRow = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`

export const AccountPage = () => {
    const [userData, setUserData] = React.useState({})

    React.useEffect(() => {
        FETCH(ENDPOINTS.auth.me()).then((data) => {
            setUserData(data.data)
            console.log(data.data)
        })
    }, [])

    return (
        <MainTemplate
            app={{
                name: 'Account',
                icon: MdOutlineAccountCircle,
                link: LINKS.account.index(),
            }}
        >
            <StyledForm>
                <Typography variant={'h1'}>EDIT USER</Typography>
                <Input
                    icon={<AiOutlineUser />}
                    value={userData.username}
                    setValue={(value) => {
                        setUserData((prev) => ({
                            ...prev,
                            username: value,
                        }))
                    }}
                    label={'USERNAME'}
                />
                <Input
                    label={'E-MAIL'}
                    icon={<MdOutlineEmail />}
                    value={userData.email}
                    setValue={(value) => {
                        setUserData((prev) => ({
                            ...prev,
                            email: value,
                        }))
                    }}
                />
                <Input
                    label={'FIRST NAME'}
                    icon={<LiaIdCard />}
                    value={userData.first_name}
                    setValue={(value) => {
                        setUserData((prev) => ({
                            ...prev,
                            first_name: value,
                        }))
                    }}
                />
                <Input
                    label={'LAST NAME'}
                    icon={<LiaIdCard />}
                    value={userData.last_name}
                    setValue={(value) => {
                        setUserData((prev) => ({
                            ...prev,
                            last_name: value,
                        }))
                    }}
                />
                <Input
                    icon={<FiLock />}
                    type="password"
                    label={'NEW PASSWORD'}
                    value={userData.new_password}
                    setValue={(value) => {
                        setUserData((prev) => ({
                            ...prev,
                            new_password: value,
                        }))
                    }}
                />
                <Input
                    icon={<FiLock />}
                    type="password"
                    label={'NEW PASSWORD AGAIN'}
                    value={userData.new_password_v2}
                    setValue={(value) => {
                        setUserData((prev) => ({
                            ...prev,
                            new_password_v2: value,
                        }))
                    }}
                />
                <StyledRow>
                    <Switch
                        size={1.3}
                        value={userData.is_superuser}
                        setValue={(value) => {
                            setUserData((prev) => ({
                                ...prev,
                                is_superuser: value(userData.is_superuser),
                            }))
                        }}
                    />
                    <Typography variant={'h4'}>IS SUPERUSER</Typography>
                </StyledRow>
                <StyledRow>
                    <Switch
                        size={1.3}
                        value={userData.is_staff}
                        setValue={(value) => {
                            setUserData((prev) => ({
                                ...prev,
                                is_staff: value(userData.is_staff),
                            }))
                        }}
                    />
                    <Typography variant={'h4'}>IS STAFF</Typography>
                </StyledRow>
                <StyledRow>
                    <Switch
                        size={1.3}
                        value={userData.is_active}
                        setValue={(value) => {
                            setUserData((prev) => ({
                                ...prev,
                                is_active: value(userData.is_active),
                            }))
                        }}
                    />
                    <Typography variant={'h4'}>IS ACTIVE</Typography>
                </StyledRow>
                <Button>SAVE DATA</Button>
            </StyledForm>
        </MainTemplate>
    )
}
