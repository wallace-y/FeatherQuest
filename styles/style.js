import { StyleSheet, Dimensions } from "react-native";

/*
    Colors:
    darkGreen : #5e7975
    lightGreen: #AAC0AA
    salmon:     #A18276
    pink:       #B24C63
    purple:     #736372
*/
let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

const darkGreen = "#5e7975"
const lightGreen = "#AAC0AA"
const salmon = "#A18276"
const pink = "#B24C63"
const purple = "#736372"
const textWhite = "white"
const textBlack = "black"
const inputColor = "white"
const font = "Virgil"

const devBoder = 0;

export const styles = StyleSheet.create({
/* Containers */
scrollView: {
    borderWidth: devBoder,
    minHeight: SCREEN_HEIGHT,
    backgroundColor: darkGreen,
},
pageContainer: {
    borderWidth: devBoder,
    flex: 1,
    alignItems: "center",
    backgroundColor: darkGreen,
    paddingBottom: 70,

  },
iconContainer: {
    borderWidth: devBoder,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
},
buttonContainer: {
    borderWidth: devBoder,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
},
inputContainer: {
    borderWidth: devBoder,
    width: "80%",
},
listContainer: {
    borderWidth: devBoder,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
},
birdCardContainer: {
    flex: 1,
    minWidth: "33%",
    height: 180,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: salmon,
    backgroundColor: lightGreen,
    borderRadius: 5,
    padding: 10,
},
imagePreviewContainer: {
    margin: 10,
    minHeight: 150,
    width: "60%",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#7A918D",
    overflow: 'hidden',
},
/* Input */
input: {
    fontFamily: font,
    backgroundColor: inputColor,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
},
/*  Button */
button: {
    backgroundColor: lightGreen,
    borderColor: purple,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderWidth: 2,
},
disabledButton:{
    opacity: 0.5
},
/* text */
titleText: {
    fontFamily: font,
    fontSize:30,
    marginBottom: 20,
    textAlign: "center",
    color: textWhite
},
text:{
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 12,
},
buttonText: {
    fontFamily: font,
    color: textBlack,
    fontSize: 18,
},

textClickable: {
    fontFamily: font,
    color: textWhite,
    fontSize: 18
},
loadingText: {
    fontFamily: "Virgil",
    textAlign: "center",
    fontSize: 25,
},
warningText: {
    fontFamily: font,
    color: textBlack,
    fontSize: 18
},
/* Images */
birdCardImageContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
    // borderWidth: 2,
    borderColor: darkGreen,
    overflow: 'hidden',
},
birdCardImage: {
    ...StyleSheet.absoluteFillObject,
},
imagePreview: {
    ...StyleSheet.absoluteFillObject,
}

});

export const navStyles = StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        marginTop: "10%",
        height: 60,
        width: "100%",
        justifyContent: "space-evenly",
        backgroundColor: "#AAC0AA",
    
      },
      image: {
        width: 60,
        height: 60,
        alignSelf: "center",
        justifyContent: "center",
      },
      text: {
        alignSelf: 'center',
        fontFamily:'Virgil',
        fontSize: 20,
      },
})