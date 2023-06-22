import React from 'react'
import { GlobalStyle } from './theme/globalStyle'
import { Router } from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'
import { MessageGroup } from './molecules/MessageGroup'
import { MessageContext } from './utils/messages'
import { RootTemplate } from './templates/RootTemplate'
import { ConfirmContainer } from './molecules/ConfirmContainer'
import { ConfirmContext } from './utils/hooks'

const StyledWrapper = styled.div`
    min-height: 100vh;
`

export const App = () => {
    const [messages, setMessages] = React.useState([])
    const [confirm, setConfirm] = React.useState(null)

    return (
        <ThemeProvider theme={theme}>
            <MessageContext.Provider value={[messages, setMessages]}>
                <ConfirmContext.Provider value={[confirm, setConfirm]}>
                    <StyledWrapper>
                        <GlobalStyle />
                        <MessageGroup />
                        <ConfirmContainer />
                        <BrowserRouter>
                            <RootTemplate>
                                <Router />
                            </RootTemplate>
                        </BrowserRouter>
                    </StyledWrapper>
                </ConfirmContext.Provider>
            </MessageContext.Provider>
        </ThemeProvider>
    )
}
