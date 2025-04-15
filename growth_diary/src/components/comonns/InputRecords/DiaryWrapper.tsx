import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

const DiaryWrapper = ({ children }: { children: ReactNode }) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 10,
  },
});

export default DiaryWrapper;
