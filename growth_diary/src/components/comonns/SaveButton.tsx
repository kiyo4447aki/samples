import { defaultTheme } from '@/consts/theme';
import React from 'react';
import type { GestureResponderEvent, ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  text?: string;
  icon?: ImageSourcePropType;
  onPress?: (event: GestureResponderEvent) => void;
};

const SaveButton = ({ text, icon, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      {icon && <Image style={styles.icon} source={icon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: defaultTheme.mainColor,
    borderRadius: 4,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    height: 14,
    width: 14,
  },
  text: {
    color: defaultTheme.SaveButtonText,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 21,
  },
});

export default SaveButton;
