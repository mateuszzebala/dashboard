import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { BsCamera } from 'react-icons/bs'
import { useModalForm, useTheme } from '../../utils/hooks'
import { Button, Confirm, FilePrompt, Input, Prompt, Select, Theme } from '../../atoms'
import { FiCamera, FiDatabase, FiLogIn, FiLogOut, FiSave } from 'react-icons/fi'
import { MdBlock, MdPassword } from 'react-icons/md'
import { useMessage } from '../../utils/messages'
import { objectEquals } from '../../utils/utils'
import { GENDERS } from '../../data/genders'
import { COUNTRIES } from '../../data/countries'
import { LINKS } from '../../router/links'

const StyledProfileImage = styled.div`
    width: 200px;
    height: 200px;
    background-image: url(${({ src }) => src});
    border-radius: 10px;
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    background-position: center;
    background-size: cover;
`

const StyledCameraButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    cursor: pointer;
    color: transparent;
    background-color: transparent;
    transition: color 0.3s, background-color 0.3s;
    &:hover {
        color: ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => theme.secondary}AA;
    }
`

const StyledGroup = styled.div`
    background-color: ${({ theme }) => theme.primary}11;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px;
    justify-content: center;
    min-width: 400px;
    align-items: center;
    width: 100%;
    border-radius: 7px;
`

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    justify-content: center;
    align-items: stretch;
    gap: 20px;
    width: 100%;
`


const StyledTitle = styled.span`
    font-size: 20px;
`

