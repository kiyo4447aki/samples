import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ItemTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'stretch',
    color: defaultTheme.letter,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
  },
});

export default ItemTitle;
