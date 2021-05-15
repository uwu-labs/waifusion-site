import React from "react";
import Helmet from "react-helmet";
import { APPNAME } from "../constants/main";

interface Props {
  title: string;
  subtitle?: string;
}

const Head: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <Helmet>
      <title>{`${
        subtitle ? `${subtitle} - ` : ""
      }${title} | ${APPNAME}`}</title>
    </Helmet>
  );
};

export default Head;
