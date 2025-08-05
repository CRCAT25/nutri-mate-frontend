import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./src/navigations";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
