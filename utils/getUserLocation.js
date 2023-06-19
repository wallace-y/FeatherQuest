import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';



async function getUserLocation () {
    console.log('in function');
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
try {
    const dynamicLocation = await Location.getCurrentPositionAsync({})
    return [dynamicLocation.coords.latitude, dynamicLocation.coords.longitude];
} catch {
console.log(err);
} finally {
    // return dynamicLocation;
    console.log('im function');
}

};

    // console.log(globalUser);
    // console.log(location.coords.latitude);
    // console.log('in user locatin logic');
export { getUserLocation }