import caretIcon from '@/assets/chevron-right.png';
import configIcon from '@/assets/wrench-adjustable.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ButtonBase from '../ButtonBase';

const NotificationConfig = () => {
  return (
    <ButtonBase
      title="本体の通知設定"
      icon={configIcon}
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

export default NotificationConfig;
