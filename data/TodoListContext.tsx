import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Sector, Todo } from "../types/todo";

type ContextValues = {
  todoList: Todo[];
  sectorList: Sector[];
  initialize: () => void;
  addTodo: (todo: Omit<Todo, "id">) => void;
  editTodo: (todo: Omit<Todo, "id">, id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  addSector: (sector: Omit<Sector, "id">) => void;
  deleteSector: (id: Sector["id"]) => void;
  findSectorById: (id: Sector["id"]) => Sector | undefined;
};

const TodoListContext = createContext({} as ContextValues);

export function TodoListProvider({ children }: { children: any }) {
  const [todoList, setTodoList] = useState<ContextValues["todoList"]>([]);
  const [sectorList, setSectorList] = useState<ContextValues["sectorList"]>([]);

  const initialize: ContextValues["initialize"] = async () => {
    const storedTodoList = JSON.parse((await AsyncStorage.getItem("todoList")) || "[]") as ContextValues["todoList"];
    setTodoList(storedTodoList);

    const storedSectorList = JSON.parse(
      (await AsyncStorage.getItem("sectorList")) || "[]"
    ) as ContextValues["sectorList"];
    setSectorList(storedSectorList);
  };

  const addTodo: ContextValues["addTodo"] = (todo) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as ContextValues["todoList"];

    todoListCopy.push({
      ...todo,
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, "0"),
    });

    console.log(todoListCopy[todoListCopy.length - 1].id);

    setTodoList(todoListCopy);
    AsyncStorage.setItem("todoList", JSON.stringify(todoListCopy));
  };

  const editTodo: ContextValues["editTodo"] = (todo, id) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as ContextValues["todoList"];

    todoListCopy = todoListCopy.filter((todo) => todo.id !== id);
    todoListCopy.push({ ...todo, id });

    setTodoList(todoListCopy);
    AsyncStorage.setItem("todoList", JSON.stringify(todoListCopy));
  };

  const deleteTodo: ContextValues["deleteTodo"] = (id) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as ContextValues["todoList"];

    todoListCopy = todoListCopy.filter((todo) => todo.id !== id);

    setTodoList(todoListCopy);
    AsyncStorage.setItem("todoList", JSON.stringify(todoListCopy));
  };

  const addSector: ContextValues["addSector"] = (sector) => {
    let sectorListCopy = JSON.parse(JSON.stringify(sectorList)) as ContextValues["sectorList"];

    sectorListCopy.push({
      ...sector,
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, "0"),
    });

    console.log(sectorListCopy[sectorListCopy.length - 1].id);

    setSectorList(sectorListCopy);
    AsyncStorage.setItem("sectorList", JSON.stringify(sectorListCopy));
  };

  const deleteSector: ContextValues["deleteSector"] = (id) => {
    let sectorListCopy = JSON.parse(JSON.stringify(sectorList)) as ContextValues["sectorList"];

    sectorListCopy = sectorListCopy.filter((sector) => sector.id !== id);

    setSectorList(sectorListCopy);
    AsyncStorage.setItem("sectorList", JSON.stringify(sectorListCopy));
  };

  const findSectorById: ContextValues["findSectorById"] = (id) => {
    let sectorListCopy = JSON.parse(JSON.stringify(sectorList)) as ContextValues["sectorList"];
    let sector = sectorListCopy.find((sector) => sector.id === id);
    return sector;
  };

  return (
    <TodoListContext.Provider
      value={
        {
          todoList,
          sectorList,
          initialize,
          addTodo,
          editTodo,
          deleteTodo,
          addSector,
          deleteSector,
          findSectorById,
        } as ContextValues
      }
    >
      {children}
    </TodoListContext.Provider>
  );
}

const useTodoList = () => useContext(TodoListContext);
export default useTodoList;
