import React from 'react'
import { GlobalStyle } from './theme/globalStyle'
import { Router } from './router/Router'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'

const StyledWrapper = styled.div`
    min-height: 100vh;
`

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <StyledWrapper>
                <GlobalStyle />
                <Router />
            </StyledWrapper>
        </ThemeProvider>
    )
}
