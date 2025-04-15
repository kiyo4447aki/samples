import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ContentArea = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultTheme.ContentArea,
    borderRadius: 14,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
});

export default ContentArea;
