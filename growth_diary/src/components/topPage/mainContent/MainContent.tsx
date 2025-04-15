import plusIcon from '@/assets/Add.png';
import Title from '@/components/comonns/InputRecords/Title';
import ContentArea from '@/components/topPage/mainContent/wrapper/ContentArea';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DiaryInput from '../../comonns/InputRecords/DiaryInput';
import DiaryWrapper from '../../comonns/InputRecords/DiaryWrapper';
import ItemTitle from '../../comonns/InputRecords/ItemTitle';
import RowWrapper from '../../comonns/InputRecords/RowWrapper';
import SliderUnit from '../../comonns/InputRecords/SliderUnit';
import SliderWrapper from '../../comonns/InputRecords/SliderWrappr';
import SaveButton from '../../comonns/SaveButton';

const MainContent = ({ title }: { title: string }) => {
  const [effortValue, setEffortValue] = useState<number>(0);
  const [growthValue, setGrowthValue] = useState<number>(0);
  const [diaryText, setDiaryText] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
      enableResetScrollToCoords={false}
      enableAutomaticScroll={true}
      keyboardOpeningTime={0}
      onScroll={() => {
        setIsScrolling(true);
      }}
      showsVerticalScrollIndicator={false}
    >
      <ContentArea>
        <Title name={title} />
        <SliderWrapper>
          <RowWrapper>
            <ItemTitle title="今日の頑張り" />
            <Text style={styles.indicator}>{effortValue}</Text>
          </RowWrapper>
          <SliderUnit onChange={e => setEffortValue(e)} />
        </SliderWrapper>
        <SliderWrapper>
          <RowWrapper>
            <ItemTitle title="今日の成長" />
            <Text style={styles.indicator}>{growthValue}</Text>
          </RowWrapper>
          <SliderUnit onChange={e => setGrowthValue(e)} />
        </SliderWrapper>
        <DiaryWrapper>
          <ItemTitle title="日記" />
          <DiaryInput
            value={diaryText}
            onChange={e => setDiaryText(e)}
            isScrolling={isScrolling}
            setIsScrolling={setIsScrolling}
          />
        </DiaryWrapper>
        <SaveButton text="記録を保存" icon={plusIcon} />
      </ContentArea>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  indicator: {},
});

export default MainContent;
