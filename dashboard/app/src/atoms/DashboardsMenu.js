import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme/theme'

const StyledWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 2px 0;
    overflow: hidden;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    gap: 2px;
`

const StyledLine = styled.a`
    background-color: ${({ color }) => color};
    cursor: pointer;
    transition: min-width 0.3s, width 0.3s, color 0.3s;
    display: flex;
    padding: 15px 4px;
    border-radius: 2px 0 0 2px;
    align-items: center;
    justify-content: center;
    color: transparent;
    width: 0;

    z-index: 10;
    &:hover {
        max-width: 120px;
        width: 120px;
        color: ${({ theme }) => theme.secondary};
    }
`

export const DashboardsMenu = () => {
    return (
        <StyledWrapper>
            <StyledLine target="_blank" href={'/'} color={theme.warning}>
                PAGE
            </StyledLine>
            <StyledLine target="_blank" href={'/admin/'} color={theme.accent}>
                ADMIN
            </StyledLine>
            <StyledLine
                target="_blank"
                href={'/dashboard/'}
                color={theme.error}
            >
                DASHBOARD
            </StyledLine>
            <StyledLine target="_blank" href={'/'} color={theme.success}>
                OTHER
            </StyledLine>
        </StyledWrapper>
    )
}
