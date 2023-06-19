import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  ScrollView,
  Box,
} from "react-native";
import { useEffect, useState } from "react";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default Sighting = ({ route, navigation }) => {
  const {
    id,
    bird,
    sighting_img_url,
    coordinates,
    date_spotted,
    rarity,
    user,
    created_at,
  } = route.params;

  const dateDay = dayjs(date_spotted).format("DD-MM-YYYY");
  const dateTime = dayjs(date_spotted).format("HH:mm:ss");
  const commentDay = dayjs(created_at).format("DD-MM-YYYY");
  const commentTime = dayjs(created_at).format("HH:mm:ss");

  const [allSightings, setAllSightings] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const commentsQuerySnapshot = await getDocs(
          query(collection(db, "comments"), where("sighting_id", "==", id))
        );
        const commentsData = commentsQuerySnapshot.docs.map((doc) =>
          doc.data()
        );

        setAllComments(commentsData);
      } catch (error) {
        console.log(error.message);
        setError("Failed to fetch comments data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllComments();
  }, []);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.birdName}>{bird}</Text>
        <Image
          source={{
            uri: sighting_img_url,
          }}
          style={styles.image}
        />
        <Text style={styles.birdInfo}>
          Date Spotted: {dateDay} at {dateTime}
        </Text>
        <Text style={styles.birdInfo}>
          Location of Sighting:{" "}
          {coordinates.coordinates.map((point) => `${point}, `)}
        </Text>
        <Text style={styles.birdInfo}>Rarity: {rarity} </Text>
        <Text style={styles.birdInfo}>Spotted by: {user}</Text>
        {allComments.map((comment) => (
          <View style={styles.commentCard}>
            <View style={styles.commentTitle}>
              <Text style={styles.userName}>{comment.user} </Text>
              <Text style={styles.commentDate}>
                Posted: {commentDay} at {commentTime}
              </Text>
            </View>
            <Text>{comment.body}</Text>
          </View>
        ))}
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
    backgroundColor: "#7A918D",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.8,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 40,
  },
  birdCard: {
    marginBottom: 20,
  },
  birdName: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 5,
  },
  birdInfo: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
  },
  commentTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  commentDate: {
    fontFamily: "Virgil",
    textAlign: "right",
    fontSize: 10,
    paddingTop: 10,
  },
  userName: {
    fontFamily: "Virgil",
    textAlign: "left",
    fontSize: 20,
  },
  commentCard: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    padding: 10,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "#324d32",
  },
});
