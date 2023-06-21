import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../utils/UserContext";
import { db } from "../../firebaseConfig.js";

import BirdSelection from "./BirdSelection.jsx";
import DateSelection from "./DateSelection.jsx";
import SelectLocation from "./SelectLocation.jsx";
import CustomButton from "../CustomButton";
import { styles, textStyles } from "../../styles/style.js";


export default PostSighting = ({ navigation }) => {

  const { globalUser } = useContext(UserContext);
  const [sightingData, setSightingData] = useState({
    bird: "",
    coordinates: "",
    date_spotted: "",
    created_at: "",
    sighting_img_url: "",
    user: globalUser.userId,
  });
  const windowHeight = useWindowDimensions().height;

  //Post sightings data to db
  const Submit = () => {
      console.log(globalUser)
      let tempSightingData = {...sightingData}
      tempSightingData.created_at = new Date().toISOString()
      setSightingData({ bird: "", date_spotted: "", coordinates: "", user: globalUser.userId, sighting_img_url: ""})
      console.log("submited", tempSightingData)

      // COOMENTED for dev purpososes
      // addDoc(collection(db, "sightings"), tempSightingData)
      // .then( docRef => {
      //     // console.log(docRef)
      // })
      // .catch(err => {
      //     console.log("Failed to submit a sighting")
      // })

      //TODO: navigate to the new sighting page
  }

  return (
      <View style={[styles.pageContainer]}>
        <View style={styles.titleContainer}>
          <Text style={textStyles.titleText}>Post Your Sighting</Text>
        </View>
        <BirdSelection
          setSightingData={setSightingData}
          sightingData={sightingData}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("IdentifyBird")}>
            <Text style={textStyles.buttonText}>Identify</Text>
          </TouchableOpacity>
        </View>
        <DateSelection
          setSightingData={setSightingData}
          sightingData={sightingData}
        />

        <SelectLocation
          sightingData={sightingData}
          setSightingData={setSightingData}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, 
              (sightingData.bird === "" ||
               sightingData.date_spotted === "" ||
               sightingData.coordinates === "") && styles.disabledButton]}
             disabled={
               sightingData.bird === "" ||
               sightingData.date_spotted === "" ||
               sightingData.coordinates === ""
             } 
            onPress={Submit}>
            <Text style={textStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#7A918D",
//   },
//   submit: {
//     position: "relative",
//   },
//   pageTitle: {
//     fontSize: 30,
//     color: "white",
//     paddingLeft: 10,
//     textAlign: "center",
//     marginTop: 10,
//     marginBottom: 20,
//     fontFamily: "Virgil",
//   },
//   buttonContainer: {
//     width: "60%",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//     borderWidth: 2,
//     borderRadius: 5,
//     borderColor: "black",
//     backgroundColor: "#AAC0AA",
//     marginTop: 5,
//     marginBottom: 5,
//   },
//   buttonText: {
//     fontFamily: "Virgil",
//     color: "white",
//   },
// });
