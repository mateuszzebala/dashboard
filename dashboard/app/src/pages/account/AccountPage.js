import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { links } from '../../router/links'
import { Input } from '../../atoms/Input'
import { Typography } from '../../atoms/Typography'
import { Button } from '../../atoms/Button'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Switch } from '../../atoms/Switch'

const StyledForm = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
`

const StyledRow = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-end;
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
                link: links.account.index(),
            }}
        >
            <StyledForm>
                <Typography variant={'h1'}>EDIT USER</Typography>
                <Input
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
                    value={userData.last_name}
                    setValue={(value) => {
                        setUserData((prev) => ({
                            ...prev,
                            last_name: value,
                        }))
                    }}
                />
                <Input
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
                <StyledRow>
                    <Typography variant={'h3'}>IS SUPERUSER</Typography>
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
                </StyledRow>
                <StyledRow>
                    <Typography variant={'h3'}>IS STAFF</Typography>
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
                </StyledRow>
                <StyledRow>
                    <Typography variant={'h3'}>IS ACTIVE</Typography>
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
                </StyledRow>
                <Button>SAVE DATA</Button>
            </StyledForm>
        </MainTemplate>
    )
}
