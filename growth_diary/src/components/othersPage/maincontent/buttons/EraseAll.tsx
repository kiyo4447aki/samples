import caretIcon from '@/assets/chevron-right.png';
import trashIcon from '@/assets/trash3-fill.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from './ButtonBase';

const EraseAll = () => {
  return (
    <ButtonBase
      title="データの削除"
      icon={trashIcon}
      rightItem={<Image source={caretIcon} style={styles.caret} />}
      roundedTop={true}
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

export default EraseAll;
