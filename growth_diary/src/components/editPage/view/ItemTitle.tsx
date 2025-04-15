import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ItemTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: defaultTheme.letter,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 400,
  },
});

export default ItemTitle;
