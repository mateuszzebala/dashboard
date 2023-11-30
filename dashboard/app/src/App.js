import React from 'react'
import { GlobalStyle } from './theme/globalStyle'
import { Router } from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { MessageGroup } from './molecules/MessageGroup'
import { MessageContext } from './utils/messages'
import { RootTemplate } from './templates/RootTemplate'
import {
    GlobalStateContext,
    LoadingContext,
    ModalFormContext,
    ThemeContext,
    UserContext,
} from './utils/hooks'
import { theme } from './theme/theme'
import { ModalForm } from './atoms/ModalForm'
import { useCookies } from 'react-cookie'
import { LoadingWindow } from './atoms/LoadingWindow'

const StyledWrapper = styled.div`
    min-height: 100vh;
`

export const App = () => {
    const [customTheme, setCustomTheme] = React.useState(theme)
    const [messages, setMessages] = React.useState([])
    const [modalForm, setModalForm] = React.useState([])
    const [loading, setLoading] = React.useState({})
    const [user, setUser] = React.useState(null)
    const [globalState, setGlobalState] = React.useState({})
    const [cookies] = useCookies()

    React.useEffect(() => {
        if (cookies.theme) {
            setCustomTheme(cookies.theme)
        }
    }, [])

    return (
        <ThemeContext.Provider value={[customTheme, setCustomTheme]}>
            <ThemeProvider theme={customTheme}>
                <BrowserRouter>
                    <UserContext.Provider value={[user, setUser]}>
                        <GlobalStateContext.Provider
                            value={[globalState, setGlobalState]}
                        >
                            <LoadingContext.Provider
                                value={[loading, setLoading]}
                            >
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
                                            <LoadingWindow />
                                            <RootTemplate>
                                                <Router />
                                            </RootTemplate>
                                        </StyledWrapper>
                                    </MessageContext.Provider>
                                </ModalFormContext.Provider>
                            </LoadingContext.Provider>
                        </GlobalStateContext.Provider>
                    </UserContext.Provider>
                </BrowserRouter>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
