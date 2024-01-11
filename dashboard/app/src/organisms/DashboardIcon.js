import styled from 'styled-components'
import React from 'react'
import { toBoolStr } from '../utils/utils'

const StyleDashboard = styled.span`
    font-size: 38px;
    padding: 10px;
    text-align: center;
    color: ${({ theme }) => theme.secondary};
    cursor: pointer;
    outline: 0px dashed ${({ theme }) => theme.secondary}22;
    border-radius: 3px;
    transition: outline-width 0.1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:focus {
        outline-width: 3px;
    }
    span {
        display: flex;
        flex-direction: column;
        font-family: 'Rubik Glitch';
        align-items: center;
        justify-content: center;
        padding: 2px;
        border-radius: 5px;
    }

    span:first-child {
        background-color: ${({ theme, second }) => (second ? theme.secondary : theme.primary)};
        font-weight: bold;
        color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
    }

    span:last-child {
        color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
        background-color: ${({ theme, second }) => (second ? theme.secondary : theme.primary)};
        font-weight: light;
    }
`

export const DashboardIcon = ({ second = false, ...props }) => {
    return (
        <StyleDashboard second={toBoolStr(second)} {...props}>
            <span>DEV</span>
            <span>BOARD</span>
        </StyleDashboard>
    )
}
