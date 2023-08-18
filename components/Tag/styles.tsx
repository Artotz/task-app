import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  size?: "small" | "medium" | "large";
  label?: string;
};

export const Root = styled.View<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const Text = styled.Text<Props>`
  font-size: ${(props) => {
    if (props.size === "large") return "18px";
    else if (props.size === "medium") return "16px";
    else return "12px";
  }};
`;

export const Icon = styled(Ionicons)<Props>`
  color: ${(props) => props.iconColor || "#333"};
  font-size: ${(props) => {
    if (props.size === "large") return "18px";
    else if (props.size === "medium") return "16px";
    else return "12px";
  }};
`;
