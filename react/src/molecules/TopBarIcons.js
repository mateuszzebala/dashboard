import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiSettings, FiSearch } from 'react-icons/fi'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { links } from '../router/links'
import { toBoolStr } from '../utils/utils'

const StyledIcon = styled.span`
    display: grid;
    cursor: pointer;
    font-size: 20px;
    place-items: center;
    color: ${({ theme }) => theme.topbar.font};
    transition: color 0.1s;
    &:hover {
        color: ${({ theme }) => theme.secondary};
    }
`
const StyledWrapper = styled.span`
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: black;
`
const StyledSearchInput = styled.input`
    border: 0;
    border-bottom: 2px solid ${({ theme }) => theme.input.border};
    text-align: center;
    padding: 3px 0;
    transition: max-width 0.2s;
    max-width: ${({ show }) => (show ? '200px' : 0)};
    font-size: 18px;
    &:focus {
        outline: none;
    }
`

export const TopBarIcons = () => {
    const [showInput, setShowInput] = React.useState(false)
    return (
        <StyledWrapper>
            <StyledSearchInput
                placeholder="SEARCH ..."
                show={toBoolStr(showInput)}
            />
            <StyledIcon
                onClick={() => {
                    setShowInput((prev) => !prev)
                }}
            >
                <FiSearch />
            </StyledIcon>
            <Link to={links.settings.index()}>
                <StyledIcon>
                    <FiSettings />
                </StyledIcon>
            </Link>
            <Link to={links.account.index()}>
                <StyledIcon>
                    <BiUserCircle />
                </StyledIcon>
            </Link>
            <Link to={links.messages.index()}>
                <StyledIcon>
                    <AiOutlineMessage />
                </StyledIcon>
            </Link>
        </StyledWrapper>
    )
}
