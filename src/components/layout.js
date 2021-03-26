// Frameworks
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme, Box, Text, Flex } from "rimble-ui";
import { useStaticQuery, graphql } from "gatsby";

// Layout Components
import Header from "./header";
import "./layout.css";

const customTheme = {};

const FooterItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

// Layout Wrapper
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);

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
            <Header
              menuLinks={data.site.siteMetadata.menuLinks}
              siteTitle={data.site.siteMetadata.title}
            />
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
                            href="https://twitter.com/waifusion"
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
                            href="https://discord.com/invite/q5hRZR72wm"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Discord
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
                            href="https://t.me/Waifusion"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Telegram
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
                            href="mailto: waifusiongovernance@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Contact
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
