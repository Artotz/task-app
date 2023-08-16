import { FC } from "react";
import { GestureResponderEvent, TouchableOpacity, ViewProps } from "react-native";

import * as S from "./styles";

type CardProps = {} & ViewProps;

const Card: FC<CardProps> = ({ children, ...rest }) => {
  return <S.Root {...rest}>{children}</S.Root>;
};

export default Card;
