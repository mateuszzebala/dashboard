import React from 'react'
import { IoAppsSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledBox = styled.div`
    min-width: 100px;
    min-height: 100px;
    border-radius: 10px;
    aspect-ratio: 1/1;
    transition: box-shadow 0.2s;
    cursor: pointer;
    background-color: ${({ theme }) => theme.secondary};
    a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
    }
`
const StyledName = styled.div``
const StyledLink = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: center;
`
const StyledIcon = styled.div`
    font-size: 30px;
`

export const AppItem = ({ icon, name = '', link }) => {
    return (
        <StyledBox>
            <Link to={link}>
                <StyledLink>
                    <StyledIcon>{icon || <IoAppsSharp />}</StyledIcon>
                    <StyledName>{name}</StyledName>
                </StyledLink>
            </Link>
        </StyledBox>
    )
}
