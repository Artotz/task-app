import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

import useTodoList from "../../data/TodoListContext";
import AddTodo from "../AddTodo";

import { Todo } from "../../types/todo";

export default function Home({ navigation }: { navigation: any }) {
  const { todoList, initialize, findSectorById } = useTodoList();

  useEffect(() => {
    initialize();
  }, []);

  const [todoListFiltered, setTodoListFiltered] = useState(JSON.parse(JSON.stringify(todoList)) as Todo[]);
  useEffect(() => {
    setTodoListFiltered(JSON.parse(JSON.stringify(todoList)) as Todo[]);
  }, [todoList]);

  const filterTodoList = (text: string) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as Todo[];

    if (text === "") {
      setTodoListFiltered(todoListCopy);
      return;
    }
    setTodoListFiltered(todoListCopy.filter((todo) => todo.name.toLowerCase().includes(text.toLowerCase())));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);

  // Override BackButton Behaviour (Closing the App on Home Page)
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => subscription.remove();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <View style={styles.header}>
        <Text>Cabeça</Text>
        <Button onPress={() => setIsModal2Visible(true)} title="button"></Button>
      </View>

      {/* Main Section */}
      <View style={styles.textInputArea}>
        <TextInput onChangeText={(text) => filterTodoList(text)} style={styles.textInput}></TextInput>
      </View>
      <View style={styles.filterInputArea}>
        <Button title="button"></Button>
        <Button title="button"></Button>
      </View>
      <View style={styles.listArea}>
        <FlatList
          data={todoListFiltered}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>
                {item.name} setor: {findSectorById(item.sectorId)?.name}
              </Text>
              <Text>{item.dueDate}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.addButton}>
        <Button onPress={() => setIsModalVisible(true)} title="button"></Button>
      </View>

      {/* AddTodo Modal */}
      <ReactNativeModal
        style={{ marginHorizontal: 0, marginBottom: 0, marginTop: 180 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
      >
        <AddTodo handleCloseButton={() => setIsModalVisible(false)} />
      </ReactNativeModal>

      {/* PagesListHamburguerMenu Component */}
      <ReactNativeModal
        style={{ marginVertical: 0, marginLeft: 120, marginRight: 0 }}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropTransitionOutTiming={0}
        isVisible={isModal2Visible}
        onBackButtonPress={() => setIsModal2Visible(false)}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>Task App</Text>
            <Button onPress={() => setIsModal2Visible(false)} title="button"></Button>
          </View>
          <View style={{ padding: 10 }}>
            <Button
              title="button"
              onPress={() => {
                setIsModal2Visible(false);
                navigation.navigate("Home");
              }}
            ></Button>
          </View>
          <View style={{ padding: 10 }}>
            <Button
              title="button"
              onPress={() => {
                setIsModal2Visible(false);
                navigation.navigate("SectorPage");
              }}
            ></Button>
          </View>
        </View>
      </ReactNativeModal>

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});
