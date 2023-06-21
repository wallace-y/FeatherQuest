import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { getUserData } from "../utils/pullUserInfo";
import { useEffect, useState, useContext } from "react";
import UserPerchAlerts from "./UserPerchAlerts";
import { UserContext } from "../utils/UserContext";
import { profileStyles, textStyles, styles } from "../styles/style.js";

export default Profile = ({ navigation }) => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      userId: globalUser.userId,
      first_name: globalUser.first_name,
      last_name: globalUser.last_name,
      location: globalUser.location,
      username: globalUser.username,
      profile_image_url: globalUser.profile_image_url,
      perch_list: [...globalUser.perch_list],
    });
  }, [globalUser]);

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerFilledDark}>
          <View style={profileStyles.avatarContainer}>
            <Image
              source={{
                uri:
                  user.profile_image_url ||
                  "https://picsum.photos/200/200?grayscale",
              }}
              style={styles.imagePreview}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={textStyles.titleText}>{user.username}</Text>
          </View>
        </View>

        <View style={styles.horizontalBorderedContainer}>
          <View style={styles.container}>
            <View style={styles.containerFilledLightH}>
              <View style={textStyles.textContainer}>
                <Text style={textStyles.textMediumBlackRight}>Forename:</Text>
                <Text style={textStyles.textMediumBlackRight}>Surname:</Text>
                <Text style={textStyles.textMediumBlackRight}>Region:</Text>
              </View>
              <View style={textStyles.textContainer}>
                <Text style={textStyles.textMediumBlackLeft}>
                  {user.first_name}
                </Text>
                <Text style={textStyles.textMediumBlackLeft}>
                  {user.last_name}
                </Text>
                <Text style={textStyles.textMediumBlackLeft}>
                  {user.location}
                </Text>
              </View>
            </View>

            {/* Profile interactions */}
            <View style={styles.containerFilledLightH}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  navigation.navigate("Settings");
                }}
                title="Settings"
              >
                <Image
                  source={require("../assets/Settings.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <UserPerchAlerts
          birds={user.perch_list}
          user={user}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};
