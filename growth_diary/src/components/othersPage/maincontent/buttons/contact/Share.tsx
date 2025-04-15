import caretIcon from '@/assets/chevron-right.png';
import shareIcon from '@/assets/share.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from '../ButtonBase';

const Share = () => {
  return (
    <ButtonBase
      title="シェア"
      icon={shareIcon}
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

export default Share;
