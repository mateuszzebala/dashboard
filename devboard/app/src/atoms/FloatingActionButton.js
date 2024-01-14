import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { isMobile } from 'react-device-detect'

const StyledWrapper = styled.span`
    display: inline-block;
    position: fixed;
    bottom: ${({ bottom }) => bottom + 'px'};
    right: ${({ right }) => right + 'px'};
`

export const FloatingActionButton = ({ bottom = isMobile ? 100 : 20, right = 20, ...props }) => {
    return (
        <StyledWrapper bottom={bottom} right={right}>
            <Button {...props} />
        </StyledWrapper>
    )
}
