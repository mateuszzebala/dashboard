import React from 'react'
import { BiSolidGrid, BiUserCircle } from 'react-icons/bi'
import { AiOutlineInfoCircle, AiOutlineMessage } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { links } from '../router/links'
import { IoMdLogOut } from 'react-icons/io'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { InfoByApp } from '../pages/info/InfoPage'
import { useModalForm } from '../utils/hooks'
import { DashboardsMenu } from '../atoms/DashboardsMenu'

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
    const { ask } = useModalForm()
    return (
        <StyledWrapper>
            <Link to={links.account.index()}>
                <StyledIcon>
                    {username}
                    <BiUserCircle />
                </StyledIcon>
            </Link>
            {InfoByApp[app.name] && (
                <Link to={links.info.app(app.name)}>
                    <StyledIcon>
                        <AiOutlineInfoCircle />
                    </StyledIcon>
                </Link>
            )}

            <Link to={links.settings.index()}>
                <StyledIcon>
                    <FiSettings />
                </StyledIcon>
            </Link>

            <Link to={links.messages.index()}>
                <StyledIcon>
                    <AiOutlineMessage />
                </StyledIcon>
            </Link>
            <StyledIcon
                onClick={() => {
                    ask({
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
                            navigate(links.auth.signin())
                        }
                    })
                }}
            >
                <IoMdLogOut />
            </StyledIcon>
        </StyledWrapper>
    )
}
