import { auth } from "../firebaseConfig";
import { UserContext } from "../utils/UserContext";
import { getUserData } from "../utils/pullUserInfo";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, BackHandler } from "react-native";

import { getUserLocation } from "../utils/getUserLocation";

import { styles } from '../styles/style.js'


export default HomePage = ({ navigation, route }) => {

  const { globalUser, setGlobalUser } = useContext(UserContext)
  const [ loadingUser, setLoadingUser ] = useState(true)
  const [ userLocation, setUserLocation ] = useState([0,0])
  const [loadingUserLocation, setLoadingUserLocation ] = useState(true)

  

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () =>  true )

    getUserLocation().then((location) => {
      setUserLocation([...location])
      setLoadingUserLocation(false);
    })

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
          coordinates: [...userLocation]
        });
        setLoadingUser(false)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loadingUserLocation]);
  if(loadingUser){
    return (
      <View styles={styles.container}>
          <Text> Loading...</Text>
      </View>
    )
  }
  return (
    <View style={styles.pageContainer}>
      <View style={styles.centeredContainer}> 
        <Text style={styles.titleText}>Welcome, { globalUser.username || globalUser.first_name || "User"} </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("SightingList");}}>
            <Text style={styles.buttonText}>Start Twitching!</Text>
          </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};
