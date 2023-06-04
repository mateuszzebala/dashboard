import React from 'react'
import { theme } from '../theme/theme'
import { ThemeProvider } from 'styled-components'

export const Theme = ({ value, children }) => {
    const newTheme = { ...theme, ...value }

    return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
}
