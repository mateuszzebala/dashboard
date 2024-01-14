import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useTheme } from '../utils/hooks'

export const Theme = ({ value, children }) => {
    const [theme] = useTheme()
    const newTheme = { ...theme, ...value }

    return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
}
