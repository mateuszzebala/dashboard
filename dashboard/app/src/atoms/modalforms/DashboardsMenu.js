import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { Theme } from '../Theme'
import { LINKS } from '../../router/links'
import { useTheme } from '../../utils/hooks'

const StyledButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 8px;
    padding: 20px;
    width: 100%;
    a,
    span {
        width: 100%;
        display: flex;
    }
`

export const DashboardsMenu = ({ setOpen }) => {
    const [theme] = useTheme()
    return (
        <StyledButtons>
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
                    size={1.4}
                    width={'100%'}
                >
                    PAGE
                </Button>
            </Theme>
            <Button
                onClick={() => {
                    setOpen(false)
                }}
                to={LINKS.home()}
                size={1.4}
                width={'100%'}
            >
                DASHBOARD
            </Button>
            <Theme
                value={{
                    primary: theme.success,
                }}
            >
                <Button target={'_blank'} to={LINKS.other.admin()} size={1.4} width={'100%'}>
                    ADMIN
                </Button>
            </Theme>
            <Theme
                value={{
                    primary: theme.warning,
                }}
            >
                <Button target={'_blank'} to={'#'} size={1.4} width={'100%'}>
                    ...
                </Button>
            </Theme>
            <Theme
                value={{
                    primary: theme.error,
                }}
            >
                <Button target={'_blank'} to={LINKS.other.bloger()} size={1.4} width={'100%'}>
                    BLOGER
                </Button>
            </Theme>
        </StyledButtons>
    )
}
