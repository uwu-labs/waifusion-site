// Frameworks
import React from "react";
import { Heading, Button, Loader } from "rimble-ui";
import styled from "styled-components";

const NewLoader = styled(Loader)`
  margin-right: 10px;
  margin-top: 3px;
`;

const PendingButton = ({ isPending, clickEvent, text }) => {
  return (
    <>
      <Button.Outline
        className="waifu-card-buttons"
        onClick={() => {
          if (!isPending) clickEvent();
        }}
      >
        {!isPending && <span className="waifu-button-learnmore">{text}</span>}
        {isPending && (
          <>
            <NewLoader color="#181525" disabled={!isPending}>
              Pending Transaction
            </NewLoader>

            <span>Loading</span>
          </>
        )}
      </Button.Outline>
    </>
  );
};

export default PendingButton;
