import { FC } from "react";
import { GestureResponderEvent, TouchableOpacity, ViewProps } from "react-native";

import * as S from "./styles";

type HeaderProps = {
  backFunction?: (event: GestureResponderEvent) => void;
  title: string;
  hamburgerFunction?: (event: GestureResponderEvent) => void;
} & ViewProps;

const Header: FC<HeaderProps> = ({ backFunction, title, hamburgerFunction, ...rest }) => {
  return (
    <S.Root {...rest}>
      {backFunction && (
        <TouchableOpacity onPress={backFunction}>
          <S.Icon name="arrow-back-circle" />
        </TouchableOpacity>
      )}
      <S.Text>{title}</S.Text>
      {hamburgerFunction && (
        <TouchableOpacity onPress={hamburgerFunction}>
          <S.Icon name="menu" />
        </TouchableOpacity>
      )}
    </S.Root>
  );
};

export default Header;
