import { createGlobalStyle } from "styled-components";
import { defaultTheme } from "./services/themes";

const theme = defaultTheme;

const GlobalStyle = createGlobalStyle`
  :root {
    --text-primary: ${theme.textPrimary};
    --background-primary: ${theme.backgroundPrimary};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    font-family: 'Calibre', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

export default GlobalStyle;
