import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default HomePage = ({ navigation }) => {
  return (
    <View styles={styles.container}>
      <Text>This is the home page....</Text>
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
        title="Profile"
      />
      <Button
        onPress={() => {
          navigation.navigate("Map");
        }}
        title="Map"
      />
      <Button
        onPress={() => {
          navigation.navigate("Species");
        }}
        title="Species"
      />
      <Button
        onPress={() => {
          navigation.navigate("Settings");
        }}
        title="Settings"
      />
      <Button
        onPress={() => {
          navigation.navigate("Sightings");
        }}
        title="Post sighting"
      />
      <Button
        onPress={() => {
          navigation.navigate("SightingList");
        }}
        title="View sightings"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
