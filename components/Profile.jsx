import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getUserData } from "../utils/pullUserInfo";
import { useEffect, useState, useContext } from "react";
import UserPerchAlerts from "./UserPerchAlerts";
import { UserContext } from "../utils/UserContext";
import { styles } from "../styles/style.js";

let width = Dimensions.get("window").width;

export default Profile = ({ navigation }) => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    // console.log(globalUser)
    setUser({
      userId: globalUser.userId,
      first_name: globalUser.first_name,
      last_name: globalUser.last_name,
      location: globalUser.location,
      username: globalUser.username,
      profile_image_url: globalUser.profile_image_url,
      perch_list: [...globalUser.perch_list],
    });
  }, [globalUser]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Profile</Text>
        </View>
      <View style={styles.horizontalBorderedContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                user.profile_image_url ||
                "https://picsum.photos/200/200?grayscale",
            }}
            style={styles.imagePreview}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.horizontalContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Username:</Text>
              <Text style={styles.text}>Forename:</Text>
              <Text style={styles.text}>Surname:</Text>
              <Text style={styles.text}>Region:</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{user.username}</Text>
              <Text style={styles.text}>{user.first_name}</Text>
              <Text style={styles.text}>{user.last_name}</Text>
              <Text style={styles.text}>{user.location}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconContainer}
            onPress={() => {navigation.navigate("Settings");}} title="Settings"
            >
              <Image source={require("../assets/Settings.png")} style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>
      <UserPerchAlerts
        birds={user.perch_list}
        user={user}
        navigation={navigation}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     backgroundColor: "#AAC0AA",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//   },
//   textStyling: {
//     fontFamily: "Virgil",
//     fontSize: 16,
//     color: "#344055",
//   },

//   userInfocontainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   profilePic: {
//     width: 100,
//     height: 100,
//     aspectRatio: 1,
//     borderRadius: 10,
//   },
//   userInfo: {
//     marginLeft: 20,
//   },
//   userSights: {
//     width: 60,
//     height: 60,
//     backgroundColor: "red",
//     margin: 8,
//   },
//   perchAlerts: {
//     marginTop: 10,
//     width: width,
//     flex: 1,
//     flexDirection: "row",
//   },
//   userSettings: {
//     marginTop: 1,
//     marginBottom: 1,
//   },
//   image: {
//     width: 40,
//     height: 40,
//   },
// });
