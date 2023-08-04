import React from 'react'
import styled from 'styled-components'
import { ENDPOINTS } from '../../api/endpoints'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { FaLock } from 'react-icons/fa'

const StyledWrapper = styled.div`
    box-shadow: 0 0 8px -5px ${({ theme }) => theme.primary};
    border-radius: 10px;
    padding: 5px;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 200px;
    justify-content: space-around;
    display: flex;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
        transform: scale(0.95);
    }
`

const StyledProfile = styled.img`
    border-radius: 10%;
    width: 70%;
    height: 70%;
    aspect-ratio: 1/1;
    box-shadow: 0 0 10px -6px ${({ theme }) => theme.primary};
`

const StyledUsername = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const UserTile = ({ data }) => {
    const navigate = useNavigate()
    return (
        <StyledWrapper
            onClick={() => {
                navigate(LINKS.users.user(data.id))
            }}
        >
            <StyledProfile src={ENDPOINTS.auth.profile(data.username)} />
            <StyledUsername>
                {data.is_superuser && <FaLock />} {data.username}
            </StyledUsername>
        </StyledWrapper>
    )
}
