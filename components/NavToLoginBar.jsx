import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";


export default NavToLoginBar = ({ navigation }) => {
  const route = useRoute();

  return (
    <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}
          title="LoginScreen"
          style={[
            styles.navBar,
          ]}
        >  
          <Image
            source={require("../assets/Profile.png")}
            style={styles.image}
          />
            <Text style={styles.text}> Back to LogIn Page</Text>
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  navContainer: {
    marginTop: "10%",
    width: "100%",
    backgroundColor: "#AAC0AA",
  },
  navBar: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: 'center'
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
  },
  activeButton: {
    borderWidth: 3,
    borderColor: "#736372",
    backgroundColor: "rgba(161,130,118,0.5)",
    borderRadius: 10,
  },
  text: {
    alignSelf: 'center',
    fontFamily:'Virgil',
    fontSize: 20,
    fontWeight: 'bold',
    
    
  },
});
