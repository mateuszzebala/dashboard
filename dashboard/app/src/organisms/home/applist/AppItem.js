import React from 'react'
import { IoAppsSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledBox = styled.div`
    min-width: 100px;
    min-height: 100px;
    border-radius: 10px;
    aspect-ratio: 1/1;
    transition: box-shadow 0.2s;
    cursor: pointer;
    background-color: ${({ theme }) => theme.secondary};
    transition: background 0.3s;
    a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
    }
    svg{
        transition: transform 0.3s;
    }
    :hover svg{
        transform: scale(0.8);
    }
    :hover, :focus{
        outline: none;
        background: ${({theme})=>theme.primary}22;
    }
`
const StyledName = styled.div`
    text-transform: uppercase;
    font-size: 14px;
`
const StyledLink = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: center;
`
const StyledIcon = styled.div`
    font-size: 32px;
`

export const AppItem = ({ icon, name = '', link }) => {
    const navigate = useNavigate()
    return (
        <StyledBox tabIndex={0} onClick={()=>navigate(link)}>
            <StyledLink>
                <StyledIcon>{icon || <IoAppsSharp />}</StyledIcon>
                <StyledName>{name}</StyledName>
            </StyledLink>
        </StyledBox>
    )
}
