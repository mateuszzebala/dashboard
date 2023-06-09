import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: inline-flex;
    gap: ${({ size }) => size * 5 + 'px'};
    align-items: center;
    justify-content: center;
    font-size: ${({ size }) => size * 20 + 'px'};
    background-color: ${({ theme }) => theme.counter.background};
    color: ${({ theme }) => theme.counter.font};
    border-radius: ${({ size }) => size * 20 + 'px'};
`
const StyledInput = styled.input`
    border: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.counter.font};
    padding: 0;
    font-size: ${({ scaleSize }) => scaleSize * 17 + 'px'};
    text-align: center;
    &:focus {
        outline: none;
    }
`

const StyledButton = styled.button`
    display: flex;
    flex-direction: column;
    font-size: ${({ size }) => size * 15 + 'px'};
    align-items: center;
    border-radius: ${({ size }) => size * 20 + 'px'};
    color: ${({ theme }) => theme.counter.font};
    cursor: pointer;
    height: ${({ size }) => size * 35 + 'px'};
    background-color: ${({ theme }) => theme.counter.background};
    border: 0;
    width: ${({ size }) => size * 35 + 'px'};
    justify-content: center;
    outline: 0 solid ${({ theme }) => theme.counter.background}88;
    transition: 0.1s;
    &:hover,
    &:focus {
        outline-width: ${({ size }) => size * 3 + 'px'};
    }
`

export const Counter = ({
    value,
    setValue,
    unit = '',
    size = 1,
    min = 0,
    max = 100,
}) => {
    return (
        <StyledWrapper size={size}>
            <StyledButton
                onClick={() => {
                    setValue((prev) => (prev - 1 >= min ? prev - 1 : prev))
                }}
                size={size}
            >
                <FaMinus />
            </StyledButton>
            <span>
                <StyledInput
                    value={value}
                    scaleSize={size}
                    size={2}
                    onChange={(e) => {
                        setValue(e.target.value ? parseInt(e.target.value) : 0)
                    }}
                />{' '}
                {unit}
            </span>

            <StyledButton
                size={size}
                onClick={() => {
                    setValue((prev) => (prev + 1 <= max ? prev + 1 : prev))
                }}
            >
                <FaPlus />
            </StyledButton>
        </StyledWrapper>
    )
}
