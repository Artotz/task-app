import { styled } from "styled-components/native";

export const ButtonStyled = styled.Text`
  background-color: ${(props) => props.theme.primary.main};
  color: white;
`;

export const SearchBarStyled = styled.TextInput`
  display: flex;
  width: 80%;

  padding: 10px 15px;
  border: 1px;
  border-color: black;
  background-color: #f1f1f1;

  border-radius: 30px;
`;
