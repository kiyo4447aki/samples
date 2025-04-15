import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Title = ({ name }: { name: string }) => {
  return <Text style={styles.title}>{name}</Text>;
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: defaultTheme.letter,
    fontSize: 19,
    fontStyle: 'normal',
    fontWeight: 700,
  },
});
export default Title;
