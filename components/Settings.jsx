import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export default Settings = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [newScreenName, setNewScreenName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [inputValid, setValidInput] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const q = query(collection(db, "users"), where("id", "==", 4));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        setUser(userData[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [user, updateScreenName]);

  const updateScreenName = async () => {
    try {
      const userRef = doc(db, "users", "5pfZtCfrTQJa0sF6nNAT");
      await updateDoc(userRef, {
        screen_name: newScreenName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewScreenName("");
      alert("Details successfully updated");
    }
  };

  const updatedFirstName = async () => {
    try {
      const userRef = doc(db, "users", "5pfZtCfrTQJa0sF6nNAT");
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
      const userRef = doc(db, "users", "5pfZtCfrTQJa0sF6nNAT");
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
      const userRef = doc(db, "users", "5pfZtCfrTQJa0sF6nNAT");
      await updateDoc(userRef, {
        location: newLocation,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewLocation("");
    }
  };

  function handleSubmit() {
    if (inputValid) {
      if (newScreenName.length > 1) {
        updateScreenName();
      }
      if (newFirstName.length > 1) {
        updatedFirstName();
      }
      if (newLocation.length > 1) {
        updatedLocation();
      }
      if (newLastName.length > 1) {
        updatedLastName();
      }
    } else {
      alert("Invalid entries please update the above fields.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Settings</Text>
      <View style={styles.inputGroup}>
        <Text>Change Username:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          onEndEditing={() => {
            if (newScreenName.length < 5) {
              alert("Username must be 6 or more characters");
              setValidInput(false);
            } else {
              setValidInput(true);
            }
          }}
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={user.screen_name}
          value={newScreenName}
          onChangeText={(text) => setNewScreenName(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Change First Name:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          onEndEditing={() => {
            if (newFirstName.length < 1) {
              alert("First name must not be empty.");
              setValidInput(false);
            } else {
              setValidInput(true);
            }
          }}
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={user.first_name}
          value={newFirstName}
          onChangeText={(text) => setNewFirstName(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Change Last Name:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          onEndEditing={() => {
            if (newLastName.length < 1) {
              alert("Last name must not be empty.");
              setValidInput(false);
            } else {
              setValidInput(true);
            }
          }}
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={user.last_name}
          value={newLastName}
          onChangeText={(text) => setNewLastName(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Change Location:</Text>
        <TextInput
          inputMode="text"
          textAlign="center"
          onEndEditing={() => {
            if (newLocation.length < 1) {
              alert("Location must not be empty.");
              setValidInput(false);
            } else {
              setValidInput(true);
            }
          }}
          autoCapitalize="none"
          style={styles.inputText}
          placeholder={user.location}
          value={newLocation}
          onChangeText={(text) => setNewLocation(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Change Password:</Text>
        <TextInput style={styles.inputText} placeholder="****TBC****" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
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
  inputGroup: {
    padding: 10,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#A18276",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    marginLeft: 10,
    color: "white",
  },
  header: {
    color: "white",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 30,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#736372",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
