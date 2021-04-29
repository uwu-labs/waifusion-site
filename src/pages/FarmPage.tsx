/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import BN from "bn.js";
import { useTranslation } from "react-i18next";

import { PageContentWrapper } from "../components/CommonLayout";
import { ContractHelper } from "../services/contract";
import { selectGlobalsData } from "../state/reducers/globals";
import { selectAddress } from "../state/reducers/user";
import Header from "../components/Header";
import Button from "../components/Button";

const StyledFarmPage = styled(PageContentWrapper)`
  height: 70vh;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const PageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 150% 50%;
    }
`;

type BackgroundProps = {
  rainbow?: boolean;
};

const Background = styled.div`
  margin-top: 1.3rem;
  width: 35rem;
  padding: 2px 2px 6px 2px;
  border-radius: 1.1rem;
  transform: translateY(-0.5rem);
  filter: saturate(1.5);
  background: linear-gradient(
      45deg,
      var(--primary) 0%,
      var(--secondary) 25%,
      var(--highlight) 50%,
      var(--secondary) 75%,
      var(--primary) 100%
    )
    0% 0% / 300% 300%;
  animation: ${rotate} 3s linear 0s infinite;
  background: ${(props: BackgroundProps) =>
    props.rainbow ? "auto" : "var(--plain-shadow)"};
  margin: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
`;

const Horizontal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Vertical = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Rewards = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const SubHeader = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const FarmPage: React.FC = () => {
  const [t] = useTranslation();

  const globals = useSelector(selectGlobalsData);
  const address = useSelector(selectAddress);

  const [loadingStake, setLoadingStake] = useState(false);
  const [loadingUnstake, setLoadingUnstake] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(false);
  const [unstakeAmount, setUnstakeAmount] = useState(false);
  const [wetApproved, setWetApproved] = useState(false);
  const [stakingBalance, setStakingBalance] = useState("0");
  const [wetBalance, setWetBalance] = useState("0");
  const [rewardBalance, setRewardBalance] = useState("0");

  const init = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();

    const farmContract = await contractHelper.getFarmContract();
    const wetContract = await contractHelper.getWetContract();

    setWetApproved(await contractHelper.isWetApprovedForFarm());
    setStakingBalance(await farmContract.methods.balanceOf(address).call());
    setWetBalance(await wetContract.methods.balanceOf(address).call());
    setRewardBalance(await farmContract.methods.earned(address).call());
  };

  useEffect(() => {
    init();
  }, []);

  const approve = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wetContract = await contractHelper.getWetContract();

    wetContract.methods
      .approve(globals.farmAddress, new BN("9999999999999999999999999999"))
      .send()
      .on("transactionHash", (hash: any) => {
        setLoadingStake(true);
      })
      .on("receipt", (receipt: any) => {
        init().then(() => setLoadingStake(false));
      })
      .on("error", (err: any) => {
        setLoadingStake(true);
      });
  };

  const stake = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const farmContract = await contractHelper.getFarmContract();

    farmContract.methods
      .stake(stakeAmount)
      .send({ from: address })
      .on("transactionHash", (hash: any) => {
        setLoadingStake(true);
      })
      .on("receipt", (receipt: any) => {
        setLoadingStake(false);
      })
      .on("error", (err: any) => {
        setLoadingStake(true);
      });
  };

  const claim = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const farmContract = await contractHelper.getFarmContract();

    farmContract.methods
      .getReward()
      .send({ from: address })
      .on("receipt", (receipt: any) => {
        init();
      });
  };

  const unstake = async () => {
    if (rewardBalance === "0") return;

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const farmContract = await contractHelper.getFarmContract();

    farmContract.methods
      .exit()
      .send({ from: address })
      .on("transactionHash", (hash: any) => {
        setLoadingUnstake(true);
      })
      .on("receipt", (receipt: any) => {
        setLoadingUnstake(false);
      })
      .on("error", (err: any) => {
        setLoadingUnstake(true);
      });
  };

  return (
    <StyledFarmPage>
      <Header text={t("headers.farm")} />
      <PageContent>
        <Background rainbow={Number(stakingBalance) > 0}>
          <Content>
            <Horizontal>
              <Vertical>
                <Rewards>{rewardBalance}</Rewards>
                <SubHeader>WET Earned</SubHeader>
              </Vertical>
              <Button
                primary
                small
                disabled={rewardBalance === "0"}
                onClick={() => claim()}
              >
                Claim WET
              </Button>
            </Horizontal>
          </Content>
        </Background>
      </PageContent>
    </StyledFarmPage>
  );
};

export default FarmPage;
