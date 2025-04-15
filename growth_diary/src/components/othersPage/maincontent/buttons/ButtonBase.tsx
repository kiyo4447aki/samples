import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { GestureResponderEvent } from 'react-native';

type Props = {
  icon: ImageSourcePropType;
  title: string;
  rightItem?: React.ReactNode;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  touchable?: boolean;
};

const ButtonBase = ({
  icon,
  title,
  rightItem,
  roundedBottom = false,
  roundedTop = false,
  onPress,
  touchable = true,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, getBorderStyle(roundedTop, roundedBottom)]}
      onPress={onPress}
      disabled={!touchable}
    >
      <View style={styles.titleLayout}>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightItem}
    </TouchableOpacity>
  );
};

const getBorderStyle = (roundedTop: boolean, roundedBottom: boolean) => {
  const border = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 0,
  };

  if (roundedTop) {
    border.borderTopLeftRadius = 9;
    border.borderTopRightRadius = 9;
    border.borderTopWidth = 1;
  }
  if (roundedBottom) {
    border.borderBottomLeftRadius = 9;
    border.borderBottomRightRadius = 9;
  }
  const style = StyleSheet.create({
    border: border,
  });
  return style.border;
};

const styles = StyleSheet.create({
  icon: {
    height: 18,
    marginRight: 15,
    width: 18,
  },
  title: {
    alignSelf: 'center',
    color: defaultTheme.letter,
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 15,
    textAlign: 'center',
  },
  titleLayout: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 24,
    justifyContent: 'flex-start',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: defaultTheme.border,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default ButtonBase;
