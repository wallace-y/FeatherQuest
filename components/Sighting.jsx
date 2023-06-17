import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import { StyleSheet, Text, Image, Dimensions, View } from "react-native";

let width = Dimensions.get("window").width;

export default Sighting = ({ route, navigation }) => {
  const {
    bird,
    sighting_img_url,
    coordinates,
    date_spotted,
    rarity,
    user
  } = route.params;
  console.log(route.params, "PARAMS")
  const dateDay = dayjs(date_spotted).format("DD-MM-YYYY");
  const dateTime = dayjs(date_spotted).format("HH:mm:ss");
  
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
