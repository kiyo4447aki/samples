import React from 'react';
import { StyleSheet, View } from 'react-native';

const RowWrapper = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default RowWrapper;
