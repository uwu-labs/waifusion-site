import React from "react";
import styled from "styled-components";
import Popup from "./Popup";

type Props = {
  show: boolean;
  close: () => void;
};

const RevealComplete: React.FC<Props> = (props) => {
  return (
    <Popup
      show={props.show}
      close={() => props.close()}
      header="Waifus Revealed!"
      buttonAction={() => props.close()}
      buttonText="Close"
    />
  );
};

export default RevealComplete;
