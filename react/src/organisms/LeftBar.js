import React from 'react'
import styled from 'styled-components'
import { LeftBarItem } from '../molecules/LeftBarItem'
import { BiHomeAlt2, BiDollarCircle } from 'react-icons/bi'
import { AiOutlineMessage } from 'react-icons/ai'
import {
    BsTerminal,
    BsDatabase,
    BsFolder,
    BsPlay,
    BsCalendarWeek,
    BsGlobeEuropeAfrica,
} from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { toBoolStr } from '../utils/utils'
import { FaReact, FaRegStickyNote, FaRegEye } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { SiDjango } from 'react-icons/si'

const StyledWrapper = styled.nav`
    background-color: ${({ theme }) => theme.leftbar.background};
    color: ${({ theme }) => theme.leftbar.font};
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
    width: 200px;
    overflow-x: hidden;
    transition: max-width 0.3s ease;
    max-width: ${({ open }) => (open ? '200px' : '0')};
    box-shadow: 0 0 10px -5px black;
    gap: 10px;
    ::-webkit-scrollbar {
        width: 0;
    }
`

const StyleDashboard = styled.span`
    font-size: 20px;
    padding: 10px;
    text-align: center;
`

export const LeftBar = ({ open }) => {
    return (
        <StyledWrapper open={toBoolStr(open)}>
            <StyleDashboard>
                <SiDjango /> <FaReact />
                <br />
                DASH
                <br />
                BOARD
            </StyleDashboard>
            <LeftBarItem icon={<BiHomeAlt2 />} to={'/'}>
                HOME
            </LeftBarItem>
            <LeftBarItem icon={<BsDatabase />} to={'/'}>
                DATABASE
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
            <LeftBarItem icon={<BsPlay />} to={'/'}>
                PYTHON
            </LeftBarItem>
            <LeftBarItem icon={<BsCalendarWeek />} to={'/'}>
                CALENDAR
            </LeftBarItem>
            <LeftBarItem icon={<HiOutlineMail />} to={'/'}>
                EMAIL
            </LeftBarItem>
            <LeftBarItem icon={<FaRegStickyNote />} to={'/'}>
                NOTES
            </LeftBarItem>
            <LeftBarItem icon={<FaRegEye />} to={'/'}>
                REQUESTS
            </LeftBarItem>
            <LeftBarItem icon={<BiDollarCircle />} to={'/'}>
                FINANCE
            </LeftBarItem>
            <LeftBarItem icon={<BsGlobeEuropeAfrica />} to={'/'}>
                MAP
            </LeftBarItem>
        </StyledWrapper>
    )
}
