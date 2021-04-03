import React from "react";
import styled from "styled-components";

const StyledPageSelector = styled.div`
  display: flex;
  margin-bottom: 3rem;
  position: relative;
  align-items: center;
`;

type ArrowProps = {
  left?: boolean;
  disabled?: boolean;
};

const Arrow = styled.div`
  transform: ${(props: ArrowProps) =>
    props.left ? "rotate(180deg)" : "rotate(0)"};
  opacity: ${(props: ArrowProps) => (props.disabled ? "0" : "1")};
  image-rendering: pixelated;
  height: 2.8rem;
  cursor: pointer;
`;

const PageIndicator = styled.div`
  font-size: 2.4rem;
  margin: 0 2rem;
`;

type Props = {
  page: number;
  setPage: (page: number) => void;
  pages: number;
};

const PageSelector: React.FC<Props> = ({ page, setPage, pages }) => {
  return (
    <StyledPageSelector>
      <Arrow
        onClick={() => {
          if (page !== 1) setPage(page - 1);
        }}
        left
        disabled={page === 1}
      >
        {"<"}
      </Arrow>
      <PageIndicator>{`${page}/${pages}`}</PageIndicator>
      <Arrow
        onClick={() => {
          if (page !== pages) setPage(page + 1);
        }}
        disabled={page === pages}
      >
        {">"}
      </Arrow>
    </StyledPageSelector>
  );
};

export default PageSelector;
