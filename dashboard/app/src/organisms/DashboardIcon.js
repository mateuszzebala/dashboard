import styled from 'styled-components'
import React from 'react'
import { toBoolStr } from '../utils/utils'

const StyleDashboard = styled.span`
    font-size: 25px;
    padding: 10px;
    text-align: center;
    color: ${({ theme }) => theme.secondary};
    cursor: pointer;
    outline: 0px dashed ${({ theme }) => theme.secondary}88;
    border-radius: 3px;
    transition: outline-width 0.1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:focus{
        outline-width: 3px;
    }
    span{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        font-size: 30px;
    }

    span:first-child{
        background-color: ${({theme, second})=>second ? theme.secondary : theme.primary};
        color: ${({theme, second})=>second ? theme.primary : theme.secondary};
        font-weight: bold;
    }
    
    span:last-child{
        color: ${({theme, second})=>second ? theme.secondary : theme.primary};
        background-color: ${({theme, second})=>second ? theme.primary : theme.secondary};
        font-weight: light;
    }

`


export const DashboardIcon = ({second=false, ...props}) => {
    return ( 
        <StyleDashboard second={toBoolStr(second)} {...props}>
            <span>DASH</span>
            <span>BOARD</span>
        </StyleDashboard>
    )
}