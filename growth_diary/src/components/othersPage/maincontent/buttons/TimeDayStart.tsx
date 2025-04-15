import clockIcon from '@/assets/clock.png';
import React, { useState } from 'react';
import ButtonBase from './ButtonBase';
import TimePicker from './TimePicker';

const TimeDayStart = () => {
  const [time, setTime] = useState<Date>(new Date());
  const onChangeTime = (selectedTime?: Date) => {};

  return (
    <ButtonBase
      title="1日が始まる時間"
      icon={clockIcon}
      roundedTop={true}
      roundedBottom={true}
      rightItem={<TimePicker time={time} setTime={setTime} onChangeTime={onChangeTime} />}
    />
  );
};

export default TimeDayStart;
