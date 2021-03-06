import { createGlobalStyle, css } from "styled-components/macro"

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: ${theme.colors.whiteBackground};
      color: ${theme.colors.black};
    }

    body,
    input,
    button,
    textarea {
      font: 400 16px "Roboto", sans-serif;
    }

    html,
    body,
    #root {
      height: 100vh;
    }
  `}
`
