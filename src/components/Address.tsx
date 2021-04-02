/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress, setAddress } from "../state/reducers/user";
import { ChevronDownIcon } from "./Icons";
import Button from "./Button";

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
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

  return (
    <SignedInAddressContainer
      primary
      small
      onClick={() => dispatch(setAddress("123...abc"))}
    >
      {!address && "Connect"}
      {address && (
        <>
          {address}
          <ChevronDownIcon />
        </>
      )}
    </SignedInAddressContainer>
  );
};

export default Address;
