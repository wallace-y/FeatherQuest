import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { getUserData } from "../utils/pullUserInfo";
import { useEffect, useState, useContext } from "react";
import UserPerchAlerts from "./UserPerchAlerts";
import { auth } from "../firebaseConfig";
import { UserContext } from "../utils/UserContext";




let width = Dimensions.get("window").width;

export default Profile = ({ navigation }) => {
  const {globalUser, setGlobalUser} = useContext(UserContext)
  const [user, setUser] = useState({})

useEffect(() => {
    setUser({
      userId: globalUser.userId,
      first_name: globalUser.first_name,
      last_name: globalUser.last_name,
      location: globalUser.location,
      username: globalUser.username,
      profile_image_url: globalUser.profile_image_url,
      perch_list: [...globalUser.perch_list],
    })
}, [globalUser])
  return (
    <View style={styles.container}>
      <View style={styles.userInfocontainer}>
      <Image source={{uri: user.profile_image_url}} style={styles.profilePic} />
      <View style={styles.userInfo}>
        <Text style={styles.textStyling}>Forename - {user.first_name}</Text>
        <Text style={styles.textStyling}>Surname - {user.last_name}</Text>
        <Text style={styles.textStyling}>Region - {user.location}</Text>
        <Text style={styles.textStyling}>Username - {user.first_name}e</Text>
      </View>
      </View>
      <UserPerchAlerts birds = {user.perch_list} user={user} navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#AAC0AA",
    alignItems: "center",
    justifyContent: "center",
    height: '100%'

  },
  textStyling:{
    fontSize: 16,
    color: '#344055'
   },
 
  userInfocontainer: {
    // backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
    width: '90%',
    height: 200,
    top: 10,
  },
  profilePic: {
    position:'absolute',
    left: 20,
    width: 130, 
    height: 130,
    aspectRatio: 1,
    padding: 10,
    borderRadius: 10,
    // resizeMode: "contain",
  },
  userInfo: {
    // backgroundColor: 'red',
    position: 'absolute',
    width: 200,
    right: 20,
    
  },
  userSights: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    margin: 8,
    
    // flexDirection: 'row',
    
  },
  perchAlerts: {
    marginTop: 170,
    // backgroundColor: 'pink',
    width: width,
    flex: 1,
    flexDirection:'row', 
    // flexWrap:'wrap',

  }
});


