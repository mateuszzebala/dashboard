import React from 'react'
import styled from 'styled-components'
import { range, toBoolStr } from '../utils/utils'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
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
        second ? theme.quaternary : theme.primary};
    color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
    outline-color: ${({ theme, second }) =>
        second ? theme.quaternary : theme.primary}88;
    outline-style: solid;
    outline-width: 0;
    border: 0;
    border-radius: 10%;
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

export const Paginator = ({ value, setValue, pages, second, minimum }) => {


    return (
        <StyledWrapper>
            <StyledPageButton
                second={second}
                onClick={() => {
                    setValue((prev) => (prev > 0 ? prev - 1 : prev))
                }}
            >
                <IoIosArrowBack />
            </StyledPageButton>
            {value > 2 && !minimum && (
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
            {minimum && <StyledPageButton second={second}>{value + 1}</StyledPageButton>}
            {!minimum && range(1, pages).map((page) => {
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

            {value < pages - 3 && !minimum && (
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
                    setValue((prev) => (prev < pages - 1 ? prev + 1 : prev))
                }}
            >
                <IoIosArrowForward />
            </StyledPageButton>
        </StyledWrapper>
    )
}
