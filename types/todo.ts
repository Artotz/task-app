export type Todo = {
  name: string;
  description?: string;
  dueDate: Date;
  sector: string;
  priority: Priority;
  status: Status;
};

export type TodoList = Todo[];

export type Priority = "Alta" | "Média" | "Baixa";

export type Status = "Concluída" | "Em andamento" | "Pendente";
