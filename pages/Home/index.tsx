import { useCallback, useEffect, useState } from "react";
import { BackHandler, FlatList, Keyboard, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import useTodoList from "../../data/TodoListContext";
import AddTodo from "../../views/AddTodo";
import { Priority, PriorityTypes, Sector, Todo } from "../../types/todo";

import IconButton from "../../components/IconButton";
import FilterTodoList from "../../views/FilterTodoList";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import Searchbar from "../../components/Searchbar";
import Button from "../../components/Button";
import Card from "../../components/Card";

import * as S from "./styles";
import TreeItem from "../../components/TreeItem";

export default function Home({ navigation }: { navigation: any }) {
  const { todoList, sectorList, initialize, findSectorById } = useTodoList();

  // SideEffetcs
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

  // Form Logic
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

  const sortTodoList = (itemIndex: number) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoListFiltered)) as Todo[];
    let sortOptionsCopy = JSON.parse(JSON.stringify(sortOptions));

    if (itemIndex === 1) {
      if (itemIndex === sortOptionsCopy.selected) sortOptionsCopy.priority *= -1;
      sortOptionsCopy.dueDate = 1;
    } else if (itemIndex === 2) {
      sortOptionsCopy.priority = 1;
      if (itemIndex === sortOptionsCopy.selected) sortOptionsCopy.dueDate *= -1;
    }

    if (itemIndex === 1) {
      todoListCopy.sort((a, b) => {
        if (PriorityTypes.indexOf(a.priority) > PriorityTypes.indexOf(b.priority)) return sortOptionsCopy.priority;
        if (PriorityTypes.indexOf(a.priority) < PriorityTypes.indexOf(b.priority)) return -sortOptionsCopy.priority;
        else return 0;
      });
      sortOptionsCopy.label = sortOptionsCopy.priority === 1 ? "Prioridade ⬆" : "Prioridade ⬇";
    } else if (itemIndex === 2) {
      todoListCopy.sort((a, b) => {
        if (a.dueDate > b.dueDate) return sortOptionsCopy.dueDate;
        if (a.dueDate < b.dueDate) return -sortOptionsCopy.dueDate;
        else return 0;
      });
      sortOptionsCopy.label = sortOptionsCopy.dueDate === -1 ? "Data Limite ⬆" : "Data Limite ⬇";
    }

    sortOptionsCopy.selected = itemIndex;
    console.log(sortOptionsCopy);

    setSortOptions(sortOptionsCopy);

    setTodoListFiltered(todoListCopy);
  };

  // Modal Logic
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [isModal3Visible, setIsModal3Visible] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const [sortOptions, setSortOptions] = useState({ priority: 1, dueDate: 1, selected: -1, label: "Ordenar..." });

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
    <S.Root style={styles.container}>
      <Header title="Meu Quadro" hamburgerFunction={() => setIsModal2Visible(true)} />

      {/* Main Section */}

      {/* Searchbar Component */}
      <View style={styles.textInputArea}>
        <Searchbar placeholder="Procurar" onChangeText={(text) => filterTodoList(text)} />
      </View>

      {/* Filters */}
      <View style={styles.filterInputArea}>
        <Button onPress={() => setIsModal3Visible(true)}>Filtrar</Button>
        <Picker onValueChange={(itemValue, itemIndex) => sortTodoList(itemIndex)} style={styles.picker} mode="dropdown">
          <Picker.Item key={"0"} label={sortOptions.label} value={-1} color="#777" enabled={false} />
          <Picker.Item key={"1"} label={"Prioridade"} value={0} color="#000" />
          <Picker.Item key={"2"} label={"Data Limite"} value={1} color="#000" />
        </Picker>
      </View>

      {/* Items List */}
      <View style={styles.listArea}>
        <FlatList
          data={todoListFiltered}
          renderItem={({ item }) => (
            <Card
              style={{
                elevation: 3,
                shadowColor: "#777",
              }}
              color={findSectorById(item.sectorId)?.color || "#333"}
            >
              <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between", gap: 80 }}>
                <Text>{item.name}</Text>
                <Text>{new Date(item.dueDate).toLocaleDateString()}</Text>
                <TouchableOpacity onPress={() => console.log(item)}>
                  <Ionicons size={20} name="information-circle" />
                </TouchableOpacity>
              </View>
              <Text>{item.description}</Text>
              <Text style={{ fontSize: 10 }}>
                {findSectorById(item.sectorId) ? findSectorById(item.sectorId)?.name : "Setor não encontrado"} /{" "}
                {item.priority} prioridade / {item.status}
              </Text>
            </Card>
          )}
        />
      </View>

      {/* Floating Add Button */}
      <View style={styles.addButton}>
        <IconButton
          style={{
            elevation: 5,
            shadowColor: "#000",
          }}
          icon="add-sharp"
          onPressIn={() => setIsModalVisible(true)}
        />
      </View>

      {/* AddTodo Modal */}
      <ReactNativeModal
        style={{
          marginHorizontal: 0,
          marginVertical: 0,
        }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        onModalWillHide={Keyboard.dismiss}
        coverScreen={true}
      >
        <View style={{ flex: 1 }}></View>
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
          <Header title="Task App" closeFunction={() => setIsModal2Visible(false)} />
          <TreeItem
            title="Tarefas"
            icon="checkmark-circle"
            onPress={() => {
              setIsModal2Visible(false);
              navigation.navigate("Home");
            }}
          >
            Visualize e adicione tarefas
          </TreeItem>
          <TreeItem
            title="Setores"
            icon="list-circle"
            onPress={() => {
              setIsModal2Visible(false);
              navigation.navigate("SectorPage");
            }}
          >
            Visualize e cadastre setores
          </TreeItem>
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
    </S.Root>
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
    flex: 0,
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
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: 10,
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
    width: 190,
  },
});
