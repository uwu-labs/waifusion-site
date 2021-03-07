import { navigate } from "gatsby";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Flex, Button, Box } from "rimble-ui";
import Web3 from "web3";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../app/stores/root.store";

// import Logo from '../assets/Logo.svg'
import Logo from "../images/Eth_Logo.png";
import NavPinkBar from "../images/nav_pink_bar.png";
import "./header.css";

import { getTransactionReceipt } from "../app/utils/contracthelper";

const Header = observer(({ siteTitle, menuLinks }) => {
  const rootStore = useContext(RootStoreContext);
  const { walletStore, transactionStore } = rootStore;

  const [timer, setTimer] = useState();

  const windowWeb3 = useMemo(() => {
    if (window != "undefined") {
      return new Web3(window.ethereum)
    }
  }, [])

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
    <header
      style={{
        marginBottom: `1.45rem`,
        marginTop: `1.45rem`,
      }}
    >
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
            <Flex className="nav-flex-box">
              <img className="menu-logo" alt="pink nav bar" src={Logo} />
              <div className="nav-bar-button-container">
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
              </div>
            </Flex>
          </Box>
        </div>
      </Box>
    </header>
  );
});

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
/*
<nav>
                        <ul style={{ display: "flex", flex: 1 }}>
                        {menuLinks.map(link => (
                            <li
                            key={link.name}
                            style={{
                                listStyleType: `none`,
                                padding: `1rem`,
                            }}
                            >
                            <Link style={{ color: `white` }} to={link.link}>
                                {link.name}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </nav>


*/
