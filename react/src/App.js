import React from 'react'
import { GlobalStyle } from './theme/globalStyle'
import { Router } from './router/Router'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    min-height: 100vh;
`

export const App = () => {
    return (
        <StyledWrapper>
            <GlobalStyle />
            <Router />
        </StyledWrapper>
    )
}
