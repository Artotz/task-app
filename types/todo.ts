export type Todo = {
  id: string;
  name: string;
  description?: string;
  dueDate: Date;
  sectorId: Sector["id"];
  priority: Priority;
  status: Status;
};

export type Sector = { id: string; name: string; color: string };

export type Priority = "Alta" | "Média" | "Baixa";

export type Status = "Concluída" | "Em andamento" | "Pendente";
