import { useCallback, useEffect, useState } from "react";
import { BackHandler, FlatList, Button, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

import useTodoList from "../../data/TodoListContext";
import AddTodo from "../../views/AddTodo";
import { Priority, PriorityTypes, Sector, Todo } from "../../types/todo";

import ButtonX from "../../components/Button";

import { ButtonStyled, SearchBarStyled } from "./styles";
import FilterTodoList from "../../views/FilterTodoList";

export default function Home({ navigation }: { navigation: any }) {
  const { todoList, sectorList, initialize, findSectorById } = useTodoList();

  useEffect(() => {
    initialize();
  }, []);

  const [todoListFiltered, setTodoListFiltered] = useState(JSON.parse(JSON.stringify(todoList)) as Todo[]);
  useEffect(() => {
    setTodoListFiltered(JSON.parse(JSON.stringify(todoList)) as Todo[]);
  }, [todoList]);

  const filterTodoListByName = (text: string) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as Todo[];

    if (text === "") {
      setTodoListFiltered(todoListCopy);
      return;
    }
    setTodoListFiltered(todoListCopy.filter((todo) => todo.name.toLowerCase().includes(text.toLowerCase())));
  };

  const [sectorSelectionList, setSectorSelectionList] = useState([] as (Sector & { selected: boolean })[]);
  useEffect(() => {
    let sectorSelectionListTemp = sectorList.map((sector) => {
      return { ...sector, selected: false };
    });

    setSectorSelectionList(sectorSelectionListTemp);
  }, [sectorList]);
  const handleSectorSelection = (sectorIndex: number) => {
    let sectorSelectionListCopy = JSON.parse(JSON.stringify(sectorSelectionList)) as (Sector & { selected: boolean })[];
    sectorSelectionListCopy[sectorIndex].selected = !sectorSelectionListCopy[sectorIndex].selected;
    setSectorSelectionList(sectorSelectionListCopy);
  };

  const [prioritySelectionList, setPrioritySelectionList] = useState(
    PriorityTypes.map((priority) => {
      return { priority: priority, selected: false } as { priority: Priority; selected: boolean };
    })
  );
  const handlePrioritySelection = (priorityIndex: number) => {
    let prioritySelectionListCopy = JSON.parse(JSON.stringify(prioritySelectionList)) as {
      priority: Priority;
      selected: boolean;
    }[];
    prioritySelectionListCopy[priorityIndex].selected = !prioritySelectionListCopy[priorityIndex].selected;
    setPrioritySelectionList(prioritySelectionListCopy);
  };

  const filterTodoListByTag = () => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as Todo[];

    let selectedSectors = sectorSelectionList.filter((sector) => sector.selected);
    let selectedPriorities = prioritySelectionList.filter((priority) => priority.selected);

    if (selectedSectors.length + selectedPriorities.length === 0) {
      setTodoListFiltered(todoListCopy);
      return;
    }

    todoListCopy = todoListCopy.filter((todo) => {
      let sectorCheck = false;
      let priorityCheck = false;
      selectedSectors.map((sector) => {
        if (sector.id === todo.sectorId) {
          sectorCheck = true;
        }
      });

      selectedPriorities.map((priority) => {
        if (priority.priority === todo.priority) {
          priorityCheck = true;
        }
      });

      return sectorCheck || priorityCheck;
    });

    console.log(todoListCopy);

    setTodoListFiltered(todoListCopy);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [isModal3Visible, setIsModal3Visible] = useState(false);

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
        <Text style={{ color: "white" }}>Cabeça</Text>
        <Button onPress={() => setIsModal2Visible(true)} title="button"></Button>
      </View>

      {/* Main Section */}
      <View style={styles.textInputArea}>
        <SearchBarStyled placeholder="Procurar" onChangeText={(text) => filterTodoListByName(text)}></SearchBarStyled>
      </View>
      <View style={styles.filterInputArea}>
        <Button onPress={() => setIsModal3Visible(true)} title="button"></Button>
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
        <ButtonX onPress={() => setIsModalVisible(true)}> Meme </ButtonX>
      </View>

      {/* AddTodo Modal */}
      <ReactNativeModal
        style={{ marginHorizontal: 0, marginBottom: 0, marginTop: 180 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
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
        onBackdropPress={() => setIsModal2Visible(false)}
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

      {/* FilterTodoList Modal */}
      <ReactNativeModal
        style={{ marginVertical: 180, marginHorizontal: 30 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropTransitionOutTiming={0}
        isVisible={isModal3Visible}
        onBackButtonPress={() => setIsModal3Visible(false)}
        onBackdropPress={() => setIsModal3Visible(false)}
      >
        <FilterTodoList
          sectorSelectionList={sectorSelectionList}
          handleSectorSelection={handleSectorSelection}
          prioritySelectionList={prioritySelectionList}
          handlePrioritySelection={handlePrioritySelection}
          handleSubmit={filterTodoListByTag}
        ></FilterTodoList>
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
    backgroundColor: "#055BCE",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
    maxHeight: 60,
  },
  textInputArea: {
    height: 80,
    alignItems: "center",
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
