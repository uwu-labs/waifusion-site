import styled from "styled-components";

export const Button = styled.button<{danger?: boolean}>`
  min-width: 10rem;
  color: ${({danger}) => danger ? "#ffffff" : "#817d82"};
  border-radius: .5rem;
  outline: none;
  display: inline-flex;
  border: 2px solid ${({danger}) => danger ? "#c23d3d" : "#e7e4e7"};
  font-family: "Calibre";
  height: 3rem;
  background-color: ${props => props.danger ? "#ef5252" : "transparent"};
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 .2rem 0 0 ${({danger}) => danger ? "#c23d3d" : "#e7e4e7"};;
  font-weight: 500;
  line-height: 1;
  font-size: 14pt;
`;