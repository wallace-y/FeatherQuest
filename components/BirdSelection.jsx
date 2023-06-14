import { View, Text, Image, StyleSheet} from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import SelectDropdown from 'react-native-select-dropdown';

export default BirdSelection = ( { birdList, setSightingData, sightingData }) => {

    const {control, handleSubmit, formState: { errors }} = useForm();

    const handleBirdSelect = (data) => {
        let tempSightingData = {...sightingData}
        tempSightingData.id = data.id
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