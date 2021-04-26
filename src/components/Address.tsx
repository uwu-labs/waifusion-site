/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectAddress, setAddress } from "../state/reducers/user";
import { ChevronDownIcon } from "./Icons";
import Button from "./Button";
import { getAddress } from "../services/contract";
import { getGlobals } from "../services/globals";
import { setGlobals } from "../state/reducers/globals";

const SignedInAddressContainer = styled(Button)`
  svg {
    margin-left: 5px;
    vertical-align: middle;
  }
  path {
    color: var(--primary-dark);
  }
`;

const Address: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);
  const formattedAddress = () => {
    if (address.length < 8) return "";
    return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;
  };

  const updateAddress = async (): Promise<void> => {
    const _address = await getAddress();
    dispatch(setAddress(_address));

    const globals = await getGlobals();
    dispatch(setGlobals(globals));
  };

  useEffect(() => {
    updateAddress();
  }, []);

  return (
    <SignedInAddressContainer primary small onClick={() => updateAddress()}>
      {!address && t("connect")}
      {address && (
        <>
          {formattedAddress()}
          <ChevronDownIcon />
        </>
      )}
    </SignedInAddressContainer>
  );
};

export default Address;
