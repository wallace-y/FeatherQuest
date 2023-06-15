import { View, Text, Image, StyleSheet, Keyboard} from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig.js'

import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';



export default BirdSelection = ( { setSightingData, sightingData }) => {
    const [ birdList , setBirdList ] = useState([]);
    const [ dropDownMargin, setDropDownMargin ] = useState(-90);

    // AsyncStorage.removeItem('birdList').then( (result) => {
    // })

    Keyboard.addListener('keyboardDidShow', () => {
        setDropDownMargin(245)
    })
    Keyboard.addListener('keyboardDidHide', () => {
        setDropDownMargin(-90)
    })
    
    
    // Get bird images and names to display for selection
    useEffect(() => {
        getLocalBirdList()
        .then( birds => {
            if(Array.isArray(birds)){
                console.log("local")
                setBirdList(birds)
            }else{
                console.log('fetch')
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
                    //Store the bird data to local storage
                    return AsyncStorage.setItem('birdList', JSON.stringify({arr}))
                })
            }
        })
        .catch( err => {
            console.log("Failed to load birds list", err)
        })
    }, [])

    // Retrieve stored list from local storage
    function getLocalBirdList() {
        return AsyncStorage.getItem('birdList')
        .then( result => {
            return JSON.parse(result).arr;
        }).catch( err => {
            console.log( "Failed to load birds from local storage", err)
        })
    }

    const handleBirdSelect = (data) => {
        let tempSightingData = {...sightingData}
        tempSightingData.bird = data.id
        setSightingData(tempSightingData)
    }

    return (
        <View style={styles.containerSelectBirds}>
                <SelectDropdown
                    data={birdList}
                    onSelect={handleBirdSelect}
                    dropdownStyle={ { marginTop: dropDownMargin, minHeight: 500 }}
                    buttonStyle={styles.dropDownButton}
                    rowStyle={styles.dropdownRow}
                    search
                    onSearch={() => {console.log("Search")}}
                    searchPlaceHolder={"Search..."}
                    searchInputStyle={styles.searchInput}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                            <View style={styles.row}>
                                    {selectedItem ? (
                                        <Image source={{uri: selectedItem.image}} style={styles.image}/>
                                        ) : ( 
                                        <Image source={require('../../assets/bird-select.jpg')} style={styles.image}/>
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
        </View>
    )
}

const styles = StyleSheet.create({
    containerSelectBirds: {
        backgroundColor: "#7A918D"
    },
    image: {
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
        backgroundColor: "#7A918D"
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
    dropDown: {
        flex:1,
        minHeight: 1000,
    },
    searchInput: {
        backgroundColor: "rgb(100, 150, 100)",
    }
})