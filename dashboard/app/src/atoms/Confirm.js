import React from 'react'
import { Button } from './Button'
import styled from 'styled-components'

import { BsCheck, BsX } from 'react-icons/bs'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`

export const Confirm = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledWrapper>
            <Button
                onClick={() => {
                    setOpen(false)
                }}
                icon={<BsX />}
                size={1.3}
            />
            <Button
                onClick={() => {
                    setOpen(false)
                    todo()
                }}
                icon={<BsCheck />}
                size={1.3}
            />
        </StyledWrapper>
    )
}
