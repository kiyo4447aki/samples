import caretIcon from '@/assets/chevron-right.png';
import twitterIcon from '@/assets/twitter.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from '../ButtonBase';

const X = () => {
  return (
    <ButtonBase
      title="X"
      icon={twitterIcon}
      rightItem={<Image source={caretIcon} style={styles.caret} />}
    />
  );
};

const styles = StyleSheet.create({
  caret: {
    height: 20,
    width: 20,
  },
});

export default X;
