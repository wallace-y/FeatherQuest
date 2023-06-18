import * as Device from "expo-device";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig"; // Import the storage module
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SignUp = () => {
  const [screenName, setScreenName] = useState("");
  const [screenNameValid, setScreenNameValid] = useState(false)
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false)
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  const [signUpValid, setSignnUpValid] = useState(false)  

  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please allow access to the image library."
        );
      }
    })();
  }, []);

  const handleImageUpload = async () => {
    if (!uploading) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.uri);
          setUploading(true);
          await uploadImage(result.uri);
          setImage(null);
          setUploading(false);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error selecting image.", "Please try again later.");
      }
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      const fileRef = ref(storage, "users/" + filename);
      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);
      setImageUrl(downloadURL);
      Alert.alert("Photo uploaded successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error uploading photo.", "Please try again later.");
    }
  };

  const handleUsername = ( text ) => {
    if(text.length >= 6){
      setScreenName(text)
      setScreenNameValid(true)
    }else{
      setScreenName(text)
      setScreenNameValid(false)
    }
    setSignnUpValid(screenNameValid && emailValid && passwordValid)
  }
  const handleEmail = (text) => {
    if((/^[a-zA-z0-9]+@[a-zA-z0-9]+[\.][a-zA-z0-9]+$/).test(text)){
      setEmail(text)
      setEmailValid(true)
    }else{
      setEmail(text)
      setEmailValid(false)
    }  console.log(signUpValid , "signUpValid")

    setSignnUpValid(screenNameValid && emailValid && passwordValid)
  }
  const handlerPassword = (text) => {
    console.log(text)
    if(text.length >= 6){
      setPassword(text)
      setPasswordValid(true)
      
    }else{
      setPassword(text)
      setPasswordValid(false)
    }
    setSignnUpValid(screenNameValid && emailValid && passwordValid)
  }

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        created_at: user.metadata.creationTime,
        first_name: firstName,
        last_name: lastName,
        location: location,
        follower_list: [],
        friend_list: [],
        perch_list: [],
        spotted_list: [],
        profile_image_url: imageUrl,
        screen_name: screenName,
      });

      Alert.alert("Account Registered");
    } catch (error) {
      Alert.alert("Sign Up Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Username *"
        onChangeText={handleUsername}
        style={styles.input}
      />
      {!screenNameValid && screenName !== "" && <Text>Username too short</Text>}
      <TextInput
        autoCapitalize="none"
        placeholder="Email *"
        onChangeText={handleEmail}
        style={styles.input}
      />
      {!emailValid && email !== "" && <Text>Email invalid</Text>}
      <TextInput
        autoCapitalize="none"
        placeholder="Password *"
        onChangeText={handlerPassword}
        style={styles.input}
        secureTextEntry
      />
       {!passwordValid && password !== "" && <Text>Password to short. Should be at least 6 characters long</Text>}
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleImageUpload}
        style={[styles.button, uploading && styles.disabledButton]}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Select and Upload Image"}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}

      <TouchableOpacity onPress={handleSignUp} 
        disabled={
          !(screenNameValid && emailValid && passwordValid)
        }
          style={[styles.button, !(screenNameValid && emailValid && passwordValid) && styles.disabledButton]}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {!(screenNameValid && emailValid && passwordValid) && <Text>Missing some fields</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5e7975",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlignVertical: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "80%",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default SignUp;
