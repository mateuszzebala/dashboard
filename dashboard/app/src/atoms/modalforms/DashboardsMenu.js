import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { Theme } from '../Theme'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
import { SiDjango } from 'react-icons/si'
import { BiSitemap, BiSolidDashboard } from 'react-icons/bi'
import { LINKS } from '../../router/links'
import { useTheme } from '../../utils/hooks'

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
    const [theme] = useTheme()
    return (
        <StyledButtons>
            <StyledColumn>
                <Theme
                    value={{
                        primary: theme.accent,
                    }}
                >
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        target={'_blank'}
                        to={LINKS.other.page()}
                        size={2}
                        icon={<BiSitemap />}
                    />
                </Theme>
                <span>PAGE</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                    to={LINKS.home()}
                    size={2}
                    icon={<BiSolidDashboard />}
                />
                <span>
                    DASH
                    <br />
                    BOARD
                </span>
            </StyledColumn>
            <StyledColumn>
                <Theme
                    value={{
                        primary: theme.success,
                    }}
                >
                    <Button
                        target={'_blank'}
                        to={LINKS.other.admin()}
                        size={2}
                        icon={<SiDjango />}
                    />
                </Theme>
                <span>ADMIN</span>
            </StyledColumn>
        </StyledButtons>
    )
}
