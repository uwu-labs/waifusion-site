import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./loading";

const StyledWaifuSelector = styled.div``;

/** Duration of the “Burning Waifus” modal before “Reveal Waifus” unlocks */
const DEMO_BURN_MS = 6000;

const WaifuSelector = ({ show, close, demoFlow }) => {
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
    setDemoRevealIds([(8000) % 16384]);
    setLoading(true);
    setCommitComplete(false);
  }, [show, demoFlow]);

  useEffect(() => {
    if (!show || !demoFlow) {
      return;
    }
    const t = window.setTimeout(() => setCommitComplete(true), DEMO_BURN_MS);
    return () => window.clearTimeout(t);
  }, [show, demoFlow]);

  const handleClose = () => {
    setLoading(false);
    setCommitComplete(false);
    close();
  };

  return (
    <StyledWaifuSelector>
      <Loading
        type={"burning"}
        show={show && loading}
        complete={commitComplete}
        demoMode={demoFlow}
        demoRevealedIds={demoRevealIds}
        onDemoFlowDone={handleClose}
      />
    </StyledWaifuSelector>
  );
};

export default WaifuSelector;
