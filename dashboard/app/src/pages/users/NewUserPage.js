import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { useModalForm } from '../../utils/hooks'
import { FilePrompt } from '../../atoms/modalforms/FilePrompt'
import { Input } from '../../atoms/inputs/Input'
import { FiCamera, FiSave } from 'react-icons/fi'
import { Select } from '../../atoms/inputs/Select'
import { GENDERS } from '../../data/genders'
import { COUNTRIES } from '../../data/countries'
import { FETCH } from '../../api/api'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { Button } from '../../atoms'

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
    align-items: center;
    width: 100%;
    border-radius: 7px;
`

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 49% 49%;
    justify-content: center;
    align-items: stretch;
    gap: 20px;
    width: 100%;
`

const StyledTitle = styled.span`
    font-size: 20px;
`

export const NewUserPage = () => {
    const [data, setData] = React.useState({})
    const [profileImage, setProfileImage] = React.useState('')
    const modalForm = useModalForm()
    const [imageData, setImageData] = React.useState(null)
    const [saving, setSaving] = React.useState(false)
    const navigate = useNavigate()

    const handleSave = () => {
        setSaving(true)
        FETCH(ENDPOINTS.users.create(), { ...data, profileImage }).then(data => {
            navigate(LINKS.users.index(data.pk))
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

    return (
        <MainTemplate app={APPS.users} title={'CREATE USER'} submenuChildren={<>
            <Button subContent='ADD' loading={saving} size={1.4} second icon={<FiSave />} onClick={handleSave} />
        </>}>
            <StyledWrapper>
                <StyledGroup>
                    <StyledTitle>Profile image</StyledTitle>
                    <StyledProfileImage
                        src={imageData}
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
                            type='password'
                            value={data.password}
                            setValue={(value) => {
                                setData((prev) => ({
                                    ...prev,
                                    password: value,
                                }))
                            }}
                            label={'PASSWORD'}
                        />
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
        </MainTemplate>
    )
}
