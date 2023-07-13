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
