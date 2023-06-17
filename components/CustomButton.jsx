import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    backgroundColor: "#DCEED1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Virgil",
    textAlign: "center",
  },
});

export default CustomButton;
