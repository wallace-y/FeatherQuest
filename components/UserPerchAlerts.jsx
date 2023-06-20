import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { pullBirdsById } from "../utils/pullBirdsById";
let width = Dimensions.get("window").width;
import { UserContext } from "../utils/UserContext";
import { styles } from "../styles/style.js"

function UserPerchAlerts({ birds, user, navigation }) {
  const [userBird, setUserBird] = useState([]);
  const { globalUser, setGlobalUser } = useContext(UserContext);

  useEffect(() => {
    if (user.userId) {
      if (birds.length !== 0) {
        pullBirdsById(birds)
          .then((data) => {
            setUserBird([...data]);
          })
          .catch((err) => {
            console.log("no birds");
          });
      } else {
        setUserBird([]);
      }
    }
  }, [user]);
  
  return (
    <View style={styles.verticalContainer}>
      <Text style={styles.textMedium}>Perch Alerts</Text>
      {/* <View style={styles.scrollViewHorizontal}> */}
        <ScrollView horizontal={true} style={styles.scrollViewHorizontal}>
          {userBird.length !== 0 ? (
            userBird.map((bird) => {
              return (
                <TouchableOpacity key={bird["id"] + bird["common_name"]}
                  onPress={() => { navigation.navigate("Bird", bird) }}
                  style={styles.birdCardContainerHorizontal}>
                  <View >
                    <View style={styles.birdCardImageContainer}>
                      <Image
                        source={{ uri: bird["bird_image_url"] }}
                        style={styles.birdCardImage}
                        />
                    </View>
                    <Text style={styles.text}>
                      {bird["common_name"]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View>
              <Text style={styles.userSightingText2}>
                You do no have any birds in your Perch Alert
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Species");
                }}
              >
                <Text style={styles.userSightingText2}>
                  Click Here to find some!
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    // </View>
  );
}

export default UserPerchAlerts;
