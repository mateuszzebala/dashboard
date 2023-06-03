import React from 'react'
import styled from 'styled-components'
import { range, toBoolStr } from '../utils/utils'

const StyledWrapper = styled.div`
    display: flex;
    gap: 7px;
    align-items: center;
    justify-content: center;
`

const StyledPageButton = styled.button`
    background-color: ${({ theme }) => theme.button.background};
    color: ${({ theme }) => theme.button.font};
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    padding: 5px;
    font-size: 18px;
    width: ${({ selected }) => (selected ? '40px' : '33px')};
    height: ${({ selected }) => (selected ? '40px' : '33px')};
    cursor: pointer;
    outline: 0px solid ${({ theme }) => theme.button.background}88;
    transition: 0.1s outline-width, width 0.1s, height 0.1s;
    &:focus,
    &:hover {
        outline-width: 3px;
    }
`

export const Paginator = ({ value, pages = 10 }) => {
    return (
        <StyledWrapper>
            {range(1, pages).map((page) => (
                <StyledPageButton
                    selected={toBoolStr(value == page)}
                    key={page}
                >
                    {page + 1}
                </StyledPageButton>
            ))}
        </StyledWrapper>
    )
}
