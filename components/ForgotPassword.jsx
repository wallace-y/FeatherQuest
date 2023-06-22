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
import { styles, textStyles } from "../styles/style.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleResetPassword = () => {
    if (email === "") {
      setEmailError("Please enter your email.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        console.log("Error sending password reset email:", error);
      });
  };

  const handleEmail = (text) => {
    if (text.length === 0) {
      setEmail(text);
      setEmailError("Please enter your email.");
    } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(text)) {
      setEmail(text);
      setEmailError("");
    } else {
      setEmail(text);
      setEmailError("Invalid email format.");
    }
  };

  return (
    <>
      {resetSent ? (
        <View style={styles.pageContainer}>
          <View style={styles.centeredContainer}>
            <Text style={textStyles.titleText}>Password reset email sent!</Text>
          </View>
        </View>
      ) : (
        <View style={styles.pageContainer}>
          <View style={styles.centeredContainer}>
            <Text style={textStyles.titleText}>Forgot Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                placeholder="Email *"
                onChangeText={handleEmail}
                style={styles.input}
              />
              {emailError !== "" && (
                <Text style={textStyles.warningText}>{emailError}</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleResetPassword}
                style={styles.button}
              >
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
