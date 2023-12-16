import React from 'react'
import styled from 'styled-components'
import { TopBarIcons } from '../molecules/TopBarIcons'
import { LINKS } from '../router/links'
import { Link } from '../atoms/Link'

import {HiOutlineMenu} from 'react-icons/hi'
import { toBoolStr } from '../utils/utils'
import { useSettings } from '../utils/hooks'
import { FiMenu } from 'react-icons/fi'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'

const StyledWrapper = styled.nav`
    display: flex;
    transition: padding 0.3s;
    padding: ${({submenuExists, hideSubmenu}) => submenuExists ? !hideSubmenu ? '20px 10px 10px' : '20px 10px' : '20px 10px'};
    width: 100%;
    z-index: 1;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    overflow-x: scroll;
    user-select: none;
    &::-webkit-scrollbar {
        height: 0;
    }
`

const StyledMenuButton = styled.button`
    font-size: 35px;
    display: grid;
    height: 50px;
    width: 50px;
    place-items: center;
    background-color: transparent;
    border: 0;
    color: ${({ theme }) => theme.primary};
    border-radius: 8px;
    outline: 0 solid ${({ theme }) => theme.tertiary}aa;
    cursor: pointer;
    svg {
        stroke-width: 1.4px;
    }
    transition: outline-width 0.1s;
    &:hover, &:focus {
        outline-width: 3px;
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
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
`

const StyledSubTitle = styled.div`
    font-size: 18px;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 400;
    justify-content: center;
`

const StyledLeftSide = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    a{
        outline: 0 solid ${({ theme }) => theme.tertiary}aa;
        transition: transform 0.1s;
        border-radius: 3px;
    }
    a:focus{
        outline-width: 3px;
    }
`

export const TopBar = ({
    app,
    setClose,
    title,
    close,
    topbarLink,
    setHideSubmenu,
    hideSubmenu,
    submenuExists
}) => {
    const [settings] = useSettings()
    
    function handleBurgerClick() {
        setClose((prev) => !prev)
    }

    return (
        <StyledWrapper
            submenuExists={toBoolStr(submenuExists)}
            hideSubmenu={toBoolStr(hideSubmenu)}
        >
            <StyledLeftSide>
                <StyledMenuButton onClick={handleBurgerClick}>
                    {!close ?  <AiOutlineMenuFold /> : <AiOutlineMenuUnfold/>}
                </StyledMenuButton>
                <Link
                    animation={false}
                    to={topbarLink ? topbarLink : app.link || LINKS.home()}
                >
                    <StyledTitle>
                        {settings['dashboard.topbar_app_icon'] && <app.icon />}
                        {app.name.toUpperCase()}
                        <StyledSubTitle>{title}</StyledSubTitle>
                    </StyledTitle>
                </Link>
            </StyledLeftSide>
            <TopBarIcons
                app={app}
                hideSubmenu={hideSubmenu}
                setHideSubmenu={setHideSubmenu}
            />
        </StyledWrapper>
    )
}
