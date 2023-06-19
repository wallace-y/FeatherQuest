import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import { UserContext } from '../../utils/UserContext';

export default GetUserLocation = ({userLocation, setUserLocation}) => {
//   const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [loadingLocation, setLoadingLocatin] = useState(true);


  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({})
      new Promise.all([location]).then(() =>{
        console.log('in promise');
        setUserLocation(location);
        setUserLocation([location.coords.latitude, location.coords.longitude])
        setLoadingLocatin(false);
        
        console.log(globalUser);
        setGlobalUser((currUser) => {
          return {
            userId: currUser.userId,
            first_name: currUser.first_name,
            last_name: currUser.last_name,
            location: currUser.location,
            username: currUser.username,
            profile_image_url: currUser.profile_image_url,
            perch_list: [...currUser.perch_list],
            coordinates:[userLocation]
          };
        });
      })
    // console.log(globalUser);
    // console.log(location.coords.latitude);
    // console.log('in user locatin logic');

    })();
  }, []);




  return (
    
    <View style={styles.container}>
 
      <Text style={styles.paragraph}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});


