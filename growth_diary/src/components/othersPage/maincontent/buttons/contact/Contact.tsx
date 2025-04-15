import caretIcon from '@/assets/chevron-right.png';
import letterIcon from '@/assets/envelope.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from '../ButtonBase';

const Contact = () => {
  return (
    <ButtonBase
      title="ご意見・お問い合わせ"
      icon={letterIcon}
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

export default Contact;
