import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import Popup from "./Popup";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Error = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: var(--danger);
`;

type Props = {
  show: boolean;
  close: () => void;
};

const BuyWaifu: React.FC<Props> = (props) => {
  const [count, setCount] = useState<string>("");
  const [error, setError] = useState("");

  const validate = () => {
    setError("");
    let amount = 0;
    try {
      amount = Number(count);
    } catch {
      setError("Not a valid number");
      return;
    }
    if (!Number.isInteger(amount)) {
      setError("Must be a whole number");
    }
    if (amount > 20) {
      setError("Maximum of 20 allowed");
    }
    if (amount <= 0) {
      setError("Number of Waifus cannot be 0 or negative");
    }
  };

  return (
    <Popup
      show={props.show}
      close={() => {
        setError("");
        setCount("");
        props.close();
      }}
      content={
        <Content>
          <Input
            value={count}
            type="number"
            placeholder="1"
            onChange={(event) => setCount(event.target.value)}
          />
          {error && <Error>{error}</Error>}
        </Content>
      }
      header="Buy Waifu"
      body="Select the number of Waifus that you would like to buy"
      buttonAction={() => {
        validate();
        alert("Not implmented yet");
      }}
      buttonText="Buy"
    />
  );
};

export default BuyWaifu;
