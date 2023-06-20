import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { navStyles } from '../styles/style.js'

export default NavToLoginBar = ({ navigation }) => {
  const route = useRoute();

  return (
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}
          title="LoginScreen"
          style={navStyles.navContainer}
        >  
          <Image
            source={require("../assets/Profile.png")}
            style={navStyles.image}
          />
            <Text style={navStyles.text}> Back to LogIn Page</Text>
        </TouchableOpacity>
  );
};

