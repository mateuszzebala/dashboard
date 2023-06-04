import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.span`
    * {
        margin: 0;
    }
`

export const Typography = ({ variant, children }) => {
    const Variant = variant || 'span'
    return (
        <StyledWrapper>
            <Variant>{children}</Variant>
        </StyledWrapper>
    )
}
