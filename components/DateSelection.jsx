import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker#expo-users-notice
import { View, Text, Button, StyleSheet, Image} from 'react-native';
import { useState } from 'react';

export default DateSelection = ( { sightingData, setSightingData} ) => {
    

    const [ showDate, setShowDate ] = useState(false) 
    const [ date, setDate ] = useState("Select date of sighting")

    console.log("DateSelection=======", showDate)

    //Display date
    const onChange = (event, selectedDate) => {
        console.log("event type",event.type)

        if(event.type === 'dismissed'){
        }else if(event.type === 'set'){
            setDate(selectedDate.toISOString())
            let tempSightingData = {...sightingData}
            tempSightingData.date = selectedDate
            setSightingData(tempSightingData)
        }
        setShowDate(false)
    };
    
    function renderPicker() {
        if(showDate){
            console.log("render calendar")
            return ( 
            <DateTimePicker 
                mode={'date'} 
                value={new Date()}
                onChange={onChange}
            />)
        }else{
            
        }
    }

    return (
        <View style={styles.containerDate}>
            <Text>{date}</Text>
            <Button title={'Date'} onPress={ () => { setShowDate(true);}}></Button>
            { renderPicker() }
        </View>
    )
}

const styles = StyleSheet.create({
    containerDate: {
        borderWidth: 2,
    }
})