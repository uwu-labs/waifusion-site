import React, { useEffect, useState } from "react";
import { Text } from "rimble-ui";
import { keyframes } from "styled-components";

import Window from "../assets/Window.svg";
import Logo from "../assets/Logo.svg";

import SplashLayout from "../components/splashLayout";
import SEO from "../components/seo";

import "../components/layout.css";
import bg from "../assets/a289d59e1e6afaf935e7d7c1fb652501.gif.mp4";

const LogoText = keyframes`
    blink{
        50%{opacity: 0;}
    }
`;

const SplashPage = () => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {
    console.log("Setting Interval");
    async function showWindow() {
      console.log("Setting Interval 2 ");
      setInterval(() => {
        setShowWindow(true);
      }, 2000);
    }
    showWindow();
  }, []);

  return (
    <SplashLayout>
      <SEO title="Splash" />

      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: "100%",
          width: "100%",
          zIndex: "-1",
          objectFit: "fill",
          objectPosition: "center",
        }}
        src={bg}
      >
        <source src={bg} type="video/mp4" />
        Your device does not support playing 'video/mp4' videos
      </video>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: "100%",
          width: "100%",
          zIndex: "-1",
          objectFit: "fill",
          objectPosition: "center",
        }}
      >
        {showWindow && (
          <div
            style={{
              width: 1010,
              height: 450,
              alignItems: "center",
              position: "relative",
              left: "50%",
              top: "50%",
              WebkitTransform: "translate(-50%, -50%)",
              transform: " translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                position: "absolute",
              }}
            >
              <Window />
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                WebkitTransform: "translate(-50%, -50%)",
                transform: " translate(-50%, -50%)",
              }}
            >
              <Logo />
              <Text
                classname="blink"
                style={{
                  color: "#FC74C6",
                  fontFamily: "VT323",
                  fontSize: "72px",
                  textAlign: "center",
                  animation: `${LogoText} 1.2s ease-in-out infinite`,
                }}
              >
                <span className="blink">COMING SOON</span>
              </Text>
            </div>
            <Text
              style={{
                color: "#FADF39",
                fontFamily: "VT323",
                fontSize: "36px",
                textAlign: "left",
                position: "absolute",
                left: "90%",
                top: "90%",
                WebkitTransform: "translate(-90%, -90%)",
                transform: " translate(-90%, -90%)",
              }}
            >
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                Discord
              </a>
            </Text>
          </div>
        )}
      </div>
    </SplashLayout>
  );
};

export default SplashPage;

/*
1 - please just background screen for 2 seconds ,
2 - div window appears in after 2 seconds the page has loaded 
3 - fade in animation for waifusion logo with 1500-2000ms 
4 - coming soon and discord appears with instant (no fade) but please can we have coming soon to repletely  blink just like INSERT COIN in old school games?
*/
