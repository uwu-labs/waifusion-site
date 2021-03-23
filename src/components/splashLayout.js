// Frameworks
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "rimble-ui";

// Layout Components
import "./layout.css";

const customTheme = {};

// Layout Wrapper
const SplashLayout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={Object.assign({}, theme, customTheme)}>
        <div
          style={{
            margin: `0 auto`,
            wi: 960,
            padding: `0 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
        </div>
      </ThemeProvider>
    </>
  );
};

export default SplashLayout;
