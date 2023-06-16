import {
  View,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../utils/UserContext";
import { db } from "../../firebaseConfig.js";

import BirdSelection from "./BirdSelection.jsx";
import DateSelection from "./DateSelection.jsx";
import SelectLocation from "./SelectLocation.jsx";
import CustomButton from "../CustomButton";

export default PostSighting = ({ navigation }) => {
  const { globalUser } = useContext(UserContext);
  const [sightingData, setSightingData] = useState({
    bird: "",
    date: "",
    location: "",
    user: globalUser.userId,
  });
  const windowHeight = useWindowDimensions().height;
    
    //Post sightings data to db
    const Submit = () => {
        
        let tempSightingData = {...sightingData}
        tempSightingData.created_at = new Date().toISOString()
        setSightingData({ bird: "", created_at: "", coordinates: "", user: globalUser.userId})
        console.log("submited", tempSightingData)

        // COOMENTED for dev purpososes
        addDoc(collection(db, "sightings"), tempSightingData)
        .then( docRef => {
            // console.log(docRef)
        })
        .catch(err => {
            console.log("Failed to submit a sighting")
        })
    }

  return (
      <View
        style={[
          styles.pageContainer,
          {
            minHeight: Math.round(windowHeight - 100),
            maxHeight: Math.round(windowHeight),
          },
        ]}
      >
        <View>
          <Text style={styles.pageTitle}>Post Your Sighting</Text>
        </View>
        <BirdSelection
          setSightingData={setSightingData}
          sightingData={sightingData}
        />
        <View>
          <CustomButton
            title="Identify"
            onPress={() => {
              navigation.navigate("IdentifyBird");
            }}
          />
        </View>

        <DateSelection
          setSightingData={setSightingData}
          sightingData={sightingData}
        />
        <SelectLocation
          sightingData={sightingData}
          setSightingData={setSightingData}
        />
        <View style={styles.submit}>
          <Button
            title="Submit"
            onPress={Submit}
            style={styles.submit}
            disabled={
              sightingData.bird === "" ||
              sightingData.date === "" ||
              sightingData.location === ""
            }
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7A918D",
  },
  submit: {
    position: "relative",
  },
  pageTitle: {
    fontSize: 30,
    color: "white",
    paddingLeft: 10,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    fontFamily: "Virgil",
  },
  buttonContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "#AAC0AA",
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    fontFamily: "Virgil",
    color: "white",
  },
});
