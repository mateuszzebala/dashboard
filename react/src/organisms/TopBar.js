import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import styled from 'styled-components'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiSettings, FiSearch } from 'react-icons/fi'

const StyledWrapper = styled.nav`
    display: flex;
    padding: 20px 10px;
    box-shadow: 0 0 10px -6px black;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const StyledMenuButton = styled.button`
    font-size: 30px;
    display: grid;
    place-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    svg {
        stroke-width: 1.4px;
    }
    &:focus {
        outline: none;
    }
`

const StyledTitle = styled.span`
    font-size: 25px;
    font-weight: 500;
`

const StyledLinkIcon = styled.span`
    display: grid;
    cursor: pointer;
    font-size: 20px;
    place-items: center;
`
const StyledLinkIcons = styled.span`
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: black;
`
const StyledLeftSide = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`

export const TopBar = ({ title = '', setOpen }) => {
    function handleBurgerClick() {
        setOpen((prev) => !prev)
    }

    return (
        <StyledWrapper>
            <StyledLeftSide>
                <StyledMenuButton onClick={handleBurgerClick}>
                    <CiMenuBurger />
                </StyledMenuButton>
                <StyledTitle>{title.toUpperCase()}</StyledTitle>
            </StyledLeftSide>
            <StyledLinkIcons>
                <StyledLinkIcon>
                    <FiSearch />
                </StyledLinkIcon>
                <StyledLinkIcon>
                    <FiSettings />
                </StyledLinkIcon>
                <StyledLinkIcon>
                    <BiUserCircle />
                </StyledLinkIcon>
                <StyledLinkIcon>
                    <AiOutlineMessage />
                </StyledLinkIcon>
            </StyledLinkIcons>
        </StyledWrapper>
    )
}
