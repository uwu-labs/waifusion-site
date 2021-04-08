import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ContractHelper } from "../services/contract";
import Input from "./Input";
import Popup from "./Popup";
import { Waifu } from "../types/waifusion";

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
  waifu: Waifu;
};

const ChangeName: React.FC<Props> = (props) => {
  if (!props.show) return null;

  const [t] = useTranslation();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const changeName = async () => {
    setError("");

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const waifuContract = await contractHelper.getWaifuContract();
    waifuContract.methods
      .changeName(props.waifu.id, name)
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        setLoading(false);
        setComplete(true);
      })
      .on("error", (err: any) => {
        setLoading(false);
        console.log("error: ", err.message);
      });
  };

  return (
    <>
      <Popup
        show={props.show}
        close={() => props.close()}
        content={
          <Content>
            {!loading && !complete && (
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            )}
            {error && <Error>{error}</Error>}
          </Content>
        }
        header={
          loading
            ? t("waifuDetail.changeName.header.loading")
            : complete
            ? t("waifuDetail.changeName.header.complete")
            : t("waifuDetail.changeName.header.main")
        }
        body={
          loading ? "" : complete ? "" : t("waifuDetail.changeName.body.main")
        }
        buttonAction={() => {
          changeName();
        }}
        buttonText={
          loading
            ? t("loading")
            : complete
            ? t("buttons.close")
            : t("buttons.changeName")
        }
      />
    </>
  );
};

export default ChangeName;
