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

  const validate = (newName: string) => {
    const alphanumericRegex = RegExp("^[a-zA-Z0-9 ]*$");
    if (!alphanumericRegex.test(newName)) {
      setError(t("errors.alphanumeric"));
      return;
    }
    if (/\s{2,}/.test(newName)) {
      setError(t("errors.consecutiveSpaces"));
      return;
    }
    if (newName[0] === " ") {
      setError(t("errors.leadingSpace"));
      return;
    }
    if (newName[newName.length - 1] === " ") {
      setError(t("errors.trailingSpace"));
      return;
    }
    if (newName.length === 0) {
      setError(t("errors.short"));
      return;
    }
    if (newName.length > 25) {
      setError(t("errors.long"));
      return;
    }
    setError("");
  };

  const changeName = async () => {
    setError("");

    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const waifuContract = await contractHelper.getWaifuContract();

    const nameTaken = await contractHelper.isNameReserved(name);
    if (nameTaken) {
      setError(t("errors.taken"));
      return;
    }

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
        close={() => {
          if (loading) return;
          props.close();
        }}
        content={
          <Content>
            {!loading && !complete && (
              <Input
                value={name}
                update={(value: string) => {
                  setName(value);
                  validate(value);
                }}
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
          if (loading) return;
          if (complete) props.close();
          else changeName();
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
