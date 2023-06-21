import { View, Text, Image, Keyboard} from 'react-native';
import { collection, getDocs,onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig.js'

import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { dropDownStyle } from '../../styles/style.js';


export default BirdSelection = ( { setSightingData, sightingData }) => {
    const [ birdList , setBirdList ] = useState([]);
    const [ dropDownMargin, setDropDownMargin ] = useState(-120);

    /* Command to remove bird list from local storage */
    // AsyncStorage.removeItem('birdList').then( (result) => {
    // })

    Keyboard.addListener('keyboardDidShow', () => {
        setDropDownMargin(150)
    })
    Keyboard.addListener('keyboardDidHide', () => { 
        setDropDownMargin(-120)
    })
    
    
    // Get bird images and names to display for selection
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
                            common_name: bird.data().common_name,
                            sighting_img_url: bird.data().bird_image_url})
                    })
                    setBirdList(arr)
                    //Store the bird data to local storage
                    return AsyncStorage.setItem('birdList', JSON.stringify({arr}))
                })
                .catch( err => console.log(err))
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
    // Remove the local storage of birds if there is a change to the collection (ie for a refresh)
    useEffect(() => {
        const birdsCollectionRef = collection(db, 'birds');
    
        const clearListOnChange = onSnapshot(birdsCollectionRef, (snapshot) => {
          const arr = [];
          snapshot.forEach((bird) => {
            arr.push({
              id: bird.data().id,
              common_name: bird.data().common_name,
              sighting_img_url: bird.data().bird_image_url,
            });
          });
    
          setBirdList(arr);
    
          AsyncStorage.removeItem('birdList')
            .then(() => {
              console.log('Bird list cleared from AsyncStorage');
            })
            .catch((err) => {
              console.log('Failed to clear bird list from AsyncStorage', err);
            });
        });
    
        return () => {
            clearListOnChange();
        };
      }, []);

    const handleBirdSelect = (data) => {
        let tempSightingData = {...sightingData}
        tempSightingData.bird = data.common_name
        tempSightingData.sighting_img_url = data.sighting_img_url
        setSightingData(tempSightingData)
    }

    return (
        <View>
            <SelectDropdown
                data={birdList}
                onSelect={handleBirdSelect}
                dropdownStyle={{marginTop: dropDownMargin, minHeight: 500, borderRadius: 10}}//Only works with one style sorouce
                buttonStyle={dropDownStyle.dropDownButton}
                rowStyle={dropDownStyle.dropdownRow}
                search
                searchPlaceHolderColor='white'
                searchInputTxtStyle={dropDownStyle.searchInputText}
                searchPlaceHolder={"Search..."}
                searchInputStyle={dropDownStyle.searchInput}
                renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                        <View style={dropDownStyle.row}>
                            {selectedItem ? (
                                <Image source={{uri: selectedItem.sighting_img_url}} style={dropDownStyle.image} />
                                ) : ( 
                                <Image source={require('../../assets/bird-select.jpg')} style={dropDownStyle.image}/>
                                )} 
                            <Text style={dropDownStyle.dropDownText} >{selectedItem ? selectedItem.common_name : 'Select Bird'}</Text>
                        </View>
                    );
                }}
                renderCustomizedRowChild={(item, index) => {
                    return (
                        <View style={dropDownStyle.row}>
                            <Image source={{uri: item.sighting_img_url}} style={dropDownStyle.image}/>
                            <Text style={dropDownStyle.dropDownText} >{item.common_name}</Text>
                        </View>
                    );
                }}
            />
        </View>
    )
}

// const styles = StyleSheet.create({
//     containerSelectBirds: {
//         backgroundColor: "#7A918D"
//     },
//     image: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     dropDownButton: {
//         borderWidth: 2,
//         height: 200,
//         width: '80%',
//         backgroundColor: "#7A918D"
//     },
//     dropdownRow: {
//         height: 200,
//     },
//     row: {
//         flex:1,
//         flexDirection: 'row',
//     },
//     dropDownText: {
//         fontSize: 25,
//         margin: 30,
//         width: '100%',
//         color: 'white',
//         fontWeight: 'bold'
//     },
//     dropDown: {
//         flex:1,
//         minHeight: 1000,
//     },
//     searchInput: {
//         backgroundColor: "rgb(100, 150, 100)",
//     }
// })