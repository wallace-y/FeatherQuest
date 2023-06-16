import { View, Text, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native';
import React, { useEffect } from 'react';
import { Callout } from 'react-native-maps';
import dayjs from "dayjs";

// ISUE: The image in the card does note render at first time the callout opens. Image appears on the third press of the marker
export default SightingCard = ( { sightedBird, navigation, sighting, modalVisible, setModalVisible, marker,  mapCentered}) => {
    
    function cacheImages(images) {
        return images.map(image => {
          if (typeof image === 'string') {
            return Image.prefetch(image);
          } else {
            return Asset.fromModule(image).downloadAsync();
          }
        });
      }


    useEffect( () => {
        try {
            const imageAssets = cacheImages([
                sightedBird.bird_image_url,
            ]);
            Promise.all([...imageAssets, ])
        } catch (err) {
            console.warn(err)
        }
    }, [])

    //Navigate to Sighting
    function handlePress () {
        console.log("close")
        setModalVisible(false)
        marker.hideCallout()
        navigation.navigate("Sighting", {...sightedBird, ...sighting})
    }
   
    return (
        <Callout  onPress={handlePress} tooltip style={styles.callout}>
            <View  style={styles.container}>
                <Modal
                    visible={ modalVisible && mapCentered}
                    transparent={true}
                    hardwareAccelerated={true}
                >   
                    <TouchableOpacity style={styles.screenOpacity} onPress={()=> {marker.hideCallout(); setModalVisible(false)}}>
                        <TouchableOpacity style={styles.cardOpacity} onPress={handlePress}>
                            <Image style={styles.popupImage} source={{uri: sightedBird.bird_image_url, cache: 'only-if-cached'}} tracksViewChanges></Image>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
                <View styles={styles.imageContainer}>
                    <Text style={styles.calloutText}>
                        {sightedBird.common_name}
                    </Text>
                    <Text style={styles.calloutText}>
                        {dayjs(sighting.date_spotted).format("HH:mm:ss DD-MM-YYYY")}
                    </Text>
                </View>
            </View>
        </Callout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 20,
        width: 200,
        height: 200,
        backgroundColor: '#7A918D',
        
    },
    screenOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:200,
        maxHeight: 200,
        borderRadius: 20,
        marginTop: -180
    },
    calloutText: {
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
        rowGap: 10,
    },
    callout: {
        height: 200,
        width: 204,
        borderWidth: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupImage:{
        height: 140,
        width: 170,
    }
})