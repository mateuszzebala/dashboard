import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    --font-family: 'Rubik', sans-serif;
    box-sizing: border-box;
  }
  body {
    font-family: var(--font-family);
    margin: 0;
    padding: 0;
    color:#181915;
  }
  a{
    text-decoration: none;
  }
  button, input, textarea, select, option, span{
    font-family: var(--font-family);
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
  }

`
