import { useState } from "react";
import { TouchableOpacity, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

import useTodoList from "../../data/TodoListContext";
import { Sector } from "../../types/todo";

type AddSectorProps = { handleCloseButton: () => void };

import InputText from "../../components/InputText";
import Button from "../../components/Button";
import * as S from "./styles";

export default function AddSector(props: AddSectorProps) {
  const { addSector } = useTodoList();

  const colorList = [
    { value: "red", name: "Vermelho" },
    { value: "green", name: "Verde" },
    { value: "blue", name: "Azul" },
    { value: "yellow", name: "Amarelo" },
    { value: "cyan", name: "Ciano" },
    { value: "magenta", name: "Magenta" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Sector, "id">>();
  const onSubmit = (data: Omit<Sector, "id">) => handleAddSector(data);

  const handleAddSector = (sector: Omit<Sector, "id">) => {
    addSector(sector);
    props.handleCloseButton();
  };

  return (
    <S.Root style={styles.container}>
      <S.Header>
        <S.HeaderViewText>
          <S.HeaderIcon name="pricetag" />
          <S.HeaderText>Adicionar Setor</S.HeaderText>
        </S.HeaderViewText>
        <TouchableOpacity>
          <S.CloseIcon name="close-circle" onPress={props.handleCloseButton} />
        </TouchableOpacity>
      </S.Header>

      <S.FormSection>
        {/* Name */}
        <S.InputView>
          <S.InputLabel>Nome</S.InputLabel>
          <Controller
            control={control}
            render={({ field: { onChange } }) => <InputText onChangeText={onChange} placeholder="Name" />}
            name="name"
            rules={{ required: "Nome é obrigatório" }}
          />
          {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
        </S.InputView>

        {/* Color */}
        <S.InputView>
          <S.InputLabel>Cor de Identificação</S.InputLabel>
          <Controller
            control={control}
            render={({ field }) => (
              <Picker selectedValue={field.value} onValueChange={field.onChange} style={styles.picker} mode="dropdown">
                {/* Initial option with undefined value */}
                <Picker.Item label={"Selecione uma cor"} enabled={false} color="#777" />

                {colorList.map((color, index) => (
                  <Picker.Item
                    key={index}
                    label={color.name}
                    value={color.value}
                    //style={{ backgroundColor: color }}
                    color={color.value}
                  />
                ))}
              </Picker>
            )}
            name="color"
            rules={{ required: "Color é obrigatória" }}
          />
          {errors.color && <Text>{errors.color.message}</Text>}
        </S.InputView>

        <S.ButtonView>
          <Button variant="outline" onPress={props.handleCloseButton}>
            Cancelar
          </Button>
          <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
        </S.ButtonView>
      </S.FormSection>
    </S.Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerFlowRow: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DAD",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
    maxHeight: 60,
  },
  textInputArea: {
    height: 80,
    alignItems: "center",
    backgroundColor: "#AAA",
    justifyContent: "center",
  },
  textInput: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFF",
  },
  filterInputArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A3A",
    justifyContent: "space-between",
    paddingHorizontal: 60,
    maxHeight: 60,
  },
  button: {
    paddingHorizontal: 20,
  },
  listArea: {
    flex: 1,
    overflow: "scroll",
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#AAA",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  picker: {
    flex: 0,
    backgroundColor: "#DDD",
  },
});
