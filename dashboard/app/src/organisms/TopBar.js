import React from 'react'
import styled from 'styled-components'
import { TopBarIcons } from '../molecules/TopBarIcons'
import { links } from '../router/links'
import { Link } from '../atoms/Link'
import { AiOutlineMenu } from 'react-icons/ai'

const StyledWrapper = styled.nav`
    display: flex;
    padding: 20px 10px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 0 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.topbar.font};
    text-decoration: none;
`

const StyledSubTitle = styled.div`
    font-size: 18px;
`

const StyledLeftSide = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`

export const TopBar = ({ app, setClose, title }) => {
    function handleBurgerClick() {
        setClose((prev) => !prev)
    }

    return (
        <StyledWrapper>
            <StyledLeftSide>
                <StyledMenuButton onClick={handleBurgerClick}>
                    <AiOutlineMenu />
                </StyledMenuButton>
                <Link animation={false} to={app.link || links.home()}>
                    <StyledTitle>
                        {<app.icon />} {app.name.toUpperCase()}
                        <StyledSubTitle>{title}</StyledSubTitle>
                    </StyledTitle>
                </Link>
            </StyledLeftSide>
            <TopBarIcons app={app} />
        </StyledWrapper>
    )
}
