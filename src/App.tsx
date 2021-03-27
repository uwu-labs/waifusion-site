import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import WaifuDetail from "./pages/WaifuDetail";
import Footer from "./components/Footer";
import { defaultTheme } from "./services/themes";

const Wrapper = styled.div`
  color: #29252a;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;

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

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Navbar />

        <ContentWrapper>
          <Switch>
            <Route exact path="/waifu/:id" component={WaifuDetail} />
          </Switch>
        </ContentWrapper>

        <Footer />
      </Router>
    </Wrapper>
  );
}

export default App;
