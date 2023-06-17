import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker#expo-users-notice
import { View, Button} from 'react-native';
import { useState } from 'react';

export default DateSelector = ( { onChange, setTimeIsSet,  time, setTime } ) => {
    const [ showTime, setShowTime ] = useState(false) 

    return (
        <View>
            <Button title={time} onPress={ () => {setShowTime(true); setTimeIsSet(false)}} color={'rgb(100, 150, 100)'}></Button>
            {showTime && <DateTimePicker 
                mode={'time'} 
                value={new Date()}
                onChange={(event, date) => {

                    setTime(date.toLocaleTimeString())
                    setTimeIsSet(true)
                    setShowTime(false)
                    onChange(event, date)
                }}
            />} 
        </View>
    )
}