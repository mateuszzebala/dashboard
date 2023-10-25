import React from 'react'
import { Select } from '../Select'
import { Button } from '../Button'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

export const Actions = ({todo, actions, action, setAction}) => {

    return (
        <StyledWrapper>
            <Select
                value={action}
                setValue={setAction}
                data={
                    actions &&
                    actions.map((action) =>
                        action.toUpperCase()
                    )
                }
                emptyName='ACTIONS'
            />
            <Button second onClick={todo}>MAKE</Button>
        </StyledWrapper>
    )
}