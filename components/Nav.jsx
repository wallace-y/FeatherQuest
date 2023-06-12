import React from 'react'
import { StyleSheet, Text, View } from "react-native";


 function Nav() {
    return (
        <View styles={styles.container}>
          <Text>Nav</Text>
     
            <Text>
                User Profile
            </Text>
      
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    });

export default Nav