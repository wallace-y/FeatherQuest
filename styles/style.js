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

export const styles = StyleSheet.create({
/* Containers */
scrollView: {
    minHeight: SCREEN_HEIGHT,
    paddingTop: 100,
    paddingBottom: 60,
    backgroundColor: darkGreen,
},
pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkGreen,
  },
iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
},
buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
},
inputContainer: {
    width: "80%",
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
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: purple,
    borderWidth: 2,
},
disabledButton:{
    opacity: 0.5
},
/* text */
titleText: {
    fontFamily: font,
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    color: textWhite
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
warningText: {
    fontFamily: font,
    color: textBlack,
    fontSize: 18
},
imageContainer: {
    margin: 10,
    height: "30%",
    width: "80%",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#7A918D",
    overflow: 'hidden',
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