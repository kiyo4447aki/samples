import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import CalenderHeader from './CalenderHeader';

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPickerVisible: boolean;
};

const CalenderItems = ({ date, setDate, setIsPickerVisible, isPickerVisible }: Props) => {
  const formatDate = (date: Date): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const onDayPress = (day: DateData) => {
    setDate(new Date(day.dateString));
  };

  const onPressArrowLeft = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const onPressArrowRight = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  // カレンダーのスタイルを設定
  const getMarkedDates = (month: Date) => {
    const marked: MarkedDates = {};
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    for (let i = 1; i <= 31; i++) {
      const date = new Date(year, monthIndex, i);
      if (date.getMonth() !== monthIndex) break; // 余計な日付を排除
      const dateString = date.toISOString().split('T')[0];

      if (date.getDay() === 1) {
        marked[dateString] = { customStyles: { text: { color: '#CA6273' } } };
      } else if (date.getDay() === 0) {
        marked[dateString] = { customStyles: { text: { color: '#3D87B6' } } };
      }
    }

    // 選択した日付を枠で囲む
    const selectedDate = formatDate(date);
    marked[selectedDate] = {
      selected: true,
      selectedColor: 'transparent',
      customStyles: {
        container: {
          borderWidth: 1,
          borderColor: defaultTheme.mainColor,
          borderRadius: 5,
        },
        text: { color: 'black' },
      },
    };

    return marked;
  };

  return (
    <View style={styles.container}>
      <Calendar
        initialDate={formatDate(date)}
        current={formatDate(new Date())}
        onDayPress={onDayPress}
        renderHeader={() => (
          <CalenderHeader
            date={date}
            setDate={setDate}
            setIsPickerVisible={setIsPickerVisible}
            isPickerVisible={isPickerVisible}
          />
        )}
        onPressArrowLeft={onPressArrowLeft}
        onPressArrowRight={onPressArrowRight}
        hideArrows={isPickerVisible}
        markingType="custom"
        markedDates={getMarkedDates(date)}
        theme={{
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          todayTextColor: 'blue',
          arrowColor: defaultTheme.mainColor,
        }}
        hideDayNames={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CalenderItems;
