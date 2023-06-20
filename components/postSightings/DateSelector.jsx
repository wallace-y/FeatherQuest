import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker#expo-users-notice
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { styles, textStyles } from '../../styles/style.js'

export default DateSelector = ( { onChange, setDateIsSet, date, setDate } ) => {
    const [ showDate, setShowDate ] = useState(false)

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={ () => {setShowDate(true); setDateIsSet(false)}}>
                <Text style={textStyles.textMedium}>{date}</Text>
            </TouchableOpacity>
            {showDate && <DateTimePicker 
                mode={'date'} 
                value={new Date()}
                onChange={(event, date) => {
                    setShowDate(false)
                    setDate(date.toLocaleDateString())
                    setDateIsSet(true)
                    onChange(event, date.getDate())
                }}
            />}
        </View>
    )
}