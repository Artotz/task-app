import { useState } from "react";
import { Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

import useTodoList from "../../data/TodoListContext";
import { Sector } from "../../types/todo";

type AddSectorProps = { handleCloseButton: () => void };

export default function AddSector(props: AddSectorProps) {
  const { addSector } = useTodoList();

  const colorList = ["red", "green", "blue"];

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Adicionar Setor</Text>
        <Button onPress={props.handleCloseButton} title="button"></Button>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 50,
          paddingHorizontal: 20,
        }}
      >
        {/* Name */}
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <TextInput
              onChangeText={onChange}
              placeholder="Name"
              style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
          )}
          name="name"
          rules={{ required: "Name is required" }}
        />
        {errors.name && <Text>{errors.name.message}</Text>}

        {/* Description */}
        <Controller
          control={control}
          render={({ field }) => (
            <Picker selectedValue={field.value} onValueChange={field.onChange} style={styles.picker} mode="dropdown">
              {/* Initial option with undefined value */}
              <Picker.Item label={"Selecione..."} enabled={false} color="#777" />

              {colorList.map((color, index) => (
                <Picker.Item key={index} label={color} value={color} color="#000" />
              ))}
            </Picker>
          )}
          name="color"
          rules={{ required: "Color is required" }}
        />
        {errors.color && <Text>{errors.color.message}</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
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
    backgroundColor: "#DDD",
    width: 170,
  },
});
