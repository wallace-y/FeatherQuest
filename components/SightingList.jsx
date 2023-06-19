import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "../firebaseConfig";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import CustomButton from "./CustomButton";
import { UserContext } from "../utils/UserContext";
import { getUserData } from "../utils/pullUserInfo";
import { styles } from "../styles/style.js"

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default SightingList = ({ navigation }) => {
  const [allSightings, setAllSightings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllBirds = async () => {
      try {
        setLoading(true);

        const [
          sightingsQuerySnapshot,

        ] = await Promise.all([
          getDocs(collection(db, "sightings")),
 
        ]);
        const sightingsData = sightingsQuerySnapshot.docs.map((doc) =>
          doc.data()
        );

        setAllSightings(sightingsData);
 
      } catch (error) {
        console.log(error.message);
        setError("Failed to fetch sightings data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBirds();
  }, []);

return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>

        <Text style={styles.titleText}>All Sightings</Text>
        {loading && ( <Text style={styles.loadingText}>Loading...Please Wait</Text> )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {allSightings.map((bird, index) => (
              <TouchableOpacity key={index}
                style={styles.birdCardContainer}
                onPress={() => {navigation.navigate("Sighting", bird);}}
              >
                <View style={styles.birdCardImageContainer}>
                  <Image source={{ uri: bird.sighting_img_url}}
                          style={styles.birdCardImage}
                  />
                </View>

                <Text style={styles.text}>{bird.bird}</Text>
              </TouchableOpacity>
          ))}
        </View>
        {error && (
          <View>
            <Text style={styles.warningText}>{error}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
 