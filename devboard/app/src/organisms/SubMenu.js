import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'

const StyledSubMenu = styled.div`
    display: flex;
    gap: 10px;
    padding: ${({ exists, hideSubmenu }) =>
        exists && !hideSubmenu ? '5px 10px 10px 10px' : '0 10px'};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    z-index: 2;
    align-items: center;
    justify-content: flex-start;
    overflow-x: scroll;
    overflow-y: visible;
    transition: max-height 0.3s, padding 0.3s;
    max-width: 100%;
    max-height: ${({ hideSubmenu }) => (hideSubmenu ? '0px' : '200px')};
    &::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
`

export const SubMenu = ({ children, hideSubmenu }) => {
    return (
        <StyledSubMenu hideSubmenu={hideSubmenu} exists={toBoolStr(children)}>
            {children}
        </StyledSubMenu>
    )
}
