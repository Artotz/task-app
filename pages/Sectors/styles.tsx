import { styled } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Root = styled.View`
  display: flex;
  width: 100%;

  gap: 16px;
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

export const CardView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  gap: 16px;
  padding-top: 16px;
`;

export const HeadingView = styled.View`
  display: flex;
  gap: 8px;
`;

export const Heading = styled.Text`
  font-size: 22px;
`;
