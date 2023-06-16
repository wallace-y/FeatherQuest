import { View, Text, StyleSheet, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
import { useState } from 'react';

export default SelectLocation = ( { sightingData, setSightingData }) => {

    const [ region, setRegion ] = useState({
        latitude: 53.475906,
        longitude: -2.248188,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })

    const handleRegionChange = (region) => {
        setRegion(region)
        let tempSightingData = {...sightingData}
        tempSightingData.coordinates = { coordinates: [region.longitude, region.latitude], type: "Point"}
        setSightingData(tempSightingData)
    }

    return (
         <View style={styles.container}>
            <Text>Select Location</Text>
            <View style={styles.mapContainer}>
                <MapView style={styles.map}
                    initialRegion={region}
                    onRegionChangeComplete={handleRegionChange}>
                    <Marker coordinate={region} style={{height: 35, width:35}}>
                        <Image source={require('../../assets/Binos2.png')} style={{height:25, width:35}}/>
                    </Marker>
                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapContainer: {
        borderWidth: 2,
        ...StyleSheet.absoluteFillObject,
    },container:{
        flex: 1,
        borderWidth: 2,
        borderColor: "#7A918D",
        height: '100%',
        width: '100%',
    }
})
