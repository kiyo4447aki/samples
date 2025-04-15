import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StyleSheet, View } from 'react-native';

type Props = {
  isPickerVisible: boolean;
  setIsPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DatePicker = ({ isPickerVisible, setIsPickerVisible, date, setDate }: Props) => {
  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setIsPickerVisible(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.wrapper}>
      {isPickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
          locale="ja-JP"
          style={styles.picker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {},
  wrapper: {},
});

export default DatePicker;
