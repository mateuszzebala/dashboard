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
    color: var(--dark);
  }
  button, input, textarea, select, option, span{
    font-family: var(--font-family);
  }
  ::-webkit-scrollbar {
    width: ${({ theme }) => theme.scrollbar.width};
    height: ${({ theme }) => theme.scrollbar.width};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbar.track};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar.thumb};
  }
`
