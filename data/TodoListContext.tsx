import { createContext, useContext, useState } from "react";
import { Sector, Todo } from "../types/todo";

type ContextValues = {
  todoList: Todo[];
  sectorList: Sector[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  editTodo: (todo: Omit<Todo, "id">, id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  addSector: (sector: Omit<Sector, "id">) => void;
  deleteSector: (id: Sector["id"]) => void;
  findSectorById: (id: Sector["id"]) => Sector | undefined;
};

const TodoListContext = createContext({} as ContextValues);

export function TodoListProvider({ children }: { children: any }) {
  const [todoList, setTodoList] = useState<ContextValues["todoList"]>([
    {
      id: "1",
      name: "nome",
      description: "descrição",
      dueDate: new Date(),
      sectorId: "1",
      priority: "Média",
      status: "Em andamento",
    },
    {
      id: "2",
      name: "nome2",
      description: "descrição2",
      dueDate: new Date(),
      sectorId: "2",
      priority: "Alta",
      status: "Pendente",
    },
  ]);
  const [sectorList, setSectorList] = useState<ContextValues["sectorList"]>([
    {
      id: "1",
      name: "sector nome",
      color: "#A00",
    },
    {
      id: "2",
      name: "sector nome2",
      color: "#0A0",
    },
  ]);

  const addTodo: ContextValues["addTodo"] = (todo) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as ContextValues["todoList"];

    todoListCopy.push({ ...todo, id: Date.now().toString() });

    setTodoList(todoListCopy);
  };

  const editTodo: ContextValues["editTodo"] = (todo, id) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as ContextValues["todoList"];

    todoListCopy = todoListCopy.filter((todo) => todo.id !== id);
    todoListCopy.push({ ...todo, id });

    setTodoList(todoListCopy);
  };

  const deleteTodo: ContextValues["deleteTodo"] = (id) => {
    let todoListCopy = JSON.parse(JSON.stringify(todoList)) as ContextValues["todoList"];

    todoListCopy = todoListCopy.filter((todo) => todo.id !== id);

    setTodoList(todoListCopy);
  };

  const addSector: ContextValues["addSector"] = (sector) => {
    let sectorListCopy = JSON.parse(JSON.stringify(sectorList)) as ContextValues["sectorList"];

    sectorListCopy.push({ ...sector, id: Date.now().toString() });

    setSectorList(sectorListCopy);
  };

  const deleteSector: ContextValues["deleteSector"] = (id) => {
    let sectorListCopy = JSON.parse(JSON.stringify(sectorList)) as ContextValues["sectorList"];

    sectorListCopy = sectorListCopy.filter((sector) => sector.id !== id);

    setSectorList(sectorListCopy);
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
