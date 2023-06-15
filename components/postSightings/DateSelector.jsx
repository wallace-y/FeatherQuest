import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker#expo-users-notice
import { View, Button} from 'react-native';
import { useState } from 'react';

export default DateSelector = ( { onChange } ) => {
    const [ showDate, setShowDate ] = useState(false)
    const [ date, setDate ] = useState("Select date of sighting")

    return (
        <View>
            <Button title={date} onPress={ () => {setShowDate(true);}} color={'rgb(100, 150, 100)'}></Button>
            {showDate && <DateTimePicker 
                mode={'date'} 
                value={new Date()}
                onChange={(event, date) => {
                    
                    setDate(date.toLocaleDateString())
                    setShowDate(false)
                    onChange(event, date)
                }}
            />}
        </View>
    )
}