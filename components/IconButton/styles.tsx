import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

//todo: Change to pick
type Props = {
  variant?: "solid" | "outline";
};

export const Root = styled.TouchableOpacity<Props>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 9999px;

  ${(props) =>
    props.variant === "solid" &&
    `
  background-color: ${props.theme.colors.primary.mid};
  `}

  ${(props) =>
    props.variant === "outline" &&
    `
  border: 1px solid ${props.theme.colors.primary.mid};
  `}
`;

export const Icon = styled(Ionicons)<Props>`
  font-size: 32px;

  ${(props) =>
    props.variant === "solid" &&
    `
    color: ${props.theme.colors.common.white};
  `}

  ${(props) =>
    props.variant === "outline" &&
    `
    color: ${props.theme.colors.primary.mid};
  `}
`;
