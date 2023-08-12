import Home from "./pages/Home";
import { TodoListProvider } from "./data/TodoListContext";

export default function App() {
  return (
    <TodoListProvider>
      <Home />
    </TodoListProvider>
  );
}
