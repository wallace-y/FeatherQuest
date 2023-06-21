import {
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
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import CustomButton from "./CustomButton";
import { UserContext } from "../utils/UserContext";
import { getUserData } from "../utils/pullUserInfo";
import { styles, textStyles } from "../styles/style.js"
import { distanceCalculate } from "../utils/distanceCalculator";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default SightingList = ({ navigation }) => {
  const [allSightings, setAllSightings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [birdsByDistance, setBirdsByDistance] = useState([]);
  const { globalUser, setGlobalUser } = useContext(UserContext);

  useEffect(() => {
    const fetchAllBirds = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "sightings"),
          orderBy("date_spotted", "desc")
        );
        const [sightingsQuerySnapshot] = await Promise.all([getDocs(q)]);

        const sightingsData = sightingsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        distanceCalculate(globalUser.coordinates, sightingsData).then(
          (data) => {
            setBirdsByDistance(data);
          }
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

        <View style={styles.titleContainer}>
          <Text style={textStyles.titleText}>All Sightings</Text>
        </View>
        {loading && ( <Text style={textStyles.loadingText}>Loading...Please Wait</Text> )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={textStyles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {birdsByDistance.map((bird, index) => (
            <TouchableOpacity
              key={index}
              style={styles.birdCardContainer}
              onPress={() => {
                navigation.navigate("Sighting", bird);
              }}
            >
              <View style={styles.birdCardImageContainer}>
                {bird.sighting_img_url === "" ? (
                  <Image
                    source={require("../assets/default-sighting-img.jpg")}
                    style={[styles.birdCardImage]}
                    />
                    ) : (
                      <Image
                      source={{ uri: bird.sighting_img_url}}
                      style={styles.birdCardImage}
                      />
                  )}
                </View>
                <View style={textStyles.textContainer}> 
                  <Text style={textStyles.text} numberOfLines={2} ellipsizeMode="tail">{bird.bird}</Text>
                </View>
              </TouchableOpacity>
          ))}
        </View>
        {error && (<View><Text style={textStyles.warningText}>{error}</Text></View>
        )}
      </View>
    </ScrollView>
  );
};
