import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import { StyleSheet, Text, Image, Dimensions, View } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

let width = Dimensions.get("window").width;

export default Sighting = ({ route, navigation }) => {
  const { bird, sighting_img_url, coordinates, date_spotted, rarity, user } =
    route.params;
  const dateDay = dayjs(date_spotted).format("DD-MM-YYYY");
  const dateTime = dayjs(date_spotted).format("HH:mm:ss");

  const [birdDetails, setBirdDetails] = useState(null);

  useEffect(() => {
    const fetchBirdDetails = async () => {
      try {
        const birdQuery = query(
          collection(db, "birds"),
          where("common_name", "==", bird)
        );
        const birdQuerySnapshot = await getDocs(birdQuery);
        if (!birdQuerySnapshot.empty) {
          const birdDoc = birdQuerySnapshot.docs[0];
          const birdData = birdDoc.data();
          setBirdDetails(birdData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBirdDetails();
  }, [bird]);

  return (
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
      {birdDetails && (
        <Text style={styles.birdInfo}>Details: {birdDetails.description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
