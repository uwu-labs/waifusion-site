import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styled from "styled-components";

import { selectGlobalsData } from "../state/reducers/globals";

import Button from "./Button";

const ViewOnMarketplaceButton = styled(Button)`
  margin-left: 1rem;
`;

type ParamProps = {
  id: string;
};

const ViewOnMarketplace: React.FC = () => {
  const [t] = useTranslation();
  const { id: waifuId } = useParams<ParamProps>();
  const globals = useSelector(selectGlobalsData);

  const waifuMarketplaceLink = useMemo(
    () => globals.getWaifuMarketplaceLink(waifuId),
    [globals, waifuId]
  );

  return (
    <a href={waifuMarketplaceLink} target="_blank" rel="noreferrer">
      <ViewOnMarketplaceButton primary small>
        {t("waifuDetail.viewOnMarketplace")}
      </ViewOnMarketplaceButton>
    </a>
  );
};

export default ViewOnMarketplace;
