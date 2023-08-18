import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Root = styled.View`
  display: flex;
  background-color: white;
  width: 100%;

  gap: 16px;
`;

// Header
export const Header = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding: 24px;
  padding-bottom: 0;

  color: ${(props: any) => props.theme.colors.common.white};
`;

export const CloseIcon = styled(Ionicons)`
  color: ${(props: any) => props.theme.colors.common["gray-300"]};
  font-size: 24px;
`;

export const HeaderViewText = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const HeaderIcon = styled(Ionicons)`
  color: ${(props: any) => props.theme.colors.primary.dark};
  font-size: 24px;
  font-weight: 800;
`;

export const HeaderText = styled.Text`
  color: ${(props: any) => props.theme.colors.primary.dark};
  font-size: 20px;
  font-weight: 800;
`;

// Form Data
export const FormSection = styled.View`
  display: flex;
  padding: 8px 24px;
  gap: 12px;
`;

export const InputView = styled.View`
  display: flex;
  width: 100%;
  gap: 8px;
`;

export const InputLabel = styled.Text`
  color: ${(props: any) => props.theme.colors.common["gray-400"]};
`;

export const ErrorMessage = styled.Text`
  color: ${(props: any) => props.theme.colors.alert.danger};
`;

export const ButtonView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
`;
