import { VISION_API_KEY } from "@env";
import * as ImagePicker from "expo-image-picker";
import { getApps } from "firebase/app";
import { storage } from "../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  LogBox,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as Clipboard from "expo-clipboard";
import uuid from "uuid";
import CustomButton from "./CustomButton";

if (!getApps().length) {
  console.log("App not initalised");
}

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        {this.state.googleResponse && (
          <View>
            <Text style={styles.bestGuess}>
              Our best guess is:{" "}
              {
                this.state.googleResponse.responses[0].webDetection
                  .webEntities[0].description
              }
            </Text>
            <TouchableOpacity>
              <Text>To use this guess in a posting please click</Text>
              <CustomButton
                title="here"
                onPress={() => {
                  navigation.goBack();
                }}
              ></CustomButton>
            </TouchableOpacity>
          </View>
        )}

        {!image && (
          <View>
            <CustomButton
              title="Pick an image from camera roll"
              onPress={this._pickImage}
            ></CustomButton>
            <CustomButton
              title="Take a photo"
              onPress={this._takePhoto}
            ></CustomButton>
          </View>
        )}

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />

        {image && (
          <View>
            <CustomButton
              onPress={() => this.submitToGoogle()}
              title="Analyze!"
            ></CustomButton>
          </View>
        )}

        {/* {this.state.googleResponse && (
            <Text onPress={this._copyToClipboard} onLongPress={this._share}>
              {JSON.stringify(this.state.googleResponse.responses)}
            </Text>
          )} */}
        {/* {this.state.googleResponse && (
          <FlatList
            data={
              this.state.googleResponse.responses[0].webDetection.webEntities
            }
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => <Text>Item: {item.description}</Text>}
          />
        )} */}
      </View>
    );
  }

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              //   { type: "LABEL_DETECTION", maxResults: 5 },
              //   { type: "OBJECT_LOCALIZATION", maxResults: 2 },
              { type: "WEB_DETECTION", maxResults: 3 },
            ],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          VISION_API_KEY,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      let responseJson = await response.json();
      // console.log(responseJson);
      console.log(responseJson.responses[0]);
      this.setState({
        googleResponse: responseJson,
        uploading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        {/* <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {image}
        </Text> */}
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult.assets);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    // console.log({ pickerResult });

    this._handleImagePicked(pickerResult.assets);
  };

  _handleImagePicked = async (assets) => {
    try {
      this.setState({ uploading: true });

      if (assets && assets.length > 0) {
        const uploadUrl = await uploadImageAsync(assets[0].uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, uuid.v4());
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bestGuess: {
    fontFamily: "Virgil",
    fontWeight: 700,
  },
});
