import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password) // Use createUserWithEmailAndPassword function from auth
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => {
        console.log(err);
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.title}>WELCOME TO FEATHER QUEST!</Text>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="feather-alt" size={60} color="black" />
        </View>
        <TextInput
          placeholder="Email"
          value={email}
          onChange={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChange={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlignVertical: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
