import styled from "styled-components";
import { Popover } from "../popover/popover.component";

export const PopoverStyled = styled(Popover)`
  position: relative;
  background: #222831;
  border-radius: 10px;
  top: 10px;
`;

export const InstrumentSelectorItemStyled = styled.div`
  min-width: 300px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: default;
  color: #dddddd;

  &:hover {
    color: #f05454;
  }

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
