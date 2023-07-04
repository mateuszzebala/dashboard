import React from 'react'
import { Button } from './Button'
import styled from 'styled-components'
import { HiXMark, HiCheck } from 'react-icons/hi2'

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
                icon={<HiXMark />}
                size={2}
            />
            <Button
                onClick={() => {
                    setOpen(false)
                    todo()
                }}
                icon={<HiCheck />}
                size={2}
            />
        </StyledWrapper>
    )
}
