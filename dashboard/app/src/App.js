import React from 'react'
import { GlobalStyle } from './theme/globalStyle'
import { Router } from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import { MessageGroup } from './molecules/MessageGroup'
import { MessageContext } from './utils/messages'
import { RootTemplate } from './templates/RootTemplate'
import { ConfirmContainer } from './molecules/ConfirmContainer'
import { ConfirmContext, PromptContext, ThemeContext } from './utils/hooks'
import { PromptContainer } from './molecules/PromptContainer'
import { theme } from './theme/theme'

const StyledWrapper = styled.div`
    min-height: 100vh;
`

export const App = () => {
    const [customTheme, setCustomTheme] = React.useState(theme)
    const [messages, setMessages] = React.useState([])
    const [confirm, setConfirm] = React.useState(null)
    const [prompt, setPrompt] = React.useState(null)

    return (
        <ThemeContext.Provider value={[customTheme, setCustomTheme]}>
            <ThemeProvider theme={customTheme}>
                <MessageContext.Provider value={[messages, setMessages]}>
                    <ConfirmContext.Provider value={[confirm, setConfirm]}>
                        <PromptContext.Provider value={[prompt, setPrompt]}>
                            <StyledWrapper>
                                <GlobalStyle />
                                <MessageGroup />
                                <ConfirmContainer />
                                <PromptContainer />
                                <BrowserRouter>
                                    <RootTemplate>
                                        <Router />
                                    </RootTemplate>
                                </BrowserRouter>
                            </StyledWrapper>
                        </PromptContext.Provider>
                    </ConfirmContext.Provider>
                </MessageContext.Provider>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
