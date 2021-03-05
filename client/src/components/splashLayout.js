// Frameworks
import React from 'react';
import { ThemeProvider } from 'styled-components'
import { theme, Box } from 'rimble-ui'
import { navigate, useStaticQuery, graphql } from 'gatsby';

// Layout Components
import Header from './header';
import './layout.css';
import bg from '../assets/a289d59e1e6afaf935e7d7c1fb652501.gif.mp4';
import VideoBg from "reactjs-videobg";



const customTheme = {

};

// Layout Wrapper
const SplashLayout = ({children}) => {

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
