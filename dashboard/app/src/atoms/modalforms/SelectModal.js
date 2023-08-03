import React from 'react'
import styled from 'styled-components'

const StyledOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    font-size: 18px;
    white-space: nowrap;
    cursor: pointer;
    padding: 10px 10px;
    text-align: center;
    transition: background-color 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.primary}22;
    }
`

const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow: scroll;
    width: calc(100% + 6px);
    background-color: ${({ theme }) => theme.secondary};
    &::-webkit-scrollbar {
        height: 0;
    }
`

const OptionComponent = ({ text, value, onClick }) => {
    const handleOptionClick = () => {
        onClick(value)
    }

    return (
        <StyledOption onClick={handleOptionClick}>
            <span>{text}</span>
        </StyledOption>
    )
}

export const SelectModal = ({ data, todo, setOpen }) => {
    return (
        <StyledDropdown>
            <OptionComponent
                text={'-'}
                onClick={() => {
                    todo(null)
                    setOpen(false)
                }}
            />
            {Object.keys(data).map((name) => (
                <OptionComponent
                    key={name}
                    data={data}
                    text={data[name]}
                    value={name}
                    onClick={(val) => {
                        todo(data[val])
                        setOpen(false)
                    }}
                />
            ))}
        </StyledDropdown>
    )
}
