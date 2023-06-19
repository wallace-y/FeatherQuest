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

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default SightingList = ({ navigation }) => {
  const [allSightings, setAllSightings] = useState([]);
  // const [allBirds, setAllBirds] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);
  // const [allComments, setAllComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllBirds = async () => {
      try {
        setLoading(true);

        const [sightingsQuerySnapshot] = await Promise.all([
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
      <View style={styles.container}>
        <Text style={styles.header}>All Sightings</Text>
        {loading && (
          <Text style={styles.loadingText}>Loading...Please Wait</Text>
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Go Back"
            onPress={() => navigation.goBack()}
          ></CustomButton>
        </View>

        <View style={styles.row}>
          {allSightings.map((bird, index) => (
            <View key={index} style={styles.birdCard}>
              <Text style={styles.birdName}>{bird.bird}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Sighting", bird);
                }}
              >
                {bird.sighting_img_url === "" ? (
                  <Image
                    source={require("../assets/slawek-k-mZF-_SXc_6c-unsplash.jpg")}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={{
                      uri: bird.sighting_img_url,
                    }}
                    style={styles.image}
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {error && (
          <View>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    minHeight: height,
    backgroundColor: "#7A918D",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 100,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    marginBottom: 10,
  },
  header: {
    fontFamily: "Virgil",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
  },
  birdCard: {
    width: "33%",
    height: 180,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#A18276",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#AAC0AA",
  },
  birdName: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  loadingText: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 25,
  },
  errorText: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 25,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});
