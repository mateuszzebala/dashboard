import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { BsCamera } from 'react-icons/bs'
import { useModalForm } from '../../utils/hooks'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { FilePrompt } from '../../atoms/modalforms/FilePrompt'
import { Input } from '../../atoms/Input'
import { LuCamera, LuSave } from 'react-icons/lu'
import { IoMdLogOut } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import { Button } from '../../atoms/Button'
import { MdBlock } from 'react-icons/md'
import { useMessage } from '../../utils/messages'
import { Confirm } from '../../atoms/modalforms/Confirm'

const StyledProfileImage = styled.div`
    width: 200px;
    height: 200px;
    background-image: url(${({ src }) => src});
    border-radius: 50%;
    box-shadow: 0 0 8px -3px ${({ theme }) => theme.primary};
    background-position: center;
    background-size: cover;
`

const StyledCameraButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: 50%;
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
        background-color: ${({ theme }) => theme.secondary}88;
    }
`

const StyledGroup = styled.div`
    background-color: ${({theme})=>theme.primary}11;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 7px;
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`
const StyledInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
`

const StyledTitle = styled.span`
    font-size: 20px;
`

const StyledHeader = styled.h1`
    font-size: 30px;
    margin: 0;
    background-color: ${({theme})=>theme.primary}11;
    display: inline-flex;
    width: 100%;
    padding: 30px;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    text-align: center;
    border-radius: 7px;
`

export const UserPage = () => {
    const { id } = useParams()
    const [accountInfo, setAccountInfo] = React.useState({})
    const [data, setData] = React.useState({})
    const [profileImage, setProfileImage] = React.useState('')
    const modalForm = useModalForm()
    const [imageData, setImageData] = React.useState(null)
    const [reload, setReload] = React.useState(0)
    const [active, setActive] = React.useState(null)
    const {newMessage} = useMessage()

    React.useEffect(()=>{
        FETCH(ENDPOINTS.users.active(), {id}).then(data => {
            setActive(data.data.active)
        })
    }, [id])

    const handleSave = () => {
        FETCH(ENDPOINTS.users.edit(id), {...data, profileImage}).then(data => {
            setReload(prev => prev + 1)
        })
    }

    React.useEffect(()=>{
        if(profileImage){
            const reader = new FileReader()
            reader.onload = function(event) {
                setImageData(event.target.result)
            }
            reader.readAsDataURL(profileImage)
        }
    }, [profileImage])

    React.useEffect(() => {
        FETCH(ENDPOINTS.users.get(id)).then((data) => {
            setAccountInfo(data.data)
            setData(data.data)
        })
    }, [id, reload])

    return (
        <MainTemplate app={APPS.users} title={accountInfo.username} submenuChildren={<>
            <Button icon={<FiLogOut/>} subContent={'LOGOUT'} second size={1.3} onClick={()=>{
                FETCH(ENDPOINTS.users.logout(), {id}).then(()=>{
                    newMessage({
                        text: 'LOGOUT SUCCESSFUL',
                        success: true
                    })
                })
            }}/>
            <Button icon={<MdBlock />} subContent={'ACTIVE'} second size={1.3} onClick={()=>{
                modalForm({
                    content: Confirm,
                    title: 'ACTIVE',
                    text: active ? 'is_active = false' : 'is_active = true',
                    icon: <MdBlock/>,
                    todo: () => {
                        FETCH(ENDPOINTS.users.active(), {id, active: !active}).then(data => {
                            setActive(data.data.active)

                        })
                    }
                })
            }}/>
        </>}>
            {accountInfo.username && (
                <StyledWrapper>
                    {(accountInfo.first_name || accountInfo.last_name) && <StyledHeader>{accountInfo.first_name} {accountInfo.last_name}</StyledHeader>}
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
                                        icon: <BsCamera />,
                                        value: profileImage,
                                        setValue: setProfileImage,
                                        todo: (value) => {
                                            setProfileImage(value)
                                        },
                                    })
                                }}
                            >
                                <LuCamera />
                            </StyledCameraButton>
                        </StyledProfileImage>
                    </StyledGroup>
                    <StyledInputs>
                  
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
                    </StyledInputs>
                    <FloatingActionButton size={1.4} icon={<LuSave />} onClick={handleSave}/>
                </StyledWrapper>
            )}
        </MainTemplate>
    )
}
