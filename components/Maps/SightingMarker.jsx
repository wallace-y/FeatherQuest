import { collection, getDocs, where, query } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig.js'
import { Marker} from 'react-native-maps';

import SightingCard from './SightingCard.jsx'

export default SightingMarker = ( { navigation, sighting, mapCentered, setMapCentered }) => {

    const [ sightedBird, setSightedBird ] = useState([])
    const [ loadingBirds, setLoadingBirds ] = useState(true)
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ markerPressed, setMarkerPressed ] = useState(false)
    
    
    const [marker, setMarker ] = useState()
    //Fetch data of sightings bird
    useEffect( () => { 
        getDocs(query(collection(db, "birds"), where("common_name", "==", sighting.bird)))
        .then( (bird) => {
            const birdArr = []
            bird.forEach( bird => {
                birdArr.push(bird.data())
            })
            setSightedBird(birdArr)
            setLoadingBirds(false)
            
        })
        .catch( err => {
            console.log("Failed to load bird data", err)
        })
    }, [])

    //Gett coordinates for a marker
    const sightingCoordinates = {
        latitude: Number(sighting.coordinates.coordinates[0].toFixed(4)),
        longitude: Number(sighting.coordinates.coordinates[1].toFixed(4)),
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }


    if(loadingBirds){
        return 
    }
    return <Marker coordinate={sightingCoordinates} 
            icon={require('../../assets/bino2_small.png')}
            title="Sighting"
            description="Sighting description"
            tracksViewChanges={false}
            onPress={()=> { setMarkerPressed(true); marker.showCallout(); setModalVisible(true)}}
            ref={ref=> {setMarker(ref)}}
            >
                <SightingCard sightedBird={sightedBird[0]} navigation={navigation} sighting={sighting} modalVisible={modalVisible} setModalVisible={setModalVisible} marker={marker} mapCentered={mapCentered} setMapCentered={setMapCentered}/>
            </Marker> 
}
