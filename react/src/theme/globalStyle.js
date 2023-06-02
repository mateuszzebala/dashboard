import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    --font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    --dark: #181915;
  }
  body {
    font-family: var(--font-family);
    margin: 0;
    padding: 0;
    background: #eeeeee;
    color: var(--dark);
  }
  button, input, textarea, select, option, span{
    font-family: var(--font-family);
  }
`
