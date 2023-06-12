import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Nav from "./Nav";
import { getData } from "../utils/pullUserInfo";
import { getUserData } from "../utils/pullUserInfo";
import { useEffect, useState } from "react";
import { pullBirdData } from "../utils/pullBirds";


let width = Dimensions.get("window").width;

const imageURI = 'https://i.imgur.com/JrpCpfs.png';



export default Profile = ({ navigation }) => {
  const [user, setUser] = useState({})


  

useEffect(() => {
  getUserData().then((data) => {
    const perchAlert = [];
    data[0].perch_list.arrayValue.values.forEach(birdId => {
      perchAlert.push(birdId.integerValue)
    })
    setUser({
      firstName: data[0].first_name.stringValue,
      secondName: data[0].last_name.stringValue,
      region: data[0].location.stringValue,
      username: data[0].first_name.stringValue,
      profilePic: data[0].profile_image_url.stringValue,
      perchList: perchAlert,
    })
    // console.log(data[0]);
  }).catch((err) => {
    console.log(err);
  })
}, [])

  return (
    <View style={styles.container}>
      <Nav />
      <View style={styles.userInfocontainer}>


      <Image source={{uri: user.profilePic}} style={styles.profilePic} />
      <View style={styles.userInfo}>
        <Text>Forename - {user.firstName}</Text>
        <Text>Surname - {user.secondName}</Text>
        <Text>Region - {user.region}</Text>
        <Text>Username - {user.firstName}e</Text>
      </View>
      </View>

      <View style={styles.perchAlerts}>
        <Text>Perch Alerts</Text>
        <Image source={require('../assets/bird-png.png')} style={styles.userSights} />
        <Image source={require('../assets/bird-png.png')} style={styles.userSights} />
        <Image source={require('../assets/bird-png.png')} style={styles.userSights} />
        <Image source={require('../assets/bird-png.png')} style={styles.userSights} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#A9C0AA",
    alignItems: "center",
    justifyContent: "center",
    height: '100%'

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
    width: 80, 
    height: 80,
    aspectRatio: 1,
    padding: 10,
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


