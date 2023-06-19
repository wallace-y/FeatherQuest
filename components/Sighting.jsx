import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { db } from "../firebaseConfig";
import { collection, addDoc, doc } from "firebase/firestore";

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
  } = route.params;
  const dateDay = dayjs(date_spotted).format("DD-MM-YYYY");
  const dateTime = dayjs(date_spotted).format("HH:mm:ss");
  const [newComment, setNewComment] = useState("");
  const { globalUser, setGlobalUser } = useContext(UserContext);

  const postComment = async () => {
    try {
      await addDoc(collection(db, "comments"), {
        body: newComment,
        created_at: new Date().toISOString(),
        sighting_id: id,
        upvotes: 0,
        user: globalUser.username,
      });
      setNewComment("");
    } catch (error) {
      alert("There was an error posting your comment. Please try again later.");
      console.log(error.message);
    }
  };

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

        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="Post a comment"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            rows={4}
          />
          <TouchableOpacity onPress={postComment}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  input: {
    flex: 1,
    fontFamily: "Virgil",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonText: {
    fontFamily: "Virgil",
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 35,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
