/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

import { PageContentWrapper } from "../components/CommonLayout";
import { ContractHelper } from "../services/contract";
import { selectAddress } from "../state/reducers/user";
import Header from "../components/Header";
import Button from "../components/Button";
import StakeButton from "../components/StakeButton";

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
  width: 30rem;
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

type HorizonalProps = {
  spaceEvenly?: boolean;
};

const Horizontal = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props: HorizonalProps) =>
    props.spaceEvenly ? "space-evenly" : "space-between"};
  align-items: center;
  margin: 0.5rem 0;
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

type SubHeaderProps = {
  right?: boolean;
};

const SubHeader = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: ${(props: SubHeaderProps) => (props.right ? "right" : "left")};
`;

const FarmPage: React.FC = () => {
  const [t] = useTranslation();

  const address = useSelector(selectAddress);

  const [loadingUnstake, setLoadingUnstake] = useState(false);
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
                <SubHeader>{t("farm.wetEarned")}</SubHeader>
              </Vertical>
              <Button
                primary
                small
                disabled={rewardBalance === "0"}
                onClick={() => claim()}
              >
                {t("farm.claimWet")}
              </Button>
            </Horizontal>
            <Horizontal spaceEvenly>
              <StakeButton refresh={() => init()} approved={wetApproved} />
              <Button
                secondary
                disabled={stakingBalance === "0"}
                onClick={() => unstake()}
              >
                {loadingUnstake ? "Loading" : "Unstake LP"}
              </Button>
            </Horizontal>
            <Horizontal>
              <Vertical>
                <SubHeader>{t("farm.wetStaked")}</SubHeader>
                <SubHeader>{t("farm.apr")}</SubHeader>
              </Vertical>
              <Vertical>
                <SubHeader right>{stakingBalance}</SubHeader>
                <SubHeader right>{`${stakingBalance}%`}</SubHeader>
              </Vertical>
            </Horizontal>
          </Content>
        </Background>
      </PageContent>
    </StyledFarmPage>
  );
};

export default FarmPage;
