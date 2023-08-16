import { useCallback, useEffect, useState } from "react";
import { BackHandler, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

import useTodoList from "../../data/TodoListContext";
import AddTodo from "../../views/AddTodo";
import { Priority, PriorityTypes, Sector, Todo } from "../../types/todo";

import { ButtonStyled, SearchBarStyled } from "./styles";
import FilterTodoList from "../../views/FilterTodoList";
import { Picker } from "@react-native-picker/picker";

export default function Home({ navigation }: { navigation: any }) {
  const { todoList, sectorList, initialize, findSectorById } = useTodoList();

  useEffect(() => {
    initialize();
  }, []);

  const [todoListFiltered, setTodoListFiltered] = useState(JSON.parse(JSON.stringify(todoList)) as Todo[]);
  useEffect(() => {
    setTodoListFiltered(JSON.parse(JSON.stringify(todoList)) as Todo[]);
  }, [todoList]);

  const filterTodoListByName = (todoListToFilter: Todo[], text: string) => {
    //let todoListCopy = JSON.parse(JSON.stringify(todoListFiltered)) as Todo[];

    setSearchBarText(text);

    if (text === "") {
      //setTodoListFiltered(todoListCopy);
      return todoListToFilter;
    }

    //setTodoListFiltered(todoListCopy.filter((todo) => todo.name.toLowerCase().includes(text.toLowerCase())));
    return todoListToFilter.filter((todo) => todo.name.toLowerCase().includes(text.toLowerCase()));
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

  const filterTodoListByTag = (todoListToFilter: Todo[]) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoListToFilter)) as Todo[];

    let selectedSectors = sectorSelectionList.filter((sector) => sector.selected);
    let selectedPriorities = prioritySelectionList.filter((priority) => priority.selected);

    if (selectedSectors.length + selectedPriorities.length === 0) {
      //setTodoListFiltered(todoListCopy);
      return todoListToFilter;
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

    return todoListCopy;
    //setTodoListFiltered(todoListCopy);
  };

  const filterTodoList = (text?: string) => {
    if (text == undefined) setTodoListFiltered(filterTodoListByTag(filterTodoListByName(todoList, searchBarText)));
    else setTodoListFiltered(filterTodoListByTag(filterTodoListByName(todoList, text)));
  };

  const sortTodoList = (itemValue: string) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoListFiltered)) as Todo[];

    setSortOption(itemValue);

    todoListCopy.sort((a, b) => {
      if (PriorityTypes.indexOf(a.priority) > PriorityTypes.indexOf(b.priority)) return -1;
      if (PriorityTypes.indexOf(a.priority) > PriorityTypes.indexOf(b.priority)) return 1;
      else return 0;
    });

    setTodoListFiltered(todoListCopy);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [isModal3Visible, setIsModal3Visible] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const [sortOption, setSortOption] = useState("Prioridade");

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
        <SearchBarStyled placeholder="Procurar" onChangeText={(text) => filterTodoList(text)}></SearchBarStyled>
      </View>
      <View style={styles.filterInputArea}>
        <Button onPress={() => setIsModal3Visible(true)} title="button"></Button>
        <Picker
          selectedValue={sortOption}
          onValueChange={(itemValue, itemIndex) => sortTodoList(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item key={"0"} label={"Prioridade"} value={"Prioridade"} color="#000" />
          <Picker.Item key={"1"} label={"Data Limite"} value={"Data Limite"} color="#000" />
        </Picker>
      </View>
      <View style={styles.listArea}>
        <FlatList
          data={todoListFiltered}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>
                {item.name} setor: {findSectorById(item.sectorId)?.name}
              </Text>
              <Text>
                {item.dueDate} prioridade: {item.priority}
              </Text>
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
          handleSubmit={() => {
            filterTodoList();
            setIsModal3Visible(false);
          }}
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
  picker: {
    backgroundColor: "#DDD",
    width: 170,
  },
});
