import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

//todo: Change to pick
type Props = {
  variant?: "solid" | "outline";
  isIconHeader?: boolean;
};

export const Root = styled.View<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  background-color: ${(props: any) => props.theme.colors.primary.main};
`;

export const Text = styled.Text<Props>`
  font-size: 16px;
  color: ${(props: any) => props.theme.colors.common.white};
`;

export const Icon = styled(Ionicons)<Props>`
  color: ${(props: any) => props.theme.colors.common.white};
  font-size: 28px;
`;
