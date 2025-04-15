import caretIcon from '@/assets/chevron-right.png';
import houseIcon from '@/assets/house-fill.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from '../ButtonBase';

const HomePage = () => {
  return (
    <ButtonBase
      title="ホームページ"
      icon={houseIcon}
      rightItem={<Image source={caretIcon} style={styles.caret} />}
      roundedBottom={true}
    />
  );
};

const styles = StyleSheet.create({
  caret: {
    height: 20,
    width: 20,
  },
});

export default HomePage;
