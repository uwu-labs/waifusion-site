// Frameworks
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "../components/ui";

import OverviewGreenBar from "../images/overview_green_bar.png";

// Login Route
function Login() {
  const navigate = useNavigate();

  return (
    <Box className="waifu-card-box">
      <div className="box-upper">
        <img loading="lazy" decoding="async"
          src={OverviewGreenBar}
          alt="green nav bar"
          className="waifu-card-box-greenbar"
        />
        <Box
          className="waifu-card-box-sub"
          color="white"
          style={{ maxWidth: 1424, marginBottom: 1 }}
        >
          <center className="waifu-card-box-center">
            <span className="wallet-box-header">Demo mode</span>
            <br />
            <div className="waifu-card-text waifu-wallet-text">
              Wallet connection is disabled. Continue with sample data.
            </div>
            <br />
            <Box className="wallet-connect">
              <Button.Outline
                className="waifu-card-buttons "
                onClick={() => navigate("/")}
              >
                <span className="waifu-button-learnmore">Continue</span>
              </Button.Outline>
            </Box>
          </center>
        </Box>
      </div>
    </Box>
  );
}

export default Login;
