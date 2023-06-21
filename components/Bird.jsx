import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground
} from "react-native";
import ManagePerch from "./ManagePerch";
import { styles, textStyles, birdCardStyles } from "../styles/style.js";

let width = Dimensions.get("window").width;

let cardBorderColor = ""
let rarityName = "Common";
/* Rarity Colors */
const common = "rgba(110,110,110, 0.5)";
const uncommon = "rgba(37,176,42, 0.5)";
const rare = "rgba(55,64,186, 0.7)";
const epic = "rgba(157,12,201, 0.5)";
const legendary = "rgba(255,50,0, 0.6)";

export default Bird = ({ route, navigation }) => {
  const {
    common_name,
    bird_image_url,
    description,
    weight,
    height,
    latin_name,
    diet,
    order,
    suborder,
    family,
    subfamilies,
    facts,
    rarity,
    id,
  } = route.params;

  setRarityNameAndColor(rarity)

  
  
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>

        {/* CARD */}
        <View style={[birdCardStyles.cardContainer, {backgroundColor: cardBorderColor}]}>
          <View style={styles.containerFilledLight}>

            <View style={[textStyles.textContainerHorizontal, { paddingHorizontal: 10}]}>
               <Text style={[textStyles.textMediumBlack, {textAlign: "left", maxWidth: 200, minWidth: 200}]} numberOfLines={2} ellipsizeMode="tail">{common_name}</Text>
              <View style={{flex: 3}}></View>
              <Text style={[textStyles.textMedium, {color: cardBorderColor}]}>{rarityName}</Text>
              <View style={{flex: 1}}></View>
              <ManagePerch id={id}/>

            </View>

            <View style={birdCardStyles.imageContainer}>
              <ImageBackground  source={{uri: bird_image_url}} style={birdCardStyles.image}>
                <Image  source={{uri: bird_image_url}} style={birdCardStyles.image}/>
              </ImageBackground>
            </View>
            
            <View style={textStyles.textContainerHorizontal}>
              <Text style={textStyles.text}>Weight: {weight}</Text>
              <View style={{flex: 1}}></View>
              <Text style={textStyles.text}>Height: {height}</Text>
            </View>

            <View style={textStyles.textContainerHorizontal}>
             
              <Text style={textStyles.text}>
                <Text style={textStyles.textEmphasized}>
                  {common_name}
                  </Text>{ description.replace(String("The " + common_name), "")}
                  </Text>
            </View>

            <View style={textStyles.textContainerHorizontal}>
              <Text style={textStyles.text}>Diet: {diet}</Text>
              <View style={{flex:1}}></View>
            </View>

          </View>
        </View>

        {/* Extra details */} 

        <View>
          <Text style={textStyles.titleText}>Further details</Text>
          <Text style={textStyles.textMedium}> Clasification </Text>
          <View style={textStyles.textContainer}>
            <Text style={textStyles.text}>Latin Name: {latin_name}</Text>
            <Text style={textStyles.text}>Suborder: {suborder}</Text>
            <Text style={textStyles.text}>Order: {order}</Text>
            <Text style={textStyles.text}>Family: {family}</Text>
            <Text style={textStyles.text}>Sub Families: {subfamilies}</Text>
          </View>
          <Text style={textStyles.textMedium}> Interesting facts</Text>
          <View style={textStyles.textContainer}>
            {facts.map( (fact, index) => {
               return <Text key={index}style={[textStyles.text, {textAlign: "left"}]}> 
                        <Image source={require("../assets/feather.png")} style={styles.buletPoint}/>
                        {fact}
                      </Text>}
            )}
          </View>
        </View>

      </View>
    </ScrollView>
  );
};


function setRarityNameAndColor(rarity){
  switch(rarity){
    case(1):
      rarityName = "Common";
      cardBorderColor = common
      break;
    case(2):
      rarityName = "Uncommon";
      cardBorderColor = uncommon
      break;
    case(3):
      rarityName = "Rare";
      cardBorderColor = rare
      break;
    case(4):
      rarityName = "Epic";
      cardBorderColor = epic
      break;
    case(5):
      rarityName = "Legendary";
      cardBorderColor = legendary
      break;
  }
}