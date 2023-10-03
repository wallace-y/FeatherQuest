import { EXPO_PUBLIC_VISION_API_KEY } from "@env";
import * as ImagePicker from "expo-image-picker";
import { getApps } from "firebase/app";
import { storage } from "../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
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
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import uuid from "uuid";
import CustomButton from "./CustomButton";
import { styles, textStyles } from "../styles/style.js";

if (!getApps().length) {
  console.log("App not initalised");
}

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default IdentifyBird = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [googleResponse, setGoogleResponse] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const submitToGoogle = async () => {
    try {
      setUploading(true);
      const body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "WEB_DETECTION", maxResults: 3 },
              {
                maxResults: 3,
                type: "OBJECT_LOCALIZATION",
              },
              {
                maxResults: 3,
                type: "LABEL_DETECTION",
              },
            ],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${EXPO_PUBLIC_VISION_API_KEY}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      const responseJson = await response.json();
      setGoogleResponse(responseJson);
      // console.log(responseJson.localizedObjectAnnotations);
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const maybeRenderUploadingOverlay = () => {
    if (uploading) {
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

  const handleImagePicked = async (assets) => {
    try {
      setUploading(true);

      if (assets && assets.length > 0) {
        const uploadUrl = await uploadImageAsync(assets[0].uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  const takePhoto = async () => {
    setGoogleResponse(null);
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(pickerResult.assets);
  };

  const pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(pickerResult.assets);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        {/* Data of analysed picture */}
        {googleResponse !== null ? (
          <View style={[styles.container, { flex: 0.8 }]}>
            <Text style={textStyles.titleText}> Results</Text>
            <View style={styles.containerFilledLightH}>
              <View
                style={[
                  styles.container,
                  {
                    paddingVertical: 10,
                    paddingLeft: 20,
                    alignContent: "flex-start",
                  },
                ]}
              >
                {googleResponse.responses[0].webDetection !== undefined ? (
                  <Text style={textStyles.textRight}>Best guess:</Text>
                ) : null}
                {googleResponse.responses[0].localizedObjectAnnotations !==
                undefined ? (
                  <View>
                    <Text style={textStyles.textRight}>Main object: </Text>
                    <Text style={textStyles.textRight}>Confidence: </Text>
                  </View>
                ) : null}
                {googleResponse.responses[0].labelAnnotations[0] !==
                undefined ? (
                  <Text style={textStyles.textRight}>Likely: </Text>
                ) : null}
                {googleResponse.responses[0].labelAnnotations[0] !==
                undefined ? (
                  <Text style={textStyles.textRight}>Likely: </Text>
                ) : null}
                {googleResponse.responses[0].labelAnnotations[0] !==
                undefined ? (
                  <Text style={textStyles.textRight}>Likely: </Text>
                ) : null}
              </View>
              <View style={[styles.container, { paddingVertical: 15 }]}>
                {googleResponse.responses[0].webDetection !== undefined ? (
                  <Text style={textStyles.textLeft}>
                    {
                      googleResponse.responses[0].webDetection.webEntities[0]
                        .description
                    }
                  </Text>
                ) : null}
                {googleResponse.responses[0].localizedObjectAnnotations !==
                undefined ? (
                  <View>
                    <Text style={textStyles.textLeft}>
                      {
                        googleResponse.responses[0]
                          .localizedObjectAnnotations[0].name
                      }
                    </Text>
                    <Text style={textStyles.textLeft}>
                      {(
                        googleResponse.responses[0]
                          .localizedObjectAnnotations[0].score * 100
                      ).toFixed(0)}{" "}
                      %
                    </Text>
                  </View>
                ) : null}
                {googleResponse.responses[0].labelAnnotations[0] !==
                undefined ? (
                  <Text style={textStyles.textLeft}>
                    {
                      googleResponse.responses[0].labelAnnotations[0]
                        .description
                    }
                  </Text>
                ) : null}
                {googleResponse.responses[0].labelAnnotations[1] !==
                undefined ? (
                  <Text style={textStyles.textLeft}>
                    {
                      googleResponse.responses[0].labelAnnotations[1]
                        .description
                    }
                  </Text>
                ) : null}
                {googleResponse.responses[0].labelAnnotations[2] !==
                undefined ? (
                  <Text style={textStyles.textLeft}>
                    {
                      googleResponse.responses[0].labelAnnotations[2]
                        .description
                    }
                  </Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity>
              <CustomButton
                title="Go back to posting"
                onPress={() => {
                  navigation.goBack();
                }}
              ></CustomButton>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Initial page view */}
        {!image && (
          <View style={styles.centeredContainer}>
            <View style={{ margin: 10 }}>
              <Text style={textStyles.titleText}> Identify a bird</Text>
            </View>
            <View style={styles.buttonContainer80}>
              <CustomButton
                title="Take a photo"
                onPress={takePhoto}
              ></CustomButton>
              <CustomButton
                title="Upload from phone"
                onPress={pickImage}
              ></CustomButton>
            </View>
          </View>
        )}

        {/* <View style={styles.container}> */}

        <StatusBar barStyle="default" />

        {/* Analyze  uploaded picture */}
        {image && (
          <View>
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: image }}
                style={{ width: 250, height: 250 }}
              />
            </View>
            {maybeRenderUploadingOverlay()}

            <View>
              <CustomButton onPress={takePhoto} title="Retake?" />
              {!googleResponse && (
                <TouchableOpacity
                  style={styles.buttonLarge}
                  onPress={submitToGoogle}
                >
                  <Text style={textStyles.buttonTextLarge}>Analyze!</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {/* </View> */}
      </View>
    </View>
  );
};

async function uploadImageAsync(uri) {
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

  blob.close();

  return await getDownloadURL(fileRef);
}
