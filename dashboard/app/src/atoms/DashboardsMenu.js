import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Theme } from './Theme'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
import { theme } from '../theme/theme'
import { SiDjango } from 'react-icons/si'
import { BiSitemap, BiSolidDashboard } from 'react-icons/bi'
import { links } from '../router/links'

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    padding: 30px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
`

export const DashboardsMenu = ({ setOpen }) => {
    return (
        <StyledButtons>
            <StyledColumn>
                <Theme
                    value={{
                        button: {
                            background: theme.accent,
                            font: theme.secondary,
                        },
                    }}
                >
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        target={'_blank'}
                        to={links.other.page()}
                        size={2}
                        icon={<BiSitemap />}
                    />
                </Theme>
                <span>PAGE</span>
            </StyledColumn>
            <StyledColumn>
                <Theme
                    value={{
                        button: {
                            background: theme.primary,
                            font: theme.secondary,
                        },
                    }}
                >
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        to={links.home()}
                        size={2}
                        icon={<BiSolidDashboard />}
                    />
                </Theme>
                <span>
                    DASH
                    <br />
                    BOARD
                </span>
            </StyledColumn>
            <StyledColumn>
                <Theme
                    value={{
                        button: {
                            background: theme.success,
                            font: theme.secondary,
                        },
                    }}
                >
                    <Button
                        target={'_blank'}
                        to={links.other.admin()}
                        size={2}
                        icon={<SiDjango />}
                    />
                </Theme>
                <span>ADMIN</span>
            </StyledColumn>
            <StyledColumn>
                <Theme
                    value={{
                        button: {
                            background: theme.warning,
                            font: theme.secondary,
                        },
                    }}
                >
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        target={'_blank'}
                        to={links.other.shoper()}
                        size={2}
                        icon={<AiOutlineShoppingCart />}
                    />
                </Theme>
                <span>SHOPER</span>
            </StyledColumn>
            <StyledColumn>
                <Theme
                    value={{
                        button: {
                            background: theme.error,
                            font: theme.secondary,
                        },
                    }}
                >
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        target={'_blank'}
                        to={links.other.bloger()}
                        size={2}
                        icon={<FaBlog />}
                    />
                </Theme>
                <span>BLOGER</span>
            </StyledColumn>
        </StyledButtons>
    )
}
