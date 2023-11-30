import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'

const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow: scroll;
    align-items: stretch;
    padding: 5px;
    gap: 5px;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

export const SelectModal = ({ data, todo, setOpen, value, canBeNull }) => {
  
    return (
        <StyledDropdown>
            {canBeNull && 
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
            }
            {Object.keys(data).map((id) => (
                <Button
                    width={'100%'}
                    key={id}
                    second={value != id}
                    onClick={() => {
                        todo(id)
                        setOpen(false)
                    }}
                >
                    {data[id]}
                </Button>
            ))}
        </StyledDropdown>
    )
}
