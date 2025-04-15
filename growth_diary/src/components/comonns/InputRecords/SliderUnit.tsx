import { defaultTheme } from '@/consts/theme';
import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SliderUnit = ({ onChange }: { onChange?: ((value: number) => void) | undefined }) => {
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={defaultTheme.mainColor}
          maximumTrackTintColor="#ffffff"
          onValueChange={
            onChange
              ? e => {
                  onChange(e);
                }
              : undefined
          }
          step={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  layout: { flexDirection: 'row' },
  slider: { flex: 1 },
});

export default SliderUnit;
