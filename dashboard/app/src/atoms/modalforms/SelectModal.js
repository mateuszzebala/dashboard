import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'

const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow: scroll;
    align-items: stretch;
    width: 200px;
    padding: 5px;
    gap: 5px;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

export const SelectModal = ({ data, todo, setOpen, value }) => {
    return (
        <StyledDropdown>
            <Button
                width={'100%'}
                second={value !== null}
                onClick={() => {
                    todo(null)
                    setOpen(false)
                }}
            >
                -
            </Button>
            {Object.keys(data).map((name) => (
                <Button
                    width={'100%'}
                    key={name}
                    second={value !== name}
                    onClick={() => {
                        todo(name)
                        setOpen(false)
                    }}
                >
                    {data[name]}
                </Button>
            ))}
        </StyledDropdown>
    )
}
