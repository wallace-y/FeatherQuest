import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from "react-native";
import { pullBirdsById } from '../utils/pullBirdsById';
let width = Dimensions.get("window").width;


 function UserPerchAlerts({birds, user}) {
  const [userBird, setUserBird] = useState([]);

useEffect(() =>{

if(user.firstName){
  pullBirdsById(birds)
  .then((data) => {
      setUserBird([...data])
  })
}
}, [user])

  return (
    <View style={styles.perchAlerts}>
     
        <Text style={styles.textStyling}>Perch Alerts</Text>
        <View style={styles.ScrollViewContainer}>
        <ScrollView horizontal={true}>
    {
      userBird.map(bird=>{

        return (
        <View key={bird['id'] + bird["common_name"]}>  
        <Text style={styles.userSightingText}>{bird["common_name"]}</Text>
        <Image source={{uri: bird["bird_image_url"]}} style={styles.userSights} />
        </View>
        )
      })
      
    }
        </ScrollView>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  textStyling:{
   fontSize: 25,
   color: '#C7CCDB',
   top: 60,
  },
  userSightingText:{
    fontSize: 11,
    color: '#C7CCDB',
   textAlign: 'center',

  },

  ScrollViewContainer:{
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'blue',
    width: width,
    top: 140,

  },

  userSights: {
    width: 90,
    height: 90,
    backgroundColor: 'red',
    margin: 8,
    borderRadius: 10,
    
    // flexDirection: 'row',
    
  },
  perchAlerts: {

    backgroundColor: '#7A918D',
    width: width,
    flex: 1,
    alignItems: "center",
    top: 40,
    fontSize: '20px',
    fontWeight: 'bold',


  }
});

export default  UserPerchAlerts;