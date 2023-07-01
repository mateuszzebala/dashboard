import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineInfoCircle, AiOutlineMessage } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { links } from '../router/links'
import { IoMdLogOut } from 'react-icons/io'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'

const StyledIcon = styled.span`
    display: grid;
    cursor: pointer;
    font-size: 20px;
    place-items: center;
    color: ${({ theme }) => theme.topbar.font};
    transition: color 0.1s;
    &:hover {
        color: ${({ theme }) => theme.accent};
    }
`
const StyledWrapper = styled.span`
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: ${({ theme }) => theme.primary};
`

export const TopBarIcons = ({ app }) => {
    const navigate = useNavigate()

    return (
        <StyledWrapper>
            <Link to={links.info.app(app.name)}>
                <StyledIcon>
                    <AiOutlineInfoCircle />
                </StyledIcon>
            </Link>
            <Link to={links.settings.index()}>
                <StyledIcon>
                    <FiSettings />
                </StyledIcon>
            </Link>
            <Link to={links.account.index()}>
                <StyledIcon>
                    <BiUserCircle />
                </StyledIcon>
            </Link>
            <Link to={links.messages.index()}>
                <StyledIcon>
                    <AiOutlineMessage />
                </StyledIcon>
            </Link>
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
