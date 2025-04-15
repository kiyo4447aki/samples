import { headerTheme } from '@/consts/theme';
import React from 'react';
import type { GestureResponderEvent, ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onPressLeft?: (event: GestureResponderEvent) => void;
  onPressRight?: (event: GestureResponderEvent) => void;
};

const Header = (props: Props) => {
  const { title, leftIcon, rightIcon, onPressLeft, onPressRight } = props;
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <TouchableOpacity style={styles.iconContainer} onPress={onPressLeft}>
          <Image source={leftIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.icon} />
      )}

      <Text style={styles.title}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity style={styles.icon} onPress={onPressRight}>
          <Image source={rightIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: headerTheme.background,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconContainer: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  title: {
    alignItems: 'center',
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;
