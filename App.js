import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./components/HomePage.jsx";
import Map from "./components/Map.jsx";
import Profile from "./components/Profile.jsx";
import Settings from "./components/Settings.jsx";
import Sighting from "./components/Sighting.jsx";
import SightingList from "./components/SightingList.jsx";
import Species from "./components/Species.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HomePage}
          options={{ title: "HomePage" }}
        />
        <Stack.Screen name="Map" component={Map} options={{ title: "Map" }} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="Sighting"
          component={Sighting}
          options={{ title: "Sighting" }}
        />
        <Stack.Screen
          name="SightingList"
          component={SightingList}
          options={{ title: "SightingList" }}
        />
        <Stack.Screen
          name="Species"
          component={Species}
          options={{ title: "Species" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
