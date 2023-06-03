import React from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import styled from 'styled-components'
import { TopBarIcons } from '../molecules/TopBarIcons'

const StyledWrapper = styled.nav`
    display: flex;
    padding: 20px 10px;
    box-shadow: 0 0 10px -6px black;
    width: 100%;
    z-index: 1;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.topbar.background};
    color: ${({ theme }) => theme.topbar.font};
`

const StyledMenuButton = styled.button`
    font-size: 30px;
    display: grid;
    place-items: center;
    background-color: transparent;
    border: 0;
    color: ${({ theme }) => theme.topbar.font};
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
            <TopBarIcons />
        </StyledWrapper>
    )
}
