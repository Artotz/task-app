import { FC } from "react";
import { TouchableOpacityProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import * as S from "./styles";

type TreeItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
} & TouchableOpacityProps;

const TreeItem: FC<TreeItemProps> = ({ children, icon, title, ...rest }) => {
  return (
    <S.Root {...rest}>
      <S.Icon name={icon} />
      <S.View>
        <S.RowView>
          <S.Title>{title}</S.Title>
          <S.ArrowIcon name="arrow-forward" />
        </S.RowView>
        <S.ChildrenContainer>{children}</S.ChildrenContainer>
      </S.View>
    </S.Root>
  );
};

export default TreeItem;
