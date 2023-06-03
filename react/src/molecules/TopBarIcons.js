import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiSettings, FiSearch } from 'react-icons/fi'
import styled from 'styled-components'

const StyledIcon = styled.span`
    display: grid;
    cursor: pointer;
    font-size: 20px;
    place-items: center;
    color: ${({ theme }) => theme.topbar.font};
`
const StyledWrapper = styled.span`
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: black;
`

export const TopBarIcons = () => {
    return (
        <StyledWrapper>
            <StyledIcon>
                <FiSearch />
            </StyledIcon>
            <StyledIcon>
                <FiSettings />
            </StyledIcon>
            <StyledIcon>
                <BiUserCircle />
            </StyledIcon>
            <StyledIcon>
                <AiOutlineMessage />
            </StyledIcon>
        </StyledWrapper>
    )
}
