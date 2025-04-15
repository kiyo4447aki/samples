import React, { useState } from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import CalenderItems from './calender/CalenderItems';
import ViewItems from './view/ViewItems';
import Wrapper from './Wrapper';

const Viewer = () => {
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [effortValue, setEffortValue] = useState<number>(0);
  const [growthValue, setGrowthValue] = useState<number>(0);
  const [diaryText, setDiaryText] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const closePicker = () => {
    setIsPickerVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closePicker}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Wrapper>
          <CalenderItems
            date={date}
            setDate={setDate}
            setIsPickerVisible={setIsPickerVisible}
            isPickerVisible={isPickerVisible}
          />
          <ViewItems
            title="タイトル"
            effortValue={effortValue}
            setEffortValue={setEffortValue}
            growthValue={growthValue}
            setGrowthValue={setGrowthValue}
            diaryText={diaryText}
            setDiaryText={setDiaryText}
            isScrolling={isScrolling}
            setIsScrolling={setIsScrolling}
          />
        </Wrapper>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Viewer;
