// Frameworks
import React, { useContext, useEffect, useState } from "react";
import { Button, Box } from "rimble-ui";
import { navigate } from "gatsby";

// Data Store
import { RootStoreContext } from "./stores/root.store";

import OverviewGreenBar from "../images/overview_green_bar.png";

// Login Route
function Login() {
  const rootStore = useContext(RootStoreContext);
  const { walletStore } = rootStore;
  const [winWthEnabled, setwinWthEnabled] = useState(false);

  useEffect(() => {
    async function checkWalletStatus() {
      await checkWallet();
    }

    checkWalletStatus();
    if (window.ethereum) {
      setwinWthEnabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkWallet = async () => {
    if (walletStore.isWalletConnected) {
      console.log("checkWallet redirect");
      navigate(`/`);
    }
  };

  const _walletConnect = () => async () => {
    try {
      window.ethereum.enable();
    } catch (err) {
      console.error(err);
    }
  };

  //If window.ethereum is true, then show buttons. If not, show bad bad
  return (
    <>
      {winWthEnabled && (
        <Box className="waifu-card-box">
          <div className="box-upper">
            <img
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
                <span className="wallet-box-header">Connect your Wallet</span>
                <br />
                <Box className="wallet-connect">
                  <Button.Outline
                    className="waifu-card-buttons "
                    onClick={_walletConnect()}
                  >
                    <span className="waifu-button-learnmore">Connect</span>
                  </Button.Outline>
                </Box>
              </center>
            </Box>
          </div>
        </Box>
      )}
      {!winWthEnabled && (
        <Box className="waifu-card-box">
          <div className="box-upper">
            <img
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
                <span className="wallet-box-header">
                  No Ethereum Wallet Detected
                </span>
                <br />
                <Box className="wallet-connect">
                  <a
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button.Outline className="waifu-card-buttons ">
                      <span className="waifu-button-learnmore">
                        Get Metamask
                      </span>
                    </Button.Outline>
                  </a>
                </Box>
              </center>
            </Box>
          </div>
        </Box>
      )}
    </>
  );
}

export default Login;
