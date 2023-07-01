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
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.secondary}11;
    border-radius: 5px;
    padding: 15px 10px;
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
    max-height: ${({ sublinkslength, dropdown }) =>
        sublinkslength === 0 ? 0 : dropdown ? '300px' : '0'};
    padding: ${({ sublinkslength, dropdown }) =>
        sublinkslength === 0 ? 0 : dropdown ? '15px 0' : '0'};
    transition: max-height 0.2s, padding 0.2s;
    gap: 10px;
    font-size: 15px;
    a {
        color: ${({ theme }) => theme.leftbar.font};
    }
`

const StyledDropdownIcon = styled.div`
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    justify-content: center;
    transform: ${({ dropdown, sublinkslength }) => {
        if (sublinkslength === 0) return 'rotate(0deg)'
        return dropdown ? 'rotate(-90deg)' : 'rotate(90deg)'
    }};
`

export const LeftBarItem = ({ app, sublinks = {} }) => {
    const [dropdown, setDropdown] = React.useState(false)
    return (
        <StyledWrapper>
            <StyledTop
                onClick={() => {
                    setDropdown((prev) => !prev)
                }}
            >
                <app.icon />
                <Link to={app.link}>{app.name}</Link>
                <StyledDropdownIcon
                    sublinkslength={Object.keys(sublinks).length}
                    dropdown={toBoolStr(dropdown)}
                >
                    <MdKeyboardArrowRight />
                </StyledDropdownIcon>
            </StyledTop>
            <StyledDropdown
                dropdown={toBoolStr(dropdown)}
                sublinkslength={Object.keys(sublinks).length}
            >
                {Object.keys(sublinks).map((link) => (
                    <Link key={link} to={sublinks[link]}>
                        {link}
                    </Link>
                ))}
            </StyledDropdown>
        </StyledWrapper>
    )
}
