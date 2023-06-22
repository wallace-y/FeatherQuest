import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles, textStyles } from "../styles/style.js";

export default CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={textStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};