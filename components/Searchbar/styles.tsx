import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

//todo: Change to pick
type Props = {
  variant?: "solid" | "outline";
  isIconHeader?: boolean;
};

export const View = styled.View<Props>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 80%;
  align-items: center;

  padding: 8px 16px;
  height: 48px;
  border-color: black;
  background-color: ${(props: any) => props.theme.colors.common["gray-100"]};

  border-radius: 9999px;
`;

export const TextInput = styled.TextInput<Props>`
  color: ${(props: any) => props.theme.colors.common["gray-400"]};
`;

export const Icon = styled(Ionicons)<Props>`
  color: ${(props: any) => props.theme.colors.common["gray-400"]};
  font-size: 24px;
`;
