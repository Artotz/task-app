import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

//todo: Change to pick
type Props = {
  variant?: "solid" | "outline";
};

export const Root = styled.TouchableOpacity<Props>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 0px 0px 12px;
`;

export const Icon = styled(Ionicons)<Props>`
  color: ${(props: any) => props.theme.colors.primary.light};
  font-size: 50px;
`;

export const View = styled.View`
  display: flex;
  flex-grow: 1;
  margin-right: 30px;
  padding: 4px 0px 0px 0px;
`;

export const RowView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 0px 0px 0px;
`;

export const Title = styled.Text<Props>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props: any) => props.theme.colors.common.black};

  ${(props: any) =>
    props.variant === "outline" &&
    `
    color: ${props.theme.colors.primary.mid};
  `}
`;

export const ArrowIcon = styled(Ionicons)<Props>`
  color: ${(props: any) => props.theme.colors.primary.light};
  font-size: 20px;
`;

export const ChildrenContainer = styled.Text<Props>`
  display: flex;
  font-size: 11px;
  padding: 4px 0px 0px 0px;

  justify-content: space-between;
`;
