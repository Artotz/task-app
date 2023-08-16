import { FC } from "react";
import { GestureResponderEvent, TouchableOpacity, ViewProps } from "react-native";

import * as S from "./styles";

type CardProps = { color?: string } & ViewProps;

const Card: FC<CardProps> = ({ children, color = "#055BCE", ...rest }) => {
  return (
    <S.Root {...rest}>
      <S.ColorTag color={color} />
      <S.ChildrenContainer>{children}</S.ChildrenContainer>
    </S.Root>
  );
};

export default Card;
