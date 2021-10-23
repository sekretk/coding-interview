import styled from "styled-components";

export const StyledInput = styled.input`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 100%;
  padding: 20px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  background: #222831;
  box-shadow: none;
  caret-color: #f05454;
  color: #f05454;
  &::placeholder {
    color: #ddd;
  }
`;
