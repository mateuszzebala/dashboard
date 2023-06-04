import React from 'react'
import styled from 'styled-components'
import { LeftBarItem } from '../molecules/LeftBarItem'
import { SiDjango } from 'react-icons/si'
import { APPS } from '../apps'
import { FaReact } from 'react-icons/fa'
import { toBoolStr } from '../utils/utils'

const StyledWrapper = styled.nav`
    background-color: ${({ theme }) => theme.leftbar.background};
    color: ${({ theme }) => theme.leftbar.font};
    height: 100vh;
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0 0;
    width: 230px;
    overflow-x: hidden;
    transition: max-width 0.3s ease, min-width 0.3s ease;
    max-width: ${({ open }) => (open ? '200px' : '0')};
    min-width: ${({ open }) => (open ? '200px' : '0')};
    box-shadow: 0 0 10px -5px black;
    gap: 10px;
`

const StyleDashboard = styled.span`
    font-size: 20px;
    padding: 10px;
    text-align: center;
    color: ${({ theme }) => theme.leftbar.font};
`
const StyledMenuItems = styled.div`
    overflow-y: scroll;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    flex-direction: column;
    height: 100%;
    ::-webkit-scrollbar {
        width: 0;
    }
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
            <StyledMenuItems>
                {APPS.map((app) => {
                    const Icon = app.icon
                    return (
                        <LeftBarItem
                            key={app.name}
                            icon={<Icon />}
                            to={app.link}
                        >
                            {app.name.toUpperCase()}
                        </LeftBarItem>
                    )
                })}
            </StyledMenuItems>
        </StyledWrapper>
    )
}
