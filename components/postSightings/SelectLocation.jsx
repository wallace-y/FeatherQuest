import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/UserContext.js";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; //https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
import { smallMapStyles, styles, textStyles } from "../../styles/style.js";
import mapStyle from "../../styles/mapStyle.js";

export default SelectLocation = ({ sightingData, setSightingData }) => {
  const { globalUser } = useContext(UserContext);
  const [region, setRegion] = useState({
    // latitude: Number(globalUser.coordinates[0]),
    // longitude: Number(globalUser.coordinates[1]),
    // latitudeDelta: 0.01,
    // longitudeDelta: 0.01,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setRegionData = async () => {
      try {
        setLoading(true);
        await setRegion({
          latitude: Number(globalUser.coordinates[0]),
          longitude: Number(globalUser.coordinates[1]),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setRegionData();
  }, [globalUser]);

  console.log(region)

  const handleRegionChange = (region) => {
    setRegion(region);
    let tempSightingData = { ...sightingData };
    tempSightingData.coordinates = {
      coordinates: [region.latitude, region.longitude],
      type: "Point",
    };
    setSightingData(tempSightingData);
    console.log(tempSightingData);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading please wait</Text>
      </View>
    );
  } else {
    return (
      <View style={smallMapStyles.container}>
        <Text style={textStyles.textMedium}>Select Location</Text>
        <View style={smallMapStyles.mapContainer}>
          {region.latitude && region.longitude ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={smallMapStyles.map}
              initialRegion={region}
              onRegionChangeComplete={handleRegionChange}
              customMapStyle={mapStyle}
            >
              <Marker coordinate={region} style={{ height: 35, width: 35 }}>
                <Image
                  source={require("../../assets/Binos2.png")}
                  style={{ height: 25, width: 35 }}
                />
              </Marker>
            </MapView>
          ) : (
            <View>
              <Text style={textStyles.textMedium}>Loading map please wait</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
};
