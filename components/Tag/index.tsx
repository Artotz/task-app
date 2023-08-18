import { FC } from "react";
import { TextProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as S from "./styles";

type TagProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  size?: "small" | "medium" | "large";
  label?: string;
} & TextProps;
const Tag: FC<TagProps> = ({ children, icon, label, iconColor, size, ...rest }) => {
  return (
    <S.Root {...rest}>
      {icon && <S.Icon name={icon} iconColor={iconColor} size={size} />}
      {label && <S.Text size={size}>{label}</S.Text>}
    </S.Root>
  );
};

export default Tag;
