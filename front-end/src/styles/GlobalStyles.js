import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    height: auto;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.base.fontFamily};
    width: 100%;
    min-height: 100%;
  }

  h1, h2 {
    font-family: ${({ theme }) => theme.typography.title.fontFamily};
  }
`;

export default GlobalStyles;
