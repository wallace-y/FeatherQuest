import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
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
import { styles } from "../styles/style.js";

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
          <Text style={styles.titleText}>All Birds</Text>
        </View>
        {loading && (
          <Text style={styles.loadingText}>Loading...Please Wait</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>

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
                <Image
                  source={{
                    uri: bird.bird_image_url,
                  }}
                  style={[styles.birdCardImage]}
                />
              </View>
              <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                {bird.common_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {error && <Text style={styles.warningText}>{error}</Text>}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//
//   container: {
//     flex: 1,
//     backgroundColor: "#7A918D",
//     alignItems: "center",
//     paddingTop: 20,
//     paddingBottom: 40,
//   },
//   row: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "flex-start",
//   },
//   image: {
//     width: "100%",
//     aspectRatio: 1,
//     resizeMode: "cover",
//     marginBottom: 10,
//   },
//   header: {
//     fontFamily: "Virgil",
//     textAlign: "center",
//     marginTop: 10,
//     marginBottom: 10,
//     fontSize: 40,
//   },
//   birdCard: {
//     width: "33%",
//     height: 180,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#A18276",
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: "#AAC0AA",
//   },
//   birdName: {
//     fontFamily: "Virgil",
//     textAlign: "center",
//     fontSize: 15,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     marginBottom: 15,
//   },
//   inputContainer: {
//     width: "80%",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     fontFamily: "Virgil",
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
// });
