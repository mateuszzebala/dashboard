import React from 'react'
import { IoAppsSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledBox = styled.div`
    min-width: 100px;
    min-height: 100px;
    border-radius: 10px;
    box-shadow: 0 0 6px -4px black;
    color: ${({ theme }) => theme.primary} !important;

    transition: transform 0.4s, box-shadow 0.4s, background-color 0.4s;
    cursor: pointer;
    a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
        transition: color 0.1s;
    }
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 5px -4px black;
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
