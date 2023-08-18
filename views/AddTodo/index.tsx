import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid, AndroidNativeProps } from "@react-native-community/datetimepicker";

import useTodoList from "../../data/TodoListContext";
import { Todo, PriorityTypes, StatusTypes } from "../../types/todo";
import * as S from "./styles";

import InputText from "../../components/InputText";
import Button from "../../components/Button";
import { TextInput } from "../../components/InputText/styles";

type AddTodoProps = { handleCloseButton: () => void };

export default function AddTodo(props: AddTodoProps) {
  const { sectorList, addTodo } = useTodoList();

  const [date, setDate] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Todo, "id">>();

  const onSubmit = (data: Omit<Todo, "id">) => handleAddTodo(data);

  const handleAddTodo = (todo: Omit<Todo, "id">) => {
    addTodo(todo);
    props.handleCloseButton();
  };

  return (
    <S.Root>
      <S.Header>
        <S.HeaderViewText>
          <S.HeaderIcon name="checkbox" />
          <S.HeaderText>Adicionar Tarefa</S.HeaderText>
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
            render={({ field: { onChange } }) => (
              <InputText onChangeText={onChange} placeholder="Name" style={{ borderWidth: 1, padding: 5 }} />
            )}
            name="name"
            rules={{ required: "Nome é obrigatório" }}
          />
          {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
        </S.InputView>

        {/* Description */}
        <S.InputView>
          <S.InputLabel>Descrição (opcional)</S.InputLabel>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <InputText
                onChangeText={onChange}
                placeholder="Description"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
              />
            )}
            name="description"
          />
          {errors.description && <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>}
        </S.InputView>

        {/* DueDate and Sector */}
        <View style={styles.containerFlowRow}>
          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  value={date.toDateString()}
                  onPressIn={() =>
                    DateTimePickerAndroid.open({
                      value: date,
                      onChange: (event, newDate) => {
                        if (newDate) {
                          setDate(newDate);
                          field.onChange(newDate);
                        }
                      },
                    } as AndroidNativeProps)
                  }
                  placeholder="Due Date"
                  style={{ borderWidth: 1, padding: 5 }}
                />
              )}
              name="dueDate"
              rules={{ required: "Due Date is required" }}
            />
            {errors.dueDate && <S.ErrorMessage>{errors.dueDate.message}</S.ErrorMessage>}
          </View>
          {/* Sector */}
          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <Picker
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                  style={styles.picker}
                  mode="dropdown"
                >
                  {/* Initial option with undefined value */}
                  <Picker.Item label={"Selecione..."} enabled={false} color="#777" />

                  {sectorList.map((sector) => (
                    <Picker.Item key={sector.id} label={sector.name} value={sector.id} color="#000" />
                  ))}
                </Picker>
              )}
              name="sectorId"
              rules={{ required: "Sector is required" }}
            />
            {errors.sectorId && <S.ErrorMessage>{errors.sectorId.message}</S.ErrorMessage>}
          </View>
        </View>

        {/* Priority and Status */}
        <View style={styles.containerFlowRow}>
          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <Picker
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                  style={styles.picker}
                  mode="dropdown"
                >
                  {/* Initial option with undefined value */}
                  <Picker.Item label={"Selecione..."} enabled={false} color="#777" />

                  {PriorityTypes.map((priority, index) => (
                    <Picker.Item key={index} label={priority} value={priority} color="#000" />
                  ))}
                </Picker>
              )}
              name="priority"
              rules={{ required: "Priority is required" }}
            />
            {errors.priority && <S.ErrorMessage>{errors.priority.message}</S.ErrorMessage>}
          </View>

          <View>
            <Controller
              control={control}
              render={({ field }) => (
                <Picker
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                  style={styles.picker}
                  mode="dropdown"
                >
                  {/* Initial option with undefined value */}
                  <Picker.Item label={"Selecione..."} enabled={false} color="#777" />

                  {StatusTypes.map((status, index) => (
                    <Picker.Item key={index} label={status} value={status} color="#000" />
                  ))}
                </Picker>
              )}
              name="status"
              rules={{ required: "Status is required" }}
            />
            {errors.status && <S.ErrorMessage>{errors.status.message}</S.ErrorMessage>}
          </View>
        </View>

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
    border: 1,
    backgroundColor: "#DDD",
    width: 150,
  },
});