export const UserPage = () => {
    const { id } = useParams()
    const [theme] = useTheme()
    const [accountInfo, setAccountInfo] = React.useState({})
    const [data, setData] = React.useState({})
    const [profileImage, setProfileImage] = React.useState('')
    const modalForm = useModalForm()
    const [imageData, setImageData] = React.useState(null)
    const [reload, setReload] = React.useState(0)
    const [active, setActive] = React.useState(null)
    const { newMessage } = useMessage()
    const [savedData, setSavedData] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [otherImage, setOtherImage] = React.useState(false)

    React.useEffect(() => {
        if (objectEquals(accountInfo, data) && !otherImage) setSavedData(true)
        else setSavedData(false)
    }, [data, profileImage])

    React.useEffect(() => {
        FETCH(ENDPOINTS.users.active(), { id }).then(data => {
            setActive(data.data.active)
        })
    }, [id])

    const handleSave = () => {
        setSaving(true)
        FETCH(ENDPOINTS.users.edit(id), { ...data, profileImage }).then(data => {
            setReload(prev => prev + 1)
            setSaving(false)
        })
    }

    React.useEffect(() => {
        if (profileImage) {
            const reader = new FileReader()
            reader.onload = function (event) {
                setImageData(event.target.result)
            }
            reader.readAsDataURL(profileImage)
        }
    }, [profileImage])

    React.useEffect(() => {
        FETCH(ENDPOINTS.users.get(id)).then((data) => {
            setAccountInfo(data.data)
            setData(data.data)
            setOtherImage(false)
        })
    }, [id, reload])

    return (
        <MainTemplate app={APPS.users} title={accountInfo.username} submenuChildren={<>
            <Theme value={{ ...theme, primary: savedData ? theme.success : theme.error }}>
                <Button subContent='SAVE' loading={saving} size={1.4} icon={<FiSave />} onClick={handleSave} />
            </Theme>
            <Button icon={<FiLogOut />} subContent={'LOGOUT'} second size={1.4} onClick={() => {
                FETCH(ENDPOINTS.users.logout(), { id }).then(() => {
                    newMessage({
                        text: 'LOGOUT SUCCESSFUL',
                        success: true
                    })
                })
            }} />
            <Button icon={<MdBlock />} subContent={'ACTIVE'} second size={1.4} onClick={() => {
                modalForm({
                    content: Confirm,
                    title: 'ACTIVE',
                    text: 'SET ACTIVE AS',
                    yesText: active ? 'False' : 'True',
                    noText: active ? 'True' : 'False',
                    icon: <MdBlock />,
                    todo: () => {
                        FETCH(ENDPOINTS.users.active(), { id, active: !active }).then(data => {
                            setActive(data.data.active)
                        })
                    }
                })
            }} />
            <Button second icon={<MdPassword />} size={1.4} subContent='PASSWORD' onClick={() => {
                modalForm({
                    content: Prompt,
                    type: 'password',
                    icon: <MdPassword />,
                    title: 'CHANGE PASSWORD',
                    setButton: 'CHANGE',
                    todo: (password) => {
                        FETCH(ENDPOINTS.users.change_password(id), {password}).then(()=>{
                            newMessage({
                                text: 'PASSWORD CHANGED',
                                success: true
                            })
                        })
                    }
                })
            }}/>
            <Button second to={LINKS.database.item('Account', id)} icon={<FiDatabase />} size={1.4} subContent='SHOW IN' />
            <Button size={1.4} icon={<FiLogIn/>} subContent='LOGIN' second onClick={() => {
                FETCH(ENDPOINTS.users.signin(id)).then(data => {
                    window.location.reload()
                })
            }}/>
        </>}>
            {accountInfo.username && (
                <StyledWrapper>
                    <StyledGroup>
                        <StyledTitle>Profile Image</StyledTitle>
                        <StyledProfileImage
                            src={imageData || ENDPOINTS.auth.profile(accountInfo.username)}
                        >
                            <StyledCameraButton
                                onClick={() => {
                                    modalForm({
                                        content: FilePrompt,
                                        title: 'UPLOAD PROFILE',
                                        icon: <FiCamera />,
                                        value: profileImage,
                                        setValue: setProfileImage,
                                        todo: (value) => {
                                            setProfileImage(value)
                                            setOtherImage(true)
                                        },
                                    })
                                }}
                            >
                                <FiCamera />
                            </StyledCameraButton>
                        </StyledProfileImage>
                    </StyledGroup>

                        <StyledGroup>
                            <StyledTitle>Main</StyledTitle>
                            <Input
                                size={1.1}
                                value={data.username}
                                setValue={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        username: value,
                                    }))
                                }}
                                label={'USERNAME'}
                            />
                            <Input
                                size={1.1}
                                value={data.first_name}
                                setValue={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        first_name: value,
                                    }))
                                }}
                                label={'FIRST NAME'}
                            />
                            <Input
                                size={1.1}
                                value={data.last_name}
                                setValue={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        last_name: value,
                                    }))
                                }}
                                label={'LAST NAME'}
                            />
                            <Input
                                size={1.1}
                                value={data.email}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, email: value }))
                                }}
                                label={'EMAIL'}
                            />
                            <Input
                                size={1.1}
                                value={data.phone}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, phone: value }))
                                }}
                                label={'PHONE'}
                            />
                        </StyledGroup>

                        <StyledGroup>
                            <StyledTitle>Address</StyledTitle>
                            <Select
                                emptyName='COUNTRY'
                                canBeNull
                                size={1.1}
                                label={'COUNTRY'}
                                value={data.country}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, country: value }))
                                }}
                                data={COUNTRIES}
                            />
                            <Input
                                size={1.1}
                                value={data.address}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, address: value }))
                                }}
                                label={'ADDRESS'}
                            />
                            <Input
                                size={1.1}
                                value={data.street}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, street: value }))
                                }}
                                label={'STREET'}
                            />
                            <Input
                                size={1.1}
                                value={data.city}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, city: value }))
                                }}
                                label={'CITY'}
                            />
                            <Input
                                size={1.1}
                                value={data.state}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, state: value }))
                                }}
                                label={'STATE'}
                            />
                            <Input
                                size={1.1}
                                value={data.zip_code}
                                setValue={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        zip_code: value,
                                    }))
                                }}
                                label={'ZIP CODE'}
                            />
                        </StyledGroup>
                        <StyledGroup>
                            <StyledTitle>Informations</StyledTitle>
                            <Input
                                size={1.1}
                                value={data.birth_date}
                                setValue={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        birth_date: value,
                                    }))
                                }}
                                label={'BIRTH DATE'}
                                type="date"
                            />
                            <Input
                                size={1.1}
                                value={data.bio}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, bio: value }))
                                }}
                                label={'BIO'}
                                textarea
                            />
                            <Input
                                size={1.1}
                                value={data.website}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, website: value }))
                                }}
                                label={'WEBSITE'}
                            />
                            <Select
                                emptyName='GENDER'
                                canBeNull
                                label={'GENDER'}
                                size={1.1}
                                value={data.gender}
                                setValue={(value) => {
                                    setData((prev) => ({ ...prev, gender: value }))
                                }}
                                data={GENDERS}
                            />
                            <Input
                                size={1.1}
                                value={data.pronouns}
                                setValue={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        pronouns: value,
                                    }))
                                }}
                                label={'PRONOUNS'}
                            />
                        </StyledGroup>
                    
                </StyledWrapper>
            )}
        </MainTemplate>
    )
}
