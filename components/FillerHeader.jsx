import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { navStyles } from '../styles/style.js'

export default FillerHeader = () => {

    return (
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}
          title="LoginScreen"
          style={navStyles.fillerHeader}
        >  
         
        </TouchableOpacity>
  )
}