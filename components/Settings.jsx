import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default Settings = ({ navigation }) => {
  return (
    <View styles={styles.container}>
      <Text>Settings page can go here...</Text>
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
