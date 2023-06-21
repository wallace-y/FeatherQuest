import { auth } from "../firebaseConfig";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { styles, textStyles } from '../styles/style.js';

//TODO: add warning sign that the email is not valid
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        console.log("Error sending password reset email:", error);
      });
  };

  return (
    <> 
    {resetSent ? (
        <View style={styles.pageContainer}>
          <Text style={textStyles.titleText}>Password reset email sent!</Text>
        </View>
      ) : (
        <View style={styles.pageContainer}>
          <View style={styles.centeredContainer}>
            <Text style={textStyles.titleText}>Forgot Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
                <Text style={textStyles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      )}
    </>
  );
};

export default ForgotPassword;
