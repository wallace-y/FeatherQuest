import { View, Text, Button, StyleSheet, useWindowDimensions} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { collection, getDocs, setDoc, doc, addDoc  } from "firebase/firestore";
import { db } from '../firebaseConfig.js'

import { UserContext } from "../utils/UserContext";

import BirdSelection from './BirdSelection.jsx';
import SelectLocation from './SelectLocation.jsx';
import DateSelection from './DateSelection.jsx';

export default PostSighting = () => {

    const {globalUser} = useContext(UserContext)
    const [ sightingData, setSightingData ] = useState({ bird: "", date: "" , location: "", user: globalUser.userId})
    const windowHeight = useWindowDimensions().height;
    
    //Post sightings data to db
    const Submit = () => {
        console.log("submited", sightingData, "submited",)

        addDoc(collection(db, "sightings"), sightingData)
        .then( docRef => {
            console.log(docRef)
        })
        // setDoc(doc(db, "sightings/test"), sightingData)
        // .then( result => {

        //     console.log(result)
        // })
        
    }

    return (
        <View style={
             [styles.pageContainer,
             {minHeight: Math.round(windowHeight -100), maxHeight: Math.round(windowHeight)}
            ]}
             >
            <View><Text>Post Your Sighting</Text></View>
            {/* Select Bird */}
            <BirdSelection setSightingData={setSightingData} sightingData={sightingData}/>
            {/* Select date */}
            <DateSelection setSightingData={setSightingData} sightingData={sightingData}/>
            {/* Select location */}
            <SelectLocation sightingData={sightingData} setSightingData={setSightingData}/>
            <View style={styles.submitbt}>
                <Button title="Submit" onPress={Submit} style={styles.submitbt} color="rgb(100, 150, 100)"
                disabled={sightingData.sighting_id === "" || sightingData.date === "" || sightingData.location === ""}
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