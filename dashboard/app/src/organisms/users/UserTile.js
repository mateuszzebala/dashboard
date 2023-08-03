import React from 'react'
import styled from 'styled-components'
import { ENDPOINTS } from '../../api/endpoints'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { FaLock } from 'react-icons/fa'

const StyledWrapper = styled.div`
    box-shadow: 0 0 8px -5px ${({ theme }) => theme.primary};
    border-radius: 10px;
    width: 100%;
    padding: 5px;
    display: flex;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
        transform: scale(0.95);
    }
`

const StyledProfile = styled.img`
    border-radius: 10%;
    width: 70px;
    height: 70px;
    aspect-ratio: 1/1;
`

const StyledRightSide = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-around;
    padding: 0 10px;
`

const StyledUserText = styled.span`
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
            <StyledRightSide>
                <StyledUserText>
                    {data.is_superuser && <FaLock />} {data.username}
                </StyledUserText>
            </StyledRightSide>
        </StyledWrapper>
    )
}
