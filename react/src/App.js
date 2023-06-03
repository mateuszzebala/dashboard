import React from 'react'
import { GlobalStyle } from './theme/globalStyle'
import { Router } from './router/Router'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'
import { MessageGroup } from './molecules/MessageGroup'
import { MessageContext } from './utils/messages'

const StyledWrapper = styled.div`
    min-height: 100vh;
`

export const App = () => {
    const [messages, setMessages] = React.useState([])

    return (
        <ThemeProvider theme={theme}>
            <MessageContext.Provider value={[messages, setMessages]}>
                <StyledWrapper>
                    <GlobalStyle />
                    <MessageGroup />
                    <Router />
                </StyledWrapper>
            </MessageContext.Provider>
        </ThemeProvider>
    )
}
