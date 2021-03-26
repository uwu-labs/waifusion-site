import { navigate } from "gatsby";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Button, Box } from "rimble-ui";
import Web3 from "web3";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../app/stores/root.store";

import ethLogo from "../images/Eth_logo.png";
import bscLogo from "../images/Bsc_logo.png";
import NavPinkBar from "../images/nav_pink_bar.png";
import "./header.css";

import { getTransactionReceipt } from "../app/utils/contracthelper";
import styled from "styled-components";
import { GLOBALS } from "../app/utils/globals";

const Container = styled.header`
  margin: 1.45rem 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  margin-bottom: 1.45rem;
`;

const ButtonsWrapper = styled.div``;

const Header = observer(({ siteTitle, menuLinks }) => {
  const rootStore = useContext(RootStoreContext);
  const { walletStore, transactionStore } = rootStore;

  const [timer, setTimer] = useState();

  const windowWeb3 = useMemo(() => {
    if (typeof window != "undefined") {
      return new Web3(window.ethereum);
    }
    return false;
  }, []);

  const checkWalletAndPendingTransactions = async () => {
    if (windowWeb3) {
      const accounts = await windowWeb3.eth.getAccounts();
      walletStore.defaultAddress = accounts[0];
      const isLocked = !accounts || 0 === accounts.length;
      if (!walletStore.isWalletConnected && !isLocked) {
        walletStore.isWalletConnected = true;
        walletStore.web3 = new Web3(window.ethereum);
      }

      for (const txDetails of transactionStore.pendingTransactions) {
        const receipt = await getTransactionReceipt(
          windowWeb3,
          txDetails.txHash
        );

        if (receipt) {
          transactionStore.addCompletedTransaction({
            txDetails,
            status: receipt.status,
          });
        }
      }
    } else {
    }
  };

  useEffect(() => {
    async function checkPendingTransactions() {
      await checkWalletAndPendingTransactions();
    }

    if (window.ethereum) {
      checkPendingTransactions();
      setTimer(setInterval(checkWalletAndPendingTransactions, 1000));
    }
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box className="waifu-card-box" maxWidth={1435}>
        <div style={{ marginLeft: 4, marginTop: 4 }}>
          <img
            src={NavPinkBar}
            alt="pink nav bar"
            style={{ marginBottom: -4 }}
          />
          <Box
            className="nav-waifu-card-box-sub"
            color="white"
            style={{ maxWidth: 1424, marginBottom: 1 }}
          >
            <Content>
              {GLOBALS.WAIFU_VERSION === "bsc" ? (
                <Logo alt="BCS Waifu Logo" src={bscLogo} />
              ) : (
                <Logo alt="ETH Waifu Logo" src={ethLogo} />
              )}
              <ButtonsWrapper>
                {menuLinks.map((link) => (
                  <Button.Outline
                    key={link.name}
                    className="nav-menu-buttons"
                    onClick={() => {
                      navigate(link.link);
                    }}
                    href={link.link}
                    title={link.name}
                  >
                    {link.name}
                  </Button.Outline>
                ))}
              </ButtonsWrapper>
            </Content>
          </Box>
        </div>
      </Box>
    </Container>
  );
});

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
