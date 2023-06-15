import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseConfig";
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import { getUserData } from "../utils/pullUserInfo";

export default HomePage = ({ navigation }) => {
  const user = auth.currentUser;

  const {globalUser, setGlobalUser} = useContext(UserContext)

  useEffect(() => {
    getUserData(auth.currentUser.uid)
    .then((data) => {
      setGlobalUser({
        userId: auth.currentUser.uid,
        firstName: data.first_name,
        secondName: data.last_name,
        region: data.location,
        username: data.username,
        profilePic: data.profile_image_url,
        perchList: [...data.perch_list],
      })
  
    }).catch((err) => {
      console.log(err);
  
    })
  }, [])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View styles={styles.container}>

      {user ? null : (
        <Button
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
          title="Login"
        />
      )}

      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
        title="Profile"
      />
      <Button
        onPress={() => {
          navigation.navigate("Maps");
        }}
        title="Maps"
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
          navigation.navigate("Sighting");
        }}
        title="Post sighting"
      />
      <Button
        onPress={() => {
          navigation.navigate("SightingList");
        }}
        title="View sightings"
      />
            <Button
        onPress={() => {
          navigation.navigate("IdentifyBird");
        }}
        title="Identify"
      />

      {user && (
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
          <Text>Email: {user?.email}</Text>
        </TouchableOpacity>
      )}
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
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 100,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
