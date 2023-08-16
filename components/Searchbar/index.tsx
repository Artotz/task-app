import { FC } from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

type SearchbarProps = {} & TextInputProps;

const Searchbar: FC<SearchbarProps> = ({ ...rest }) => {
  return (
    <S.View>
      <S.Icon name="search" />
      <S.TextInput {...rest}></S.TextInput>
    </S.View>
  );
};

export default Searchbar;
