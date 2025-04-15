import { defaultTheme } from '@/consts/theme';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

const Indicator = ({ value }: { value: number }) => {
  return (
    <CircularProgress
      value={value}
      radius={20}
      duration={0}
      activeStrokeColor={defaultTheme.mainColor}
      inActiveStrokeColor={defaultTheme.mainColor}
      inActiveStrokeOpacity={0.5}
      activeStrokeWidth={6}
      inActiveStrokeWidth={6}
      maxValue={10}
    />
  );
};

export default Indicator;
