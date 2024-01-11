import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { Input } from '../inputs/Input'

const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 500px;
    overflow: scroll;
    align-items: stretch;
    padding: 5px;
    gap: 5px;
    width: 350px;

`

const StyledButton = styled.button`
    transition: color 0.1s, background-color 0.1s, outline-width 0.1s;
    background-color: ${({ theme, second }) => (second ? theme.secondary : theme.primary)};
    color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
    font-size: 20px;
    border-radius: 5px;
    max-width: 100%;
    overflow: hidden;
    min-height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-overflow: ellipsis;
    cursor: pointer;
    border: 0;
    outline: 0px solid ${({theme})=>theme.quaternary}88;
    &:hover,
    &:focus {
        outline-width: 3px;
        background-color: ${({ theme, second }) => (second ? theme.quaternary : theme.primary)};
    }
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    .search-input {
        width: 100%;
    }
`

export const SelectModal = ({ data, todo, setOpen, value, canBeNull }) => {
    const [search, setSearch] = React.useState('')
    return (
        <StyledWrapper>
            <Input className="search-input" value={search} setValue={setSearch} size={1.1} label="SEARCH..." />
            <StyledDropdown>
                {canBeNull && (
                    <StyledButton
                        second={value !== null}
                        onClick={() => {
                            todo(null)
                            setOpen(false)
                        }}
                    >
                        -
                    </StyledButton>
                )}
                {Object.keys(data)
                    .filter((id) => (search ? id.toString().toLowerCase().includes(search.toLowerCase()) || data[id].toString().toLowerCase().includes(search.toLowerCase()) : true))
                    .map((id) => (
                        <StyledButton
                            key={id}
                            second={value != id}
                            onClick={() => {
                                todo(id)
                                setOpen(false)
                            }}
                        >
                            {data[id]}
                        </StyledButton>
                    ))}
            </StyledDropdown>
        </StyledWrapper>
    )
}
