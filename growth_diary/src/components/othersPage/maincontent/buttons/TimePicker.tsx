import { defaultTheme } from '@/consts/theme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
  onChangeTime?: (selectedTime?: Date) => void;
};

const TimePicker = ({ time, setTime, onChangeTime }: Props) => {
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setIsPickerVisible(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
    if (onChangeTime) {
      onChangeTime(selectedTime);
    }
  };

  return (
    <>
      {!isPickerVisible && (
        <TouchableOpacity style={styles.button} onPress={() => setIsPickerVisible(true)}>
          <Text style={styles.text}>
            {time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
      )}
      {isPickerVisible && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          is24Hour={true}
          onChange={onChange}
          locale="ja-JP"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultTheme.border,
    borderRadius: 6,
    marginVertical: -15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: defaultTheme.letter,
  },
});

export default TimePicker;
