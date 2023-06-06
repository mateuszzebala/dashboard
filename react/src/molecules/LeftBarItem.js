import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MdKeyboardArrowRight } from 'react-icons/md'

const StyledWrapper = styled.div`
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

export const LeftBarItem = ({ children, icon, to }) => {
    return (
        <StyledWrapper>
            {icon}
            <Link to={to}>{children}</Link>
            <MdKeyboardArrowRight />
        </StyledWrapper>
    )
}
