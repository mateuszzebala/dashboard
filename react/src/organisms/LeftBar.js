import React from 'react'
import styled from 'styled-components'
import { LeftBarItem } from '../molecules/LeftBarItem'
import { BiHomeAlt2 } from 'react-icons/bi'
import { AiOutlineMessage } from 'react-icons/ai'
import { BsTerminal, BsDatabase, BsFolder } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'

const StyledWrapper = styled.nav`
    background-color: var(--dark);
    color: white;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
    width: 200px;
    overflow-x: hidden;
    transition: max-width 0.3s;
    max-width: ${({ open }) => (open === 'true' ? '200px' : '0')};
    box-shadow: 0 0 10px -5px black;
    gap: 10px;
`

const StyleDashboard = styled.span`
    font-size: 20px;
    padding: 10px;
`

export const LeftBar = ({ open }) => {
    return (
        <StyledWrapper open={open ? 'true' : 'false'}>
            <StyleDashboard>
                DASH
                <br />
                BOARD
            </StyleDashboard>
            <LeftBarItem icon={<BiHomeAlt2 />} to={'/'}>
                HOME
            </LeftBarItem>
            <LeftBarItem icon={<BsDatabase />} to={'/'}>
                HOME
            </LeftBarItem>
            <LeftBarItem icon={<AiOutlineMessage />} to={'/'}>
                MESSAGES
            </LeftBarItem>
            <LeftBarItem icon={<FiUsers />} to={'/'}>
                USERS
            </LeftBarItem>
            <LeftBarItem icon={<BsFolder />} to={'/'}>
                FILES
            </LeftBarItem>
            <LeftBarItem icon={<BsTerminal />} to={'/'}>
                TERMINAL
            </LeftBarItem>
        </StyledWrapper>
    )
}
