import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Create, Home, Resolutions, Achievements } from "./screens";
import { LoadAssets } from "./components";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <LoadAssets>
      <NavigationContainer>
        <StatusBar style={"light"} />
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <MainStack.Screen name="Home" component={Home} />
          <MainStack.Screen name="Resolutions" component={Resolutions} />
          <MainStack.Screen name="Create" component={Create} />
          <MainStack.Screen name="Achievements" component={Achievements} />
        </MainStack.Navigator>
      </NavigationContainer>
    </LoadAssets>
  );
}
