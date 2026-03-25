// Frameworks
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme, Box, Text, Flex } from "./ui";

// Layout Components
import Header from "./header";
import "./layout.css";
import * as siteConfig from "../siteConfig";

const customTheme = {};

const FooterItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

// Layout Wrapper
const Layout = ({
  children,
  menuLinks = siteConfig.menuLinks,
  siteTitle = siteConfig.siteTitle,
}) => {
  return (
    <>
      <ThemeProvider theme={Object.assign({}, theme, customTheme)}>
        <div className="backgroundGif fullscreen">
          <div
            style={{
              margin: `0 auto`,
              width: "100%",
              height: "100%",
            }}
          >
            <Header menuLinks={menuLinks} siteTitle={siteTitle} />
            <main>{children}</main>
            <footer className="footer-bottom-sytle">
              <Box>
                <FooterItemsWrapper>
                  <Box className="footer-social-banner">
                    <Flex>
                      <Box className="footer-social-text-div">
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "VT323",
                            fontSize: "36px",
                          }}
                        >
                          <a
                            href="https://twitter.com/uwucrewnft"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Twitter
                          </a>
                        </Text>
                      </Box>
                      <Box className="footer-social-text-div">
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "VT323",
                            fontSize: "36px",
                          }}
                        >
                          <a
                            href="https://discord.gg/K4wgWP5m4t"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Discord
                          </a>
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </FooterItemsWrapper>
              </Box>
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
