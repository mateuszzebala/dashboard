import React from 'react'
import { BiSolidGrid, BiUserCircle } from 'react-icons/bi'
import { AiOutlineInfoCircle, AiOutlineMessage } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { LINKS } from '../router/links'
import { IoMdLogOut } from 'react-icons/io'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { InfoByApp } from '../pages/info/InfoPage'
import { useModalForm } from '../utils/hooks'
import { DashboardsMenu } from '../atoms/modalforms/DashboardsMenu'
import { FaQrcode } from 'react-icons/fa'
import { LoadingImage } from '../atoms/LoadingImage'

const StyledIcon = styled.span`
    display: flex;
    cursor: pointer;
    font-size: 20px;
    align-items: center;
    gap: 5px;
    text-decoration: none !important;
    color: ${({ theme }) => theme.topbar.font};
    transition: color 0.2s, background-color 0.2s;
    padding: 5px;
    border-radius: 20px;
    &:hover {
        background-color: ${({ theme }) => theme.tertiary}44;
    }
`
const StyledWrapper = styled.span`
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary};
`

export const TopBarIcons = ({ app, username }) => {
    const navigate = useNavigate()
    const modalForm = useModalForm()
    return (
        <StyledWrapper>
            <Link to={LINKS.account.index()}>
                <StyledIcon>
                    {username}
                    <BiUserCircle />
                </StyledIcon>
            </Link>
            {InfoByApp[app.name] && (
                <Link to={LINKS.info.app(app.name)}>
                    <StyledIcon>
                        <AiOutlineInfoCircle />
                    </StyledIcon>
                </Link>
            )}

            <Link to={LINKS.settings.index()}>
                <StyledIcon>
                    <FiSettings />
                </StyledIcon>
            </Link>

            <Link to={LINKS.messages.index()}>
                <StyledIcon>
                    <AiOutlineMessage />
                </StyledIcon>
            </Link>
            <StyledIcon
                onClick={() => {
                    modalForm({
                        content: () => (
                            <LoadingImage
                                src={ENDPOINTS.auth.qrcode()}
                                alt="qrcode"
                                width={300}
                                height={300}
                            />
                        ),
                        title: 'QRCODE',
                        icon: <FaQrcode />,
                    })
                }}
            >
                <FaQrcode />
            </StyledIcon>
            <StyledIcon
                onClick={() => {
                    modalForm({
                        content: DashboardsMenu,
                        title: 'CHOOSE APP',
                        icon: <BiSolidGrid />,
                    })
                }}
            >
                <BiSolidGrid />
            </StyledIcon>
            <StyledIcon
                onClick={() => {
                    FETCH(ENDPOINTS.auth.logout()).then((data) => {
                        if (data.data.logout) {
                            navigate(LINKS.auth.signin())
                        }
                    })
                }}
            >
                <IoMdLogOut />
            </StyledIcon>
        </StyledWrapper>
    )
}
