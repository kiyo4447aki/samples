import { headerTheme } from '@/consts/theme';
import TabNabigation from '@/navigation/Tab';
import React from 'react';
import { SafeAreaView } from 'react-native';
const App = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: headerTheme.background }} />
      <TabNabigation />
    </>
  );
};

export default App;
