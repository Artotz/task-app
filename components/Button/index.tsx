import { FC } from "react";
import { TouchableOpacityProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import * as S from "./styles";

type ButtonProps = {
  variant?: "solid" | "outline";
  icon?: keyof typeof Ionicons.glyphMap;
} & TouchableOpacityProps;

const Button: FC<ButtonProps> = ({ children, icon, variant = "solid", ...rest }) => {
  return (
    <S.Root {...rest} variant={variant}>
      {icon && <S.Icon name={icon} variant={variant} />}
      {children && <S.Text variant={variant}>{children}</S.Text>}
    </S.Root>
  );
};

export default Button;
