import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./loading";

const StyledBuyWaifus = styled.div``;

/** Duration of the “Buying Waifus” modal before “Reveal Waifus” unlocks */
const DEMO_BUY_MS = 6000;

const BuyWaifus = ({ show, close, demoFlow }) => {
  const [loading, setLoading] = useState(false);
  const [commitComplete, setCommitComplete] = useState(false);
  const [demoRevealIds, setDemoRevealIds] = useState([1337]);

  useLayoutEffect(() => {
    if (!show) {
      setLoading(false);
      setCommitComplete(false);
      return;
    }
    if (!demoFlow) {
      return;
    }
    setDemoRevealIds([(4200) % 16384]);
    setLoading(true);
    setCommitComplete(false);
  }, [show, demoFlow]);

  useEffect(() => {
    if (!show || !demoFlow) {
      return;
    }
    const t = window.setTimeout(() => setCommitComplete(true), DEMO_BUY_MS);
    return () => window.clearTimeout(t);
  }, [show, demoFlow]);

  const handleClose = () => {
    setLoading(false);
    setCommitComplete(false);
    close();
  };

  return (
    <StyledBuyWaifus>
      <Loading
        type={"buying"}
        show={show && loading}
        complete={commitComplete}
        demoMode={demoFlow}
        demoRevealedIds={demoRevealIds}
        onDemoFlowDone={handleClose}
      />
    </StyledBuyWaifus>
  );
};

export default BuyWaifus;
