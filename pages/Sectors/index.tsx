import { useState } from "react";
import { FlatList, TouchableOpacity, StatusBar, StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import ReactNativeModal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import useTodoList from "../../data/TodoListContext";
import AddSector from "../../views/AddSector";

import IconButton from "../../components/IconButton";
import FilterTodoList from "../../views/FilterTodoList";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import Searchbar from "../../components/Searchbar";
import Button from "../../components/Button";
import Card from "../../components/Card";

import * as S from "./styles";
import { theme } from "../../styles/theme";
import TreeItem from "../../components/TreeItem";

export default function SectorPage({ navigation }: { navigation: any }) {
  const { sectorList, deleteSector } = useTodoList();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);

  return (
    <S.Root style={styles.container}>
      {/* Header Component */}
      <Header title="Setores" hamburgerFunction={() => setIsModal2Visible(true)} />

      {/* Main Section */}

      <S.FormSection>
        <S.HeadingView>
          <S.Heading>Setores</S.Heading>
          <Text>Gerencie, visualize, exclua ou adicione setores para suas tarefas</Text>
        </S.HeadingView>
      </S.FormSection>
      <View style={styles.listArea}>
        <FlatList
          data={sectorList}
          renderItem={({ item }) => (
            <Card
              style={{
                elevation: 3,
                shadowColor: "#777",
              }}
              color={item.color}
            >
              <S.CardView>
                <Text style={{ fontSize: 16, fontWeight: "500", color: theme.colors.common["gray-400"] }}>
                  {item.name}
                </Text>
                <TouchableOpacity onPress={() => deleteSector(item.id)}>
                  <Ionicons size={20} name="trash" color={theme.colors.common["gray-300"]} />
                </TouchableOpacity>
              </S.CardView>
            </Card>
          )}
        />
      </View>

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

      {/* AddSector Modal */}
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
        <AddSector handleCloseButton={() => setIsModalVisible(false)} />
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
    backgroundColor: "#DAD",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
    maxHeight: 60,
  },
  innerHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginVertical: 10,
    backgroundColor: "#AAA",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
