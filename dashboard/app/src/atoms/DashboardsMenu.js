import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme/theme'

const StyledWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 0 2px;
    overflow: hidden;
    flex-direction: row;
    position: absolute;
    top: 0;
    right: 0;
    gap: 2px;
`

const StyledLine = styled.a`
    background-color: ${({ color }) => color};
    cursor: pointer;
    transition: min-height 0.3s, height 0.3s, color 0.3s;
    display: flex;
    padding: 8px 15px;
    border-radius: 0 0 3px 3px;
    align-items: center;
    justify-content: center;
    color: transparent;
    height: 0;
    writing-mode: vertical-lr;
    z-index: 10;
    &:hover {
        max-height: 120px;
        height: 120px;
        color: ${({ theme }) => theme.secondary};
    }
`

export const DashboardsMenu = () => {
    return (
        <StyledWrapper>
            <StyledLine href={'/'} color={theme.warning}>
                PAGE
            </StyledLine>
            <StyledLine href={'/admin/'} color={theme.accent}>
                ADMIN
            </StyledLine>
            <StyledLine href={'/dashboard/'} color={theme.error}>
                DASHBOARD
            </StyledLine>
            <StyledLine href={'/'} color={theme.success}>
                OTHER
            </StyledLine>
        </StyledWrapper>
    )
}
