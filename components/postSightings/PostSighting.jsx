import { View, Text, Button, StyleSheet, useWindowDimensions} from 'react-native';
import { useState, useContext } from 'react';
import { collection, addDoc  } from "firebase/firestore";
import { UserContext } from "../../utils/UserContext";
import { db } from '../../firebaseConfig.js'

import BirdSelection from './BirdSelection.jsx';
import DateSelection from './DateSelection.jsx';
import SelectLocation from './SelectLocation.jsx';

export default PostSighting = () => {

    const { globalUser } = useContext(UserContext)
    const [ sightingData, setSightingData ] = useState({ bird: "", date: "" , location: "", user: globalUser.userId})
    const windowHeight = useWindowDimensions().height;
    
    //Post sightings data to db
    const Submit = () => {
        console.log("submited", sightingData, "submited",)
        // COOMENTED for dev purpososes
        // addDoc(collection(db, "sightings"), sightingData)
        // .then( docRef => {
        //     console.log(docRef)
        // })
    }

    return (
        <View style={
             [styles.pageContainer,
             {minHeight: Math.round(windowHeight -100), maxHeight: Math.round(windowHeight)}]} >
            <View><Text style={styles.pagetitle}>Post Your Sighting</Text></View>
            <BirdSelection setSightingData={setSightingData} sightingData={sightingData}/>
            {/* 
                TODO: Input link to idetification
            */}
            <DateSelection setSightingData={setSightingData} sightingData={sightingData}/>
            <SelectLocation sightingData={sightingData} setSightingData={setSightingData}/>
            <View style={styles.submitbt}>
                <Button title="Submit" onPress={Submit} style={styles.submitbt} color="rgb(100, 150, 100)"
                disabled={sightingData.bird === "" || sightingData.date === "" || sightingData.location === ""}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#7A918D"
    },
    submitbt: {
        position: 'relative'
    },
    pagetitle: {
        fontSize:20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 10
    }
})