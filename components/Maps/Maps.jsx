import MapView, {PROVIDER_GOOGLE } from 'react-native-maps'; //https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
import { View, Text, StyleSheet} from 'react-native';
import { collection, getDocs} from "firebase/firestore";
import { useEffect, useState} from 'react';
import { db } from '../../firebaseConfig.js'

import SightingMarker from './SightingMarker.jsx';
import mapStyle from '../../styles/mapStyle.js'
import * as React from 'react'

export default Maps = ({ navigation }) => {

  const region = {
    latitude: 53.475906,
    longitude: -2.248188,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }
  
  const [ sightingsList, setSightingList ] = useState([]);
  const [ loadingMarkers, setLoadingMarkers ] = useState(true);
  const [ mapCentered, setMapCentered] = useState(false)
  
  //Fetch sightings data
  useEffect( () => {
    getDocs(collection(db, "sightings"))
    .then((data) => {
        const sightingArr =  []
        data.forEach( sighting => {
          sightingArr.push( sighting.data())
        })
        setSightingList(sightingArr)
        setLoadingMarkers(false)
    })
    .catch( err => {
      console.log(" Failed to fetch sightings", err)
    })
  }, [])

  if( loadingMarkers ){
    return <Text>Loading...</Text>
  }else{
    return (
      <View styles={styles.container}>
        <Text style={styles.headerText}>Sightings Near You</Text>
        <View style={styles.mapContainer}>
       
          <MapView 
            provider={PROVIDER_GOOGLE}
            onRegionChangeComplete={()=> { setMapCentered(true)} }
            onRegionChange={()=> { setMapCentered(false)} }
            style={styles.map}
            initialRegion={region}
            customMapStyle={mapStyle}
            >
            {sightingsList.map( (sighting) => {
              return <SightingMarker key={sighting.created_at} navigation={navigation} sighting={sighting} mapCentered={mapCentered} setMapCentered={setMapCentered}/>
            })}
          </MapView>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#7A918D",
    borderWidth: 2,
    color: 'red'
  },
  headerContainer:{
    backgroundColor: "#7A918D",
    borderWidth: 2,
    color: 'red'
  },
  headerText: {
    minHeight: '5%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: "#7A918D"

  },
  mapContainer: {
    borderRadius: 10, 
    borderWidth: 5,
    borderColor: '#7A918D',
    margin: 10,
    overflow: 'hidden',
    minHeight: "90%",
    backgroundColor: "#7A918D"
},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  
})
