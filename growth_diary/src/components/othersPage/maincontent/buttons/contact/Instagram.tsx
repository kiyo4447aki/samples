import caretIcon from '@/assets/chevron-right.png';
import instagramIcon from '@/assets/instagram.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from '../ButtonBase';

const Instagram = () => {
  return (
    <ButtonBase
      title="Instagram"
      icon={instagramIcon}
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

export default Instagram;
