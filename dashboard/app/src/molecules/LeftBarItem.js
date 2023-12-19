import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { toBoolStr } from '../utils/utils'
import { useSettings } from '../utils/hooks'

const StyledTop = styled.div`
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: space-between;
    gap: 10px;
    color: ${({ theme }) => theme.secondary};
    font-size: 20px;
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.secondary}05;
    border-radius: 5px;
    padding: 15px 10px;
    font-weight: bold;
    width: 90%;
    cursor: pointer;

    a {
        color: ${({ theme }) => theme.secondary};
        text-decoration: none;
        font-size: 15px;
    }
    &:hover a, a:focus{
        outline: none;
        text-decoration: underline;
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
    user-select: none;
    a {
        color: ${({ theme }) => theme.secondary};
        &:hover, &:focus{
            outline: none;
            text-decoration: underline;
        }
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

export const LeftBarItem = ({ app, active, sublinks = {} }) => {
    const [dropdown, setDropdown] = React.useState(false)
    const [settings] = useSettings()

    return (
        <StyledWrapper>
            <StyledTop
                onClick={() => {
                    setDropdown((prev) => !prev)
                }}
                active={toBoolStr(active)}
            >
                {settings['dashboard.leftbar_app_icons'] && <app.icon />}
                <Link to={app.link}>{app.name}</Link>
                {settings['dashboard.leftbar_arrow_icons'] && (
                    <StyledDropdownIcon
                        sublinkslength={Object.keys(sublinks).length}
                        dropdown={toBoolStr(dropdown)}
                    >
                        <MdKeyboardArrowRight />
                    </StyledDropdownIcon>
                )}
            </StyledTop>
            <StyledDropdown
                dropdown={toBoolStr(dropdown)}
                sublinkslength={Object.keys(sublinks).length}
            >
                {Object.keys(sublinks).map((link) => (
                    <Link key={link} to={sublinks[link]} tabIndex={dropdown ? 0 : -1}>
                        {link}
                    </Link>
                ))}
            </StyledDropdown>
        </StyledWrapper>
    )
}
