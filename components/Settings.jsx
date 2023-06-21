import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { confirmPasswordReset, updatePassword } from "firebase/auth";
import { UserContext } from "../utils/UserContext";
import { useContext } from "react";

export default Settings = ({ navigation }) => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [screenNameUpdated, setScreenNameUpdated] = useState(false);
  const [firstNameUpdated, setFirstNameUpdated] = useState(false);
  const [lastNameUpdated, setLastNameUpdated] = useState(false);
  const [locationUpdated, setLocationUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [newScreenName, setNewScreenName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [newScreenNameValid, setNewScreenNameValid] = useState(true);
  const [newFirstNameValid, setNewFirstNameValid] = useState(true);
  const [newLastNameValid, setNewLastNameValid] = useState(true);
  const [newLocationValid, setNewLocationValid] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const current_user = auth.currentUser;
        onSnapshot(doc(db, "users", current_user.uid), (doc) => {
          setGlobalUser((currUser) => {
            return {
              userId: currUser.userId,
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              location: doc.data().location,
              username: doc.data().screen_name,
              profile_image_url: doc.data().profile_image_url,
              perch_list: [...doc.data().perch_list],
              coordinates: [...currUser.coordinates],
            };
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [handleSubmit]);

  const updateScreenName = async () => {
    try {
      const current_user = auth.currentUser;

      const userRef = doc(db, "users", current_user.uid);
      await updateDoc(userRef, {
        screen_name: newScreenName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewScreenName("");
      // alert("Details successfully updated");
    }
  };

  const updatedFirstName = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        first_name: newFirstName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewFirstName("");
    }
  };

  const updatedLastName = async () => {
    try {
      const current_user = auth.currentUser;

      const userRef = doc(db, "users", current_user.uid);
      await updateDoc(userRef, {
        last_name: newLastName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewLastName("");
    }
  };

  const updatedLocation = async () => {
    try {
      const current_user = auth.currentUser;

      const userRef = doc(db, "users", current_user.uid);
      await updateDoc(userRef, {
        location: newLocation,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewLocation("");
    }
  };
  const updateUserPassword = async () => {
    try {
      const current_user = auth.currentUser;
      updatePassword(current_user, newPassword).then(() => {
        setNewPassword("");
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Password Updated");
    }
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSubmit = async () => {
    try {
      if (screenNameUpdated) {
        if (newScreenNameValid) {
          await updateScreenName();
          setScreenNameUpdated(false);
        } else {
          throw new Error("Invalid screen name");
        }
      }
      if (firstNameUpdated) {
        if (newFirstNameValid) {
          await updatedFirstName();
          setFirstNameUpdated(false);
        } else {
          throw new Error("Invalid First name");
        }
      }
      if (lastNameUpdated) {
        if (newLastNameValid) {
          await updatedLastName();
          setLastNameUpdated(false);
        } else {
          throw new Error("Invalid Last name");
        }
      }
      if (locationUpdated) {
        if (newLocationValid) {
          await updatedLocation();
          setLocationUpdated(false);
        } else {
          throw new Error("Invalid Last name");
        }
      }
      if (passwordUpdated) {
        if (newPasswordValid) {
          await updateUserPassword();
          setPasswordUpdated(false);
        } else {
          throw new Error("Invalid Password");
        }
      }
      alert("Details successfully updated");
    } catch (err) {
      console.log(err);
      alert("Invalid entries. Please update the above fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Settings</Text>
      <View style={styles.inputGroup}>
        <Text>Change Username:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={globalUser.username}
          value={newScreenName}
          onChangeText={(text) => {
            setNewScreenName(text);
            setScreenNameUpdated(true);
            if (newScreenName.length < 6) {
              setNewScreenNameValid(false);
            } else {
              setNewScreenNameValid(true);
            }
          }}
        />
      </View>
      {!newScreenNameValid && (
        <View>
          <Text>Username must be 6 or more characters.</Text>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text>Change First Name:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={globalUser.first_name}
          value={newFirstName}
          onChangeText={(text) => {
            setNewFirstName(text);
            setFirstNameUpdated(true);
            if (newFirstName.length < 1) {
              setNewFirstNameValid(false);
            } else {
              setNewFirstNameValid(true);
            }
          }}
        />
      </View>
      {!newFirstNameValid && (
        <View>
          <Text>First name must not be empty.</Text>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text>Change Last Name:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={globalUser.last_name}
          value={newLastName}
          onChangeText={(text) => {
            setNewLastName(text);
            setLastNameUpdated(true);

            if (newLastName.length < 1) {
              setNewLastNameValid(false);
            } else {
              setNewLastNameValid(true);
            }
          }}
        />
      </View>
      {!newLastNameValid && (
        <View>
          <Text>Last name must not be empty.</Text>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text>Change Location:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={globalUser.location}
          value={newLocation}
          onChangeText={(text) => {
            setNewLocation(text);
            setLocationUpdated(true);

            if (newLocation.length < 1) {
              setNewLocationValid(false);
            } else {
              setNewLocationValid(true);
            }
          }}
        />
      </View>
      {!newLocationValid && (
        <View>
          <Text>Location must not be empty.</Text>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text>Change Password:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          autoCapitalize="none"
          style={styles.inputText}
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setPasswordUpdated(true);

            if (newPassword.length < 1) {
              setNewPasswordValid(false);
            } else {
              setNewPasswordValid(true);
            }
          }}
          placeholder="****TBC****"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    fontFamily: "Virgil",
    color: "#333",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  inputGroup: {
    padding: 10,
    marginBottom: 20,
    width: "80%",
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
    fontSize: 16,
  },
  validationMessage: {
    color: "#F44336",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    width: "60%",
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signOutButton: {
    backgroundColor: "#F44336",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
