import React from 'react'
import styled from 'styled-components'
import { range, toBoolStr } from '../utils/utils'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'

const StyledWrapper = styled.div`
    display: inline-flex;
    gap: 7px;
    height: 50px;
    align-items: center;
    justify-content: center;
`

const StyledPageButton = styled.button`
    background-color: ${({ theme, second }) =>
        second ? theme.primary + '22' : theme.primary};
    color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
    outline-color: ${({ theme, second }) =>
        theme.primary + (second ? '22' : '88')};
    outline-style: solid;
    outline-width: 0;
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    padding: 5px;
    font-size: 18px;
    width: ${({ selected }) => (selected ? '45px' : '40px')};
    height: ${({ selected }) => (selected ? '45px' : '40px')};
    cursor: pointer;
    font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
    transition: 0.1s outline-width, width 0.1s, height 0.1s;
    &:focus,
    &:hover {
        outline-width: 3px;
    }
`

export const Paginator = ({ value, setValue, pages, second }) => {
    return (
        <StyledWrapper>
            <StyledPageButton
                second={second}
                onClick={() => {
                    setValue((prev) => (prev > 0 ? prev - 1 : prev))
                }}
            >
                <FaArrowLeft />
            </StyledPageButton>
            {value > 2 && (
                <>
                    <StyledPageButton
                        second={second}
                        selected={toBoolStr(value == 0)}
                        onClick={() => {
                            setValue(0)
                        }}
                    >
                        1
                    </StyledPageButton>
                    {value > 3 && <BsThreeDots />}
                </>
            )}
            {range(1, pages).map((page) => {
                if (Math.abs(value - page) >= 3) return ''
                return (
                    <StyledPageButton
                        second={second}
                        selected={toBoolStr(value == page)}
                        key={page}
                        onClick={() => {
                            setValue(page)
                        }}
                    >
                        {page + 1}
                    </StyledPageButton>
                )
            })}

            {value < pages - 3 && (
                <>
                    {value < pages - 4 && <BsThreeDots />}
                    <StyledPageButton
                        second={second}
                        selected={toBoolStr(value == pages - 1)}
                        onClick={() => {
                            setValue(pages - 1)
                        }}
                    >
                        {pages}
                    </StyledPageButton>
                </>
            )}
            <StyledPageButton
                second={second}
                onClick={() => {
                    setValue((prev) => (prev < pages - 1 ? prev - 1 : prev))
                }}
            >
                <FaArrowRight />
            </StyledPageButton>
        </StyledWrapper>
    )
}
