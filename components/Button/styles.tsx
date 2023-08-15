import { styled } from "styled-components/native";

export const Root = styled.TouchableOpacity`
  display: flex;
  justify-items: center;
  align-items: center;
  height: 40px;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.primary.mid};
`;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.common.white};
`;
