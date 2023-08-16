import { FC } from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

type InputTextProps = {} & TextInputProps;

const InputText: FC<InputTextProps> = ({ ...rest }) => {
  return <S.TextInput {...rest}></S.TextInput>;
};

export default InputText;
