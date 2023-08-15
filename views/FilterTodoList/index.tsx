import { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Button } from "react-native";
import useTodoList from "../../data/TodoListContext";
import { Priority, PriorityTypes, Sector } from "../../types/todo";

type FilterTodoListProps = {
  sectorSelectionList: (Sector & { selected: boolean })[];
  handleSectorSelection: (sectorIndex: number) => void;
  prioritySelectionList: { priority: Priority; selected: boolean }[];
  handlePrioritySelection: (priorityIndex: number) => void;
  handleSubmit: () => void;
};

export default function FilterTodoList(props: FilterTodoListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white" }}>Cabeça</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text>Setor:</Text>
          {props.sectorSelectionList.map((sector, index) => (
            <TouchableOpacity
              key={sector.id}
              style={styles.listItem}
              onPress={() => {
                props.handleSectorSelection(index);
              }}
            >
              <Text>
                {sector.name} selecionado: {sector.selected.toString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text>Priority:</Text>
          {props.prioritySelectionList.map((priority, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              onPress={() => {
                props.handlePrioritySelection(index);
              }}
            >
              <Text>
                {priority.priority} selecionado: {priority.selected.toString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Button onPress={props.handleSubmit} title="button"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  listItem: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#AAA",
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
});
