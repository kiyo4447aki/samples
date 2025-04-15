import React from 'react';
import { StyleSheet, View } from 'react-native';

const SliderWrappr = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
});

export default SliderWrappr;
