/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import BN from "bn.js";
import { PageContentWrapper } from "../components/CommonLayout";
import { ContractHelper } from "../services/contract";
import { selectGlobalsData } from "../state/reducers/globals";
import { selectAddress } from "../state/reducers/user";

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
  width: 100%;
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  padding: 0.7rem 1rem;
`;

const FarmPage: React.FC = () => {
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

  const unstake = async () => {
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
    <PageContentWrapper>
      <Background>
        <Content>meow</Content>
      </Background>
    </PageContentWrapper>
  );
};

export default FarmPage;
