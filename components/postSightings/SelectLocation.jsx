import { View, Text, StyleSheet, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
import { useState } from 'react';
import { smallMapStyles, styles } from '../../styles/style.js';
import mapStyle from '../../styles/mapStyle.js'

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
         <View style={smallMapStyles.container}>
            <View>
                <Text style={styles.textMedium}>Select Location</Text>
            </View>
            <View style={smallMapStyles.mapContainer}>
                <MapView style={smallMapStyles.map}
                    initialRegion={region}
                    onRegionChangeComplete={handleRegionChange}
                    customMapStyle={mapStyle}>
                    <Marker coordinate={region} style={{height: 35, width:35}}>
                        <Image source={require('../../assets/Binos2.png')} style={{height:25, width:35}}/>
                    </Marker>
                </MapView>
            </View>
        </View>
    )
}

