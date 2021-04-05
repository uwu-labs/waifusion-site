import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Popup from "./Popup";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  show: boolean;
  close: () => void;
};

const BuyWaifu: React.FC<Props> = (props) => {
  return (
    <Popup
      show={props.show}
      close={() => props.close()}
      content={
        <Content>
          <Input />
        </Content>
      }
      header="Buy Waifu"
      body="Select the number of Waifus that you would like to buy"
    />
  );
};

export default BuyWaifu;
