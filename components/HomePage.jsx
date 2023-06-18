import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { getUserData } from "../utils/pullUserInfo";
import SightingList from "./SightingList";

export default HomePage = ({ navigation }) => {

  const user = auth.currentUser;
  const {globalUser, setGlobalUser} = useContext(UserContext)
  const [ loadingUser, setLoadingUse ] = useState(true)

  useEffect(() => {
    getUserData(auth.currentUser.uid)
      .then((data) => {
        setGlobalUser({
          userId: auth.currentUser.uid,
          first_name: data.first_name,
          last_name: data.last_name,
          location: data.location,
          username: data.screen_name,
          profile_image_url: data.profile_image_url,
          perch_list: [...data.perch_list],
        });
        setLoadingUse(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Prevent going back to login screen
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
  },)

  if(loadingUser){
    return (
      <View styles={styles.container}>

      </View>
    )
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome, { globalUser.username || globalUser.first_name || "User"} </Text>
      </TouchableOpacity>
        <Button 
          style={styles.button}
          color={"#AAC0AA"}
          onPress={() => {
            navigation.navigate("SightingList");
          }}
          title="Welcome"
        />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7A918D",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 40,
    color: "white"
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
