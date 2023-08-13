import { useState } from "react";
import { Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import ReactNativeModal from "react-native-modal";

import useTodoList from "../../data/TodoListContext";

export default function Home() {
  const { todoList, findSectorById } = useTodoList();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Cabeça</Text>
        <Button onPress={() => setIsModal2Visible(true)} title="button"></Button>
      </View>
      <View style={styles.textInputArea}>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <View style={styles.filterInputArea}>
        <Button title="button"></Button>
        <Button title="button"></Button>
      </View>
      <View style={styles.listArea}>
        <FlatList
          data={todoList}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>
                {item.name} setor: {findSectorById(item.sectorId)?.name}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.addButton}>
        <Button onPress={() => setIsModalVisible(true)} title="button"></Button>
      </View>
      <ReactNativeModal
        style={{ marginHorizontal: 0, marginBottom: 0, marginTop: 180 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>Adicionar Tarefa</Text>
            <Button onPress={() => setIsModalVisible(false)} title="button"></Button>
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
            <View>
              <Text>Nome</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View>
              <Text>Descrição (opcional)</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ paddingHorizontal: 20 }}>
                <Text>Data limite</Text>
                <TextInput style={styles.textInput}></TextInput>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text>Setor</Text>
                <TextInput style={styles.textInput}></TextInput>
              </View>
            </View>
            <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ paddingHorizontal: 20 }}>
                <Text>Prioridade</Text>
                <TextInput style={styles.textInput}></TextInput>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text>Status</Text>
                <TextInput style={styles.textInput}></TextInput>
              </View>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: "row",
              }}
            >
              <Button title="Cancelar"></Button>
              <View style={{ width: 50 }}></View>
              <Button title="Salvar"></Button>
            </View>
          </View>
        </View>
      </ReactNativeModal>
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
            <Button title="button"></Button>
          </View>
          <View style={{ padding: 10 }}>
            <Button title="button"></Button>
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
});
