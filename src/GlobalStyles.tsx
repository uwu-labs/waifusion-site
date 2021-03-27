import { createGlobalStyle } from "styled-components";
import { defaultTheme } from "./services/themes";

const theme = defaultTheme;

const GlobalStyle = createGlobalStyle`
  :root {
    --text-primary: ${theme.textPrimary};
    --text-secondary: ${theme.textSecondary};
    --background-primary: ${theme.backgroundPrimary};
    --primary: ${theme.primary};
    --secondary: ${theme.secondary};
    --highlight: ${theme.highlight};
    --danger: ${theme.danger};
    --danger-shadow: ${theme.dangerShadow};
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

  a {
    color: var(--text-primary);
  }
`;

export default GlobalStyle;
