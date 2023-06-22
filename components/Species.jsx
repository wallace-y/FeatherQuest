import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import CustomButton from "./CustomButton";
import { styles, textStyles } from "../styles/style.js";

let height = Dimensions.get("window").height;

export default Species = ({ navigation }) => {
  const [birds, setBirds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "birds"));
        const birdData = querySnapshot.docs.map((doc) => doc.data());
        setBirds(birdData);
        setFilteredList(birdData);
      } catch (error) {
        console.log("Error fetching birds:", error.message);
        setError("Failed to fetch bird data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBirds();
  }, []);

  useEffect(() => {
    setFilteredList(
      birds.filter((bird) => {
        return bird.common_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
    );
  }, [searchQuery]);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={textStyles.titleText}>All Birds</Text>
        </View>
        {loading && (
          <Text style={styles.loadingText}>Loading...Please Wait</Text>
        )}

        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="Search for a bird"
            maxLength={50}
            style={styles.input}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {filteredList.length === 0 ? (
          <View>
            <Text style={styles.warningText}>
              Oops. Nothing here, please search again...
            </Text>
          </View>
        ) : null}

        <View style={styles.listContainer}>
          {filteredList.map((bird, index) => (
            <TouchableOpacity
              key={index}
              style={styles.birdCardContainer}
              onPress={() => {
                navigation.navigate("Bird", bird);
              }}
            >
              <View style={styles.birdCardImageContainer}>
                <Image source={{ uri: bird.bird_image_url}} style={[styles.birdCardImage]}/>
              </View>
              <Text style={textStyles.text} numberOfLines={2} ellipsizeMode="tail">
                {bird.common_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {error && <Text style={textStyles.warningText}>{error}</Text>}
    </ScrollView>
  );
};