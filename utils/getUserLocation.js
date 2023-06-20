import { Platform, Text, View, StyleSheet } from 'react-native';
// import Device from 'expo-device';
import * as Device from 'expo-device';
import * as Location from 'expo-location';


async function getUserLocation () {
      if (Platform.OS === 'android' && !Device.isDevice) {
        console.log('this will not work on Snack in an Android Emulator. Try it on your device!');
     
       
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
try {
    const dynamicLocation = await Location.getCurrentPositionAsync({})
    return [dynamicLocation.coords.latitude, dynamicLocation.coords.longitude];
} catch (err) {
console.log(err);
} finally {
}
};
export { getUserLocation }