import { ThemeProvider } from "styled-components/native";

import { TodoListProvider } from "./data/TodoListContext";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import SectorPage from "./pages/Sectors";
import { theme } from "./styles/theme";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <TodoListProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SectorPage" component={SectorPage} options={{ animation: "slide_from_left" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </TodoListProvider>
    </ThemeProvider>
  );
}
