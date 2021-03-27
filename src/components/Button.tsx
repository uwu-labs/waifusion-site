import styled from "styled-components";

export const Button = styled.button<{ danger?: boolean }>`
  min-width: 10rem;
  color: ${({ danger }) => (danger ? "#ffffff" : "#817d82")};
  border-radius: 0.5rem;
  outline: none;
  display: inline-flex;
  border: 2px solid
    ${({ danger }) => (danger ? "var(--danger-shadow)" : "#e7e4e7")};
  font-family: "Calibre";
  height: 3rem;
  background-color: ${(props) =>
    props.danger ? "var(--danger)" : "transparent"};
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0.2rem 0 0
    ${({ danger }) => (danger ? "var(--danger-shadow)" : "#e7e4e7")};
  font-weight: 500;
  line-height: 1;
  font-size: 14pt;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    box-shadow: 0 0.3rem 0 0
      ${({ danger }) => (danger ? "var(--danger-shadow)" : "#e7e4e7")};
    transform: translateY(-0.1rem);
  }

  :active {
    box-shadow: 0 0 0 0
      ${({ danger }) => (danger ? "var(--danger-shadow)" : "#e7e4e7")};
    transform: translateY(0.2rem);
  }
`;
