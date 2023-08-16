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
  border-radius: 8px;

  /* Solid */
  ${(props) =>
    props.variant === "solid" &&
    `
  background-color: ${props.theme.colors.primary.mid};
  `}

  /* Outline */
  ${(props) =>
    props.variant === "outline" &&
    `
  border: 1px solid ${props.theme.colors.primary.mid};
  `}
`;

export const Text = styled.Text<Props>`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.common.white};

  ${(props) =>
    props.variant === "outline" &&
    `
    color: ${props.theme.colors.primary.mid};
  `}
`;

export const Icon = styled(Ionicons)<Props>`
  color: ${(props) => props.theme.colors.common.white};
  font-size: 16px;

  ${(props) =>
    props.variant === "outline" &&
    `
    color: ${props.theme.colors.primary.mid};
  `}
`;
