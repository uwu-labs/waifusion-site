import React from "react";
import { useTranslation } from "react-i18next";
import Popup from "./Popup";

type Props = {
  show: boolean;
  close: () => void;
};

const RevealComplete: React.FC<Props> = (props) => {
  const [t] = useTranslation();

  return (
    <Popup
      show={props.show}
      close={() => props.close()}
      header={t("dungeon.headers.revealed")}
      buttonAction={() => props.close()}
      buttonText={t("buttons.close")}
    />
  );
};

export default RevealComplete;
