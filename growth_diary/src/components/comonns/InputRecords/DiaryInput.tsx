import { defaultTheme } from '@/consts/theme';
import React, { useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const DiaryInput = ({
  value,
  onChange,
  isScrolling,
  setIsScrolling,
}: {
  value?: string;
  onChange?: ((text: string) => void) | undefined;
  isScrolling: boolean;
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useRef<TextInput>(null);
  return (
    <TextInput
      ref={ref}
      style={styles.input}
      multiline
      scrollEnabled={false}
      value={value}
      onChangeText={onChange ? e => onChange(e) : undefined}
      editable={!isScrolling || ref.current!.isFocused()}
      onPressOut={() => setIsScrolling(false)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: defaultTheme.border,
    borderRadius: 3,
    borderWidth: 1,
    flex: 1,
    marginTop: 8,
    padding: 10,
  },
});

export default DiaryInput;
