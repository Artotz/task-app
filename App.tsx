import { TodoListProvider } from "./data/TodoListContext";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import SectorPage from "./pages/Sectors";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <TodoListProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SectorPage" component={SectorPage} options={{ animation: "slide_from_left" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoListProvider>
  );
}
