import { View, StyleSheet } from 'react-native';
import DateSelector from './DateSelector.jsx'
import TimeSelector from './TimeSelector.jsx'

export default DateSelection = ( { sightingData, setSightingData} ) => {

    const onChange = (event, selectedDate) => {
        if(event.type === 'set'){
            let tempSightingData = {...sightingData}
            tempSightingData.date_spotted = selectedDate.toISOString()
            setSightingData(tempSightingData)
        }
    };
    
    return (
        <View style={styles.containerDate}>
            <DateSelector onChange={onChange}/>
            <TimeSelector onChange={onChange}/>
        </View>
    )
}

const styles = StyleSheet.create({
    containerDate: {
        borderWidth: 2,
    }
})