import { styled } from "styled-components/native";

type Props = {
  color?: string;
};

export const Root = styled.View<Props>`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.common.white};
  overflow: hidden;
  margin: 8px 16px 8px 16px;
`;

export const ColorTag = styled.View<Props>`
  width: 8px;
  height: 100%;
  background-color: ${(props) => props.color};
`;

export const ChildrenContainer = styled.View<Props>`
  display: flex;
  flex-grow: 1;
  border-radius: 8px;

  padding: 16px 16px 16px 16px;

  justify-content: space-between;
  gap: 10px;

  background-color: ${(props) => props.theme.colors.common.white};
`;
