import React from 'react';
import { StyleSheet, Text } from 'react-native';

const DiaryView = ({ value }: { value?: string }) => {
  return <Text style={styles.diary}>{value}</Text>;
};

const styles = StyleSheet.create({
  diary: {
    flex: 1,
    fontSize: 14,
    marginTop: 8,
    minHeight: 100,
    padding: 10,
  },
});

export default DiaryView;
