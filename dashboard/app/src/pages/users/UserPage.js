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

const StyledWrapper = styled.div``

export const UserPage = () => {
    const { id } = useParams()
    const [userinfo, setUserinfo] = React.useState({})
    const [profileImage, setProfileImage] = React.useState('')
    const modalForm = useModalForm()

    React.useEffect(() => {
        FETCH(ENDPOINTS.database.item('User', id)).then((data) => {
            setUserinfo(data.data.fields)
        })
    }, [id])
    return (
        <MainTemplate app={APPS.users}>
            {userinfo.username && (
                <StyledWrapper>
                    <StyledProfileImage
                        src={ENDPOINTS.auth.profile(userinfo.username)}
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
                            <BsCamera />
                        </StyledCameraButton>
                    </StyledProfileImage>
                    {userinfo.username}
                    <FloatingActionButton second>SAVE</FloatingActionButton>
                </StyledWrapper>
            )}
        </MainTemplate>
    )
}
