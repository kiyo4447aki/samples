import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultTheme.ContentArea,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Wrapper;
