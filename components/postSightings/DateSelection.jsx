import { View, StyleSheet } from 'react-native';
import DateSelector from './DateSelector.jsx'
import TimeSelector from './TimeSelector.jsx'
import { useState, useEffect } from 'react'

export default DateSelection = ( { sightingData, setSightingData} ) => {


    const defaultTimeText = "Select time of sighting";
    const defaultDateText = "Select date of sighting";

    const [ dateIsSet, setDateIsSet ] = useState(false)
    const [ timeIsSet, setTimeIsSet ] = useState(false)
    const [ date, setDate ] = useState(defaultDateText)
    const [ time, setTime ] = useState(defaultTimeText)

    useEffect(() => {
        if( dateIsSet && timeIsSet){
            let sightingDate = [...date.split("/").reverse(), ...time.split(":")].map( str => Number(str))
            let tempSightingData = {...sightingData}
            tempSightingData.date_spotted = new Date(Date.UTC(...sightingDate)).toISOString()
            setSightingData(tempSightingData)
        }
    }, [ dateIsSet, timeIsSet])
    
    return (
        <View style={styles.containerDate}>
            <DateSelector setDateIsSet={setDateIsSet} date={date} setDate={setDate}/>
            { dateIsSet && <TimeSelector time={time} setTime={setTime} setTimeIsSet={setTimeIsSet}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    containerDate: {
        borderWidth: 2,
    }
})