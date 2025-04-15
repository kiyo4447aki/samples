import clockIcon from '@/assets/clock.png';
import React, { useState } from 'react';
import ButtonBase from '../ButtonBase';
import TimePicker from '../TimePicker';

const NotificationTime = () => {
  const [time, setTime] = useState<Date>(new Date());
  const onChangeTime = (selectedTime?: Date) => {};
  return (
    <ButtonBase
      title="通知を送る時間"
      icon={clockIcon}
      rightItem={<TimePicker time={time} setTime={setTime} onChangeTime={onChangeTime} />}
    />
  );
};

export default NotificationTime;
