import caretIcon from '@/assets/chevron-right.png';
import starIcon from '@/assets/star.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from '../ButtonBase';

const Review = () => {
  return (
    <ButtonBase
      title="このアプリを評価"
      icon={starIcon}
      rightItem={<Image source={caretIcon} style={styles.caret} />}
      roundedTop={true}
    />
  );
};

const styles = StyleSheet.create({
  caret: {
    height: 20,
    width: 20,
  },
});

export default Review;
