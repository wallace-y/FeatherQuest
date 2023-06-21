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
  const Submit = async () => {
      let tempSightingData = {...sightingData}
      tempSightingData.created_at = new Date().toISOString()
      setSightingData({ bird: "", date_spotted: "", coordinates: "", user: globalUser.userId, sighting_img_url: ""})
      // console.log("submited", tempSightingData)
      // setSightingData({
      //   bird: "",
      //   date_spotted: "",
      //   coordinates: "",
      //   user: globalUser.userId,
      //   sighting_img_url: "",
      // });
      console.log(sightingData)
      // COOMENTED for dev purpososes
      try {
        const newSighting = await addDoc(collection(db, "sightings"), tempSightingData)
        alert("Sighting successfully posted.")
        navigation.navigate("SightingList")
      } catch (err) {
        console.log(err)
        alert("Error posting sighting. Please try again later.")
      }
      

    //TODO: navigate to the new sighting page
  };

  return (
    <View style={[styles.pageContainer]}>
      <View style={styles.containerFilledDark}>
          <View style={styles.titleContainer}>
            <Text style={textStyles.titleText}>Post Your Sighting</Text>
          </View>
          <BirdSelection
            setSightingData={setSightingData}
            sightingData={sightingData}
            />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("IdentifyBird")}
              >
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
              style={[
                styles.button,
                (sightingData.bird === "" ||
                sightingData.date_spotted === "" ||
                sightingData.coordinates === "") &&
                styles.disabledButton,
              ]}
              disabled={
                sightingData.bird === "" ||
                sightingData.date_spotted === "" ||
                sightingData.coordinates === ""
              }
              onPress={Submit}
              >
              <Text style={textStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};