import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const StyledWrapper = styled.span`
    display: inline-block;
    position: fixed;
    bottom: 20px;
    right: 20px;
`

export const FloatingActionButton = ({ ...props }) => {
    return (
        <StyledWrapper>
            <Button {...props} />
        </StyledWrapper>
    )
}
