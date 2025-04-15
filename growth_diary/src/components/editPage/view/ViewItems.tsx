import editIcon from '@/assets/pencil-square.png';
import Title from '@/components/comonns/InputRecords/Title';
import ContentArea from '@/components/topPage/mainContent/wrapper/ContentArea';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParamList } from '@/navigation/EditStack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DiaryWrapper from '../../comonns/InputRecords/DiaryWrapper';
import RowWrapper from '../../comonns/InputRecords/RowWrapper';
import SliderWrapper from '../../comonns/InputRecords/SliderWrappr';
import SaveButton from '../../comonns/SaveButton';
import DiaryView from './DiaryView';
import Indicator from './Indicator';
import ItemTitle from './ItemTitle';

type EditPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'editPage'>;

type Props = {
  title: string;
  effortValue: number;
  setEffortValue: React.Dispatch<React.SetStateAction<number>>;
  growthValue: number;
  setGrowthValue: React.Dispatch<React.SetStateAction<number>>;
  diaryText: string;
  setDiaryText: React.Dispatch<React.SetStateAction<string>>;
  isScrolling: boolean;
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewItems = ({ title, effortValue, growthValue, setIsScrolling, diaryText }: Props) => {
  const navigation = useNavigation<EditPageNavigationProp>();
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={false}
      enableResetScrollToCoords={false}
      enableAutomaticScroll={true}
      keyboardOpeningTime={0}
      onScroll={() => {
        setIsScrolling(true);
      }}
    >
      <ContentArea>
        <Title name={title} />
        <SliderWrapper>
          <RowWrapper>
            <ItemTitle title="今日の頑張り" />
            <Indicator value={effortValue} />
          </RowWrapper>
        </SliderWrapper>
        <SliderWrapper>
          <RowWrapper>
            <ItemTitle title="今日の成長" />
            <Indicator value={growthValue} />
          </RowWrapper>
        </SliderWrapper>
        <DiaryWrapper>
          <RowWrapper>
            <ItemTitle title="日記" />
          </RowWrapper>
          <DiaryView value={diaryText} />
        </DiaryWrapper>
        <SaveButton
          text="記録を編集"
          icon={editIcon}
          onPress={() => {
            navigation.navigate('editPage');
          }}
        />
      </ContentArea>
    </KeyboardAwareScrollView>
  );
};

export default ViewItems;
