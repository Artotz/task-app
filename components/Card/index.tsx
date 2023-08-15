import { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type CardProps = {
  title: string;
} & TouchableOpacityProps;

export const Card: FC<CardProps> = ({ children }) => {
  return <TouchableOpacity>{children}</TouchableOpacity>;
};
