import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker#expo-users-notice
import { View, Button} from 'react-native';
import { useState } from 'react';

export default DateSelector = ( { onChange, setDateIsSet, date, setDate } ) => {
    const [ showDate, setShowDate ] = useState(false)

    return (
        <View>
            <Button title={date} onPress={ () => {setShowDate(true); setDateIsSet(false)}} color={'rgb(100, 150, 100)'}></Button>
            {showDate && <DateTimePicker 
                mode={'date'} 
                value={new Date()}
                onChange={(event, date) => {
                    setDate(date.toLocaleDateString())
                    setDateIsSet(true)
                    setShowDate(false)
                    onChange(event, date.getDate())
                }}
            />}
        </View>
    )
}