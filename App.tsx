import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./src/navigations";

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
