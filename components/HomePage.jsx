import { auth } from "../firebaseConfig";
import { UserContext } from "../utils/UserContext";
import { getUserData } from "../utils/pullUserInfo";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { styles, textStyles } from '../styles/style.js'

export default HomePage = ({ navigation, route }) => {

  const { globalUser, setGlobalUser } = useContext(UserContext)
  const [ loadingUser, setLoadingUser ] = useState(true)

  

  useEffect(() => {
    /* This prevents navigation by phone buttons on all pages, 
      but fixes the problem of signout button not nagiating back to LoginScreen */
    BackHandler.addEventListener('hardwareBackPress', () =>  true )

    if(auth.currentUser){
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
        setLoadingUser(false)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [auth.currentUser]);

  if(loadingUser){
    return (
      <View styles={styles.pageContainer}>
          <Text style={textStyles.loadingText}> Loading...</Text>
      </View>
    )
  }
  return (
    <View style={styles.pageContainer}>
      <View style={styles.centeredContainer}> 
        <Text style={textStyles.titleText}>Welcome, { globalUser.username || globalUser.first_name || "User"} </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("SightingList");}}>
            <Text style={textStyles.buttonText}>Start Twitching!</Text>
          </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};
