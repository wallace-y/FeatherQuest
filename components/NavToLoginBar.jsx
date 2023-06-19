import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";


export default NavToLoginBar = ({ navigation }) => {
  const route = useRoute();

  return (
    // <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}
          title="LoginScreen"
          style={styles.navContainer}
        >  
          <Image
            source={require("../assets/Profile.png")}
            style={styles.image}
          />
            <Text style={styles.text}> Back to LogIn Page</Text>
        </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    marginTop: "10%",
    height: 60,
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "#AAC0AA",
    

  },
  image: {
    width: 60,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: 'center',
    fontFamily:'Virgil',
    fontSize: 20,
  },
});
