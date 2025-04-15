import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from '../picker/DatePicker';

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPickerVisible: boolean;
};

const CalenderHeader = ({ date, setDate, setIsPickerVisible, isPickerVisible }: Props) => {
  const onHeaderPress = () => {
    setIsPickerVisible(true);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onHeaderPress} style={styles.header}>
        <Text style={styles.headerText}>{`${date.getFullYear()}年${date.getMonth() + 1}月`}</Text>
      </TouchableOpacity>
      <DatePicker
        date={date}
        setDate={setDate}
        isPickerVisible={isPickerVisible}
        setIsPickerVisible={setIsPickerVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  headerText: {
    color: defaultTheme.letter,
    fontSize: 18,
    fontWeight: 400,
  },
  wrapper: {},
});

export default CalenderHeader;
