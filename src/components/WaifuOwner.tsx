/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styled from "styled-components";
import { WaifuOwnerType } from "../types/waifusion";

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const WaifuOwnerInfo = styled(PrimaryInfo)`
  text-align: right;

  h3 {
    font-weight: 500;
    margin: 0;
  }

  label {
    color: #9c9b9c;
    font-weight: 500;
  }
`;

const WaifuOwnerIconWrapper = styled.div`
  margin-left: 1rem;
  border: 2px dotted #817d82;
  border-radius: 50%;
  width: 45px;
  height: 45px;
`;

const WaifuOwnerIcon = styled.img`
  border: 2px solid var(--background-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const WaifuOwnerContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type Props = {
  owner: WaifuOwnerType;
};

const WaifuOwner: React.FC<Props> = ({ owner }) => {
  return (
    <WaifuOwnerContainer>
      <WaifuOwnerInfo>
        <h3>{owner.name}</h3>
        <label>Owner</label>
      </WaifuOwnerInfo>
      {owner.icon && (
        <WaifuOwnerIconWrapper>
          <WaifuOwnerIcon src={owner.icon} />
        </WaifuOwnerIconWrapper>
      )}
    </WaifuOwnerContainer>
  );
};

export default WaifuOwner;
