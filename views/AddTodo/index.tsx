import { useState } from "react";
import { Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid, AndroidNativeProps } from "@react-native-community/datetimepicker";

import useTodoList from "../../data/TodoListContext";
import { Todo, PriorityTypes, StatusTypes } from "../../types/todo";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Adicionar Tarefa</Text>
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
          render={({ field: { onChange } }) => (
            <TextInput
              onChangeText={onChange}
              placeholder="Description"
              style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
          )}
          name="description"
        />
        {errors.description && <Text>{errors.description.message}</Text>}

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
                  style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
                />
              )}
              name="dueDate"
              rules={{ required: "Due Date is required" }}
            />
            {errors.dueDate && <Text>{errors.dueDate.message}</Text>}
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

                  {sectorList.map((sector) => (
                    <Picker.Item key={sector.id} label={sector.name} value={sector.id} color="#000" />
                  ))}
                </Picker>
              )}
              name="sectorId"
              rules={{ required: "Sector is required" }}
            />
            {errors.sectorId && <Text>{errors.sectorId.message}</Text>}
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
            {errors.priority && <Text>{errors.priority.message}</Text>}
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
            {errors.status && <Text>{errors.status.message}</Text>}
          </View>
        </View>

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
