import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";


export default NavigationBar = ({ navigation }) => {
  const route = useRoute();

  return (
    <View style={styles.navContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SightingList");
          }}
          title="SightingList"
          style={[
            styles.imageContainer,
            route.name === "SightingList" && styles.activeButton,
          ]}
        >
          <Image
            source={require("../assets/HomeButton.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Species");
          }}
          title="Species"
          style={[
            styles.imageContainer,
            route.name === "Species" && styles.activeButton,
          ]}
        >
          <Image
            source={require("../assets/SpeciesButton.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PostSighting");
          }}
          title="Sighting"
          style={[
            styles.imageContainer,
            route.name === "PostSighting" && styles.activeButton,
          ]}
        >
          <Image
            source={require("../assets/PostSightingButton.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Maps");
          }}
          title="Maps"
          style={[
            styles.imageContainer,
            route.name === "Maps" && styles.activeButton,
          ]}
        >
          <Image
            source={require("../assets/MapButton.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
          title="Profile"
          style={[
            styles.imageContainer,
            route.name === "Profile" && styles.activeButton,
          ]}
        >
          <Image
            source={require("../assets/Profile.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  navContainer: {
    marginTop: 28,
    width: "100%",
    backgroundColor: "#AAC0AA",
  },
  navBar: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
});
