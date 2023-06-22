import dayjs from "dayjs";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebaseConfig";
import {
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import Comments from "./comments/Comments.jsx";
import {styles, textStyles, birdCardStyles } from "../styles/style.js";

import LikeCard from "./LikeCard";

export default Sighting = ({ route, navigation }) => {
  
  const {
    id,
    user,
    bird,
    rarity,
    coordinates,
    date_spotted,
    sighting_img_url,
  } = route.params;

  const [birdDetails, setBirdDetails] = useState(null);

  const dateDay = dayjs(date_spotted).format("DD-MM-YYYY");
  const dateTime = dayjs(date_spotted).format("HH:mm:ss");

  // Bird Details
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerFilledLight}>

          <Text style={textStyles.titleText}>{bird}</Text>

          <View style={birdCardStyles.imageContainer}> 
            <Image source={{ uri: sighting_img_url}} style={birdCardStyles.image}/>
          </View>

          <View style={textStyles.textContainer}>
            <Text style={textStyles.textEmphasized}>Date : {dateDay} at {dateTime}</Text>
            <Text style={textStyles.textEmphasized}>Location: {coordinates.coordinates.join("  ")}</Text>
            <Text style={textStyles.textEmphasized}>Spotted by: <Text>{user}</Text></Text>
          </View>
          
          {birdDetails && (
            <View style={textStyles.textContainer}>
              <Text style={textStyles.textMedium}>Details</Text>
              <Text style={textStyles.text}> {birdDetails.description}</Text>
            </View>
          )}
        </View>

      {/* Comment section */}
      <Comments route={route}/>
      
      </View>
    </ScrollView>
  );
};

