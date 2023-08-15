import { FC, ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type ButtonProps = {
  Icon?: ReactNode;
} & TouchableOpacityProps;

const Button: FC<ButtonProps> = ({ children, Icon }) => {
  return (
    <S.Root>
      {Icon && Icon}
      <S.Text>{children}</S.Text>
    </S.Root>
  );
};

export default Button;
