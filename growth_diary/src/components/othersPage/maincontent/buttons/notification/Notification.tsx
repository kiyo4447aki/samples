import bellIcon from '@/assets/bell.png';
import React, { useState } from 'react';
import { Switch } from 'react-native';
import ButtonBase from '../ButtonBase';

const Notification = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const onChange = (value: boolean) => {
    setIsEnabled(value);
  };
  return (
    <ButtonBase
      title="通知"
      icon={bellIcon}
      roundedTop={true}
      rightItem={<Switch value={isEnabled} onValueChange={onChange} />}
      touchable={false}
    />
  );
};

export default Notification;
