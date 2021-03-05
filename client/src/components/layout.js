// Frameworks
import React from 'react';
import { ThemeProvider } from 'styled-components'
import { theme, Box, Text, Flex } from 'rimble-ui'
import { navigate, useStaticQuery, graphql } from 'gatsby';

// Layout Components
import Header from './header';
import './layout.css';
import Logo from '../images/Eth_Logo.png'

const customTheme = {

};

// Layout Wrapper
const Layout = ({children}) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                    menuLinks{
                        name
                        link
                    }
                }
            }
        }
    `);
//<img src={backgroundGif} alt="logo"/>



/*
the original styling
                    <div
                        style={{
                            margin: `0 auto`,
                            maxWidth: 960,
                            padding: `0 1.0875rem 1.45rem`,
                            paddingTop: 0,
                        }}


*/
    const _goHome = () => { navigate(`/`) };

    return (
        <>
            <ThemeProvider theme={Object.assign({}, theme, customTheme)}>
            <div className="backgroundGif fullscreen">
            
                    
                    <div
                        style={{
                            margin: `0 auto`,
                            width: '100%',
                            height: '100%'
                        }}
                    >
                    <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
                        <main>{children}</main>
                        <footer className="footer-bottom-sytle">
                            
                            <Box>
                            <Flex>
                                <Box>
                                    <img className="footer-logo" src={Logo}/>
                                </Box>
                                <Box className="footer-social-banner">
                                    <Flex>
                                        <Box className="footer-social-text-div">
                                            <Text style={{
                                                color:'white',
                                                fontFamily:'VT323',
                                                fontSize:'36px',
                                                textAlign: 'right',
                                            }}>
                                                <a href="https://twitter.com/waifusion" target="_blank">Twitter</a>
                                            </Text>
                                        </Box>
                                        <Box className="footer-social-text-div">
                                            <Text style={{
                                                color:'white',
                                                fontFamily:'VT323',
                                                fontSize:'36px',
                                                textAlign: 'right',
                                            }}>
                                                <a href="https://discord.com/invite/q5hRZR72wm" target="_blank">Discord</a>
                                            </Text>
                                        </Box>
                                        <Box className="footer-social-text-div">
                                            <Text style={{
                                                color:'white',
                                                fontFamily:'VT323',
                                                fontSize:'36px',
                                                textAlign: 'right',
                                            }}>
                                                <a href="mailto: waifusion@protonmail.com" target="_blank">Contact</a>
                                            </Text>
                                        </Box>
                                    </Flex>
                                 </Box>
                                
                                </Flex>
                            </Box>
                        </footer>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
};

export default Layout;
