import { View, Text, Image, StyleSheet} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig.js'

import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

export default BirdSelection = ( { setSightingData, sightingData }) => {
    const [ birdList , setBirdList ] = useState([]);
    const {control, handleSubmit, formState: { errors }} = useForm();

    // Get birds images and names to display for selection
    useEffect(() => {
        getLocalBirdList()
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

    function getLocalBirdList() {
        return AsyncStorage.getItem('birdList')
        .then( result => {
            return JSON.parse(result).arr;
        })
    }

    const handleBirdSelect = (data) => {
        let tempSightingData = {...sightingData}
        tempSightingData.bird = data.id
        setSightingData(tempSightingData)
    }

    return (
        <View style={styles.containerSelectBirds}>
            <Controller name="Bird" control={control} rules={{required: true}} render={({field: {onChange, onBlur, value}}) => (
                <SelectDropdown
                    data={birdList}
                    onblur={onBlur}
                    onSelect={handleBirdSelect}
                    value={value}
                    dropdownStyle={styles.dropDown}
                    buttonStyle={styles.dropDownButton}
                    rowStyle={styles.dropdownRow}
                    search
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={styles.row}>
                                    {selectedItem ? (
                                        <Image source={{uri: selectedItem.image}} style={styles.image}/>
                                        ) : ( 
                                        <Image source={require('../assets/bird-select.jpg')} style={styles.image}/>
                                        )} 
                                    <Text style={styles.dropDownText} >{selectedItem ? selectedItem.title : 'Select Bird'}</Text>
                            </View>
                        );
                    }}
                    renderCustomizedRowChild={(item, index) => {
                        return (
                            <View style={styles.row}>
                                <Image source={{uri: item.image}} style={styles.image}/>
                                <Text style={styles.dropDownText} >{item.title}</Text>
                            </View>
                        );
                    }}
                    
                />
                )}
            />
            {errors.Bird && <Text>This is required.</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    containerSelectBirds: {
    },
    image: {
        // aspectRatio: 1,
        ...StyleSheet.absoluteFillObject,
    },
    dropdownRow: {
        height: 200,
        width: '100%',
    },
    dropDownButton: {
        borderWidth: 2,
        height: 200,
        width: '100%',
    },
    row: {
        flex:1,
        flexDirection: 'row',
    },
    dropDownText: {
        fontSize: 25,
        margin: 30,
        width: '100%',
        color: 'white',
        fontWeight: 'bold'
    },
    //TODO: when keyboard of opened the the dropdown is pushed up off screen, figure out how to fix it
    dropDown: {
        flex:1,
        minHeight: 500
    }
})