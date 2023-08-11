import React from 'react'
import { BiSolidGrid, BiUserCircle } from 'react-icons/bi'
import {
    AiOutlineClockCircle,
    AiOutlineInfoCircle,
    AiOutlineMessage,
} from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { LINKS } from '../router/links'
import { IoMdLogOut } from 'react-icons/io'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { InfoByApp } from '../pages/info/InfoPage'
import { useGlobalKey, useModalForm, useTheme, useUser } from '../utils/hooks'
import { DashboardsMenu } from '../atoms/modalforms/DashboardsMenu'
import { FaQrcode } from 'react-icons/fa'
import { LoadingImage } from '../atoms/LoadingImage'
import { BsArrowBarUp } from 'react-icons/bs'
import { ServerClock } from '../atoms/ServerClock'
import { Tooltip } from '../atoms/Tooltip'

const StyledIcon = styled.span`
    display: flex;
    cursor: pointer;
    font-size: 20px;
    align-items: center;
    gap: 5px;
    text-decoration: none !important;
    color: ${({ theme }) => theme.primary};
    transition: color 0.2s, background-color 0.2s, transform 0.3s;
    padding: 5px;
    border-radius: 20px;
    transform: ${({ rotate }) => (rotate ? 'rotate(180deg)' : 'rotate(0deg)')};
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

export const TopBarIcons = ({ app, setHideSubmenu, hideSubmenu }) => {
    const navigate = useNavigate()
    const modalForm = useModalForm()
    const { user } = useUser()
    const [theme] = useTheme()
    useGlobalKey(
        () => {
            navigate(LINKS.info.app(app.name))
        },
        {
            key: 'F1',
            prevent: true,
        },
        InfoByApp[app.name]
    )
    return (
        <StyledWrapper>
            <Tooltip text="YOUR ACCOUNT">
                <Link to={LINKS.users.user(user.id)}>
                    <StyledIcon>
                        {user.username}
                        <BiUserCircle />
                    </StyledIcon>
                </Link>
            </Tooltip>
            <Tooltip text="APP INFO">
                {InfoByApp[app.name] && (
                    <Link to={LINKS.info.app(app.name)}>
                        <StyledIcon>
                            <AiOutlineInfoCircle />
                        </StyledIcon>
                    </Link>
                )}
            </Tooltip>
            <Tooltip text="SETTINGS">
                <Link to={LINKS.settings.index()}>
                    <StyledIcon>
                        <FiSettings />
                    </StyledIcon>
                </Link>
            </Tooltip>
            <Tooltip text="MESSAGES">
                <Link to={LINKS.messages.index()}>
                    <StyledIcon>
                        <AiOutlineMessage />
                    </StyledIcon>
                </Link>
            </Tooltip>
            <Tooltip text="GENERATE QRCODE">
                <StyledIcon
                    onClick={() => {
                        modalForm({
                            content: () => (
                                <LoadingImage
                                    src={ENDPOINTS.auth.qrcode(
                                        theme.primary,
                                        theme.secondary
                                    )}
                                    alt="qrcode"
                                    width={400}
                                    height={400}
                                />
                            ),
                            title: 'QRCODE',
                            icon: <FaQrcode />,
                        })
                    }}
                >
                    <FaQrcode />
                </StyledIcon>
            </Tooltip>
            <Tooltip text={`${hideSubmenu ? 'SHOW' : 'HIDE'} SUBMENU`}>
                <StyledIcon
                    rotate={hideSubmenu}
                    onClick={() => {
                        setHideSubmenu((prev) => !prev)
                    }}
                >
                    <BsArrowBarUp />
                </StyledIcon>
            </Tooltip>
            <Tooltip text="CHOOSE APP">
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
            </Tooltip>
            <Tooltip text="SERVER TIME">
                <StyledIcon
                    onClick={() => {
                        modalForm({
                            content: ServerClock,
                            title: 'SERVER TIME',
                            icon: <AiOutlineClockCircle />,
                        })
                    }}
                >
                    <AiOutlineClockCircle />
                </StyledIcon>
            </Tooltip>
            <Tooltip text="LOGOUT">
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
            </Tooltip>
        </StyledWrapper>
    )
}
