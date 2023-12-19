import React from 'react'
import { BiSolidGrid } from 'react-icons/bi'
import {
    AiOutlineClockCircle,
    AiOutlineInfoCircle,
    AiOutlineUser,
} from 'react-icons/ai'
import { FiClock, FiGrid, FiInfo, FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { LINKS } from '../router/links'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { InfoByApp } from '../pages/info/InfoPage'
import { useGlobalKey, useModalForm, useSettings, useTheme, useUser } from '../utils/hooks'
import { DashboardsMenu } from '../atoms/modalforms/DashboardsMenu'
import { FaQrcode } from 'react-icons/fa'
import { LoadingImage } from '../atoms/LoadingImage'
import { BsArrowBarUp, BsQrCode } from 'react-icons/bs'
import { ServerClock } from '../atoms/ServerClock'
import { Tooltip } from '../atoms/Tooltip'
import { APPS } from '../apps/apps'

const StyledIcon = styled.button`
    display: flex;
    cursor: pointer;
    font-size: 18px;
    align-items: center;
    gap: 5px;
    background-color: transparent;
    border: 0;
    text-decoration: none !important;
    color: ${({ theme }) => theme.primary};
    transition: color 0.2s, background-color 0.2s, transform 0.3s;
    padding: 10px;
    border-radius: 20px;
    transform: ${({ rotate }) => (rotate ? 'rotate(180deg)' : 'rotate(0deg)')};
    &:hover, &:focus{
        outline: none;
        background-color: ${({ theme }) => theme.tertiary}44;
    }
`
const StyledWrapper = styled.span`
    display: flex;
    padding: 0 10px;
    gap: 3px;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary};
`

export const TopBarIcons = ({ app, setHideSubmenu, hideSubmenu }) => {
    const navigate = useNavigate()
    const modalForm = useModalForm()
    const [settings] = useSettings()
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
                <StyledIcon onClick={() => navigate(LINKS.users.user(user.id))}>
                    {settings['dashboard.topbar_username'] && user.username}
                    <FiUser />
                </StyledIcon>
            </Tooltip>
            <Tooltip text="APP INFO">
                {InfoByApp[app.name] && (
                    <StyledIcon onClick={() => {
                        navigate(LINKS.info.app(app.name))
                    }}>
                        <FiInfo />
                    </StyledIcon>
                )}
            </Tooltip>
            <Tooltip text="SETTINGS">
                <StyledIcon onClick={() => {
                    navigate(Object.keys(APPS).includes(app.name.toLowerCase()) ? LINKS.settings.byApp(app.name.toLowerCase()) : LINKS.settings.byApp(APPS.home.name.toLowerCase()))
                }}>
                    <FiSettings />
                </StyledIcon>
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
                    <BsQrCode />
                </StyledIcon>
            </Tooltip>
            {settings['dashboard.topbar_submenu_toggler'] &&
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
            }
            {settings['dashboard.dashboards_menu'] &&
                <Tooltip text="CHOOSE PAGE">
                    <StyledIcon
                        onClick={() => {
                            modalForm({
                                content: DashboardsMenu,
                                title: 'CHOOSE PAGE',
                                icon: <FiGrid />,
                            })
                        }}
                    >
                        <FiGrid />
                    </StyledIcon>
                </Tooltip>
            }
            <Tooltip text="SERVER TIME">
                <StyledIcon
                    onClick={() => {
                        modalForm({
                            content: ServerClock,
                            title: 'SERVER TIME',
                            icon: <FiClock />,
                        })
                    }}
                >
                    <FiClock />
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
                    <FiLogOut />
                </StyledIcon>
            </Tooltip>
        </StyledWrapper>
    )
}
