import React from 'react'
import { GlobalStyle } from './theme/globalStyle'
import { Router } from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { MessageGroup } from './molecules/MessageGroup'
import { MessageContext } from './utils/messages'
import { RootTemplate } from './templates/RootTemplate'
import { ModalFormContext, ThemeContext } from './utils/hooks'
import { theme } from './theme/theme'
import { ModalForm } from './atoms/ModalForm'

const StyledWrapper = styled.div`
    min-height: 100vh;
`

export const App = () => {
    const [customTheme, setCustomTheme] = React.useState(theme)
    const [messages, setMessages] = React.useState([])
    const [modalForm, setModalForm] = React.useState({})

    return (
        <ThemeContext.Provider value={[customTheme, setCustomTheme]}>
            <ThemeProvider theme={customTheme}>
                <BrowserRouter>
                    <ModalFormContext.Provider
                        value={[modalForm, setModalForm]}
                    >
                        <MessageContext.Provider
                            value={[messages, setMessages]}
                        >
                            <StyledWrapper>
                                <GlobalStyle />
                                <MessageGroup />
                                <ModalForm />

                                <RootTemplate>
                                    <Router />
                                </RootTemplate>
                            </StyledWrapper>
                        </MessageContext.Provider>
                    </ModalFormContext.Provider>
                </BrowserRouter>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
