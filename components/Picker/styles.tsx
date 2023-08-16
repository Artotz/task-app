import { styled } from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

//todo: Change to pick
type Props = {};

export const Select = styled(Picker)<Props>`
  color: ${(props: any) => props.theme.colors.common["gray-400"]};
  border: 1px solid ${(props: any) => props.theme.colors.common["gray-400"]};
  background-color: ${(props: any) => props.theme.colors.common.white};
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
`;
