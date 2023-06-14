import { View, Text, Button, StyleSheet, useWindowDimensions, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig.js'

import AsyncStorage from '@react-native-async-storage/async-storage';

import BirdSelection from './BirdSelection.jsx';
import SelectLocation from './SelectLocation.jsx';
import DateSelection from './DateSelection.jsx';

export default PostSighting = () => {

    const [ birdList , setBirdList ] = useState([]);
    const [ sightingData, setSightingData ] = useState({ id: "", date: "" , location: ""})
    const windowHeight = useWindowDimensions().height;

    let dateNotSelected = false;
    // Get birds images and names to display for selection
    useEffect(() => {
        getBirdList()
        .then( birds => {
            if(Array.isArray(birds)){
                setBirdList(birds)
            }else{
                getDocs(collection(db, "birds"))
                .then((data) => {
                    const arr =  []
                    data.forEach( bird => {
                        arr.push({
                            id: bird.data().id, 
                            title: bird.data().common_name,
                            image: bird.data().bird_image_url})
                    })
                    setBirdList(arr)
                    return AsyncStorage.setItem('birdList', JSON.stringify({arr}))
                })
            }
        })
    }, [])
    
    function getBirdList() {
        return AsyncStorage.getItem('birdList')
        .then( result => {
            return JSON.parse(result).arr;
        })
    }

    //Post sightings data to db
    const Submit = () => {
        console.log("submited", sightingData, "submited",)
        
    }

    return (
        <View style={
             [styles.pageContainer,
             {minHeight: Math.round(windowHeight -100), maxHeight: Math.round(windowHeight)}
            ]}
             >
            <View><Text>Post Your Sighting</Text></View>
            {/* Select Bird */}
            <BirdSelection birdList={birdList} setSightingData={setSightingData} sightingData={sightingData}/>
            {dateNotSelected && <Text>SELECTDATE</Text>}
            {/* Select date */}
            <DateSelection setSightingData={setSightingData} sightingData={sightingData}/>
            {/* Select location */}
            <SelectLocation sightingData={sightingData} setSightingData={setSightingData}/>
            <View style={styles.submitbt}>
                <Button title="Submit" onPress={Submit} style={styles.submitbt} color="rgb(100, 150, 100)"
                disabled={sightingData.id === "" || sightingData.date === "" || sightingData.location === ""}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer:{
        flex: 1,
        justifyContent: 'center'
    },
    submitbt: {position: 'relative'
    }
})