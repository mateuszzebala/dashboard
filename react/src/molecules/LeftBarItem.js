import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { toBoolStr } from '../utils/utils'

const StyledTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: ${({ theme }) => theme.leftbar.font};
    font-size: 20px;
    padding: 5px;
    background-color: #ffffff09;
    border-radius: 5px;
    padding: 10px;
    width: 90%;
    cursor: pointer;

    a {
        color: ${({ theme }) => theme.leftbar.font};
        text-decoration: none;
        font-size: 15px;
    }
`
const StyledWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: ${({ dropdown }) => dropdown ? '300px' : '0'};
    padding: ${({ dropdown }) => dropdown ? '15px' : '0'};
    transition: max-height 0.2s, padding 0.2s;
    gap: 6px;
    font-size: 18px;
    a{
        color: ${({ theme }) => theme.leftbar.font};
    }
`

const StyledDropdownIcon = styled.div`
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    justify-content: center;
    transform: rotate(${({ dropdown }) => dropdown ? -90 : 90}deg);
`

export const LeftBarItem = ({ children, icon, to }) => {
    const [dropdown, setDropdown] = React.useState(false)
    return (
        <StyledWrapper>
            <StyledTop onClick={() => {
                setDropdown(prev => !prev)
            }}>
                {icon}
                <Link to={to}>{children}</Link>
                <StyledDropdownIcon dropdown={toBoolStr(dropdown)}><MdKeyboardArrowRight /></StyledDropdownIcon>
            </StyledTop>
            <StyledDropdown dropdown={toBoolStr(dropdown)}>
                <Link to={'/'}>Item 1</Link>
                <Link to={'/'}>Item 2</Link>
                <Link to={'/'}>Item 3</Link>
                <Link to={'/'}>Item 4</Link>
                <Link to={'/'}>Item 5</Link>
                <Link to={'/'}>Item 6</Link>
            </StyledDropdown>
        </StyledWrapper>
    )
}
