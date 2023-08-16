import { styled } from "styled-components/native";

//todo: Change to pick
type Props = {};

export const TextInput = styled.TextInput<Props>`
  color: ${(props) => props.theme.colors.common["gray-400"]};
  border: 1px solid ${(props) => props.theme.colors.common["gray-400"]};
  background-color: ${(props) => props.theme.colors.common.white};
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
`;
