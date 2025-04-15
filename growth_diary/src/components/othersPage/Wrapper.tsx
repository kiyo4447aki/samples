import { defaultTheme } from '@/consts/theme';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1, // コンテンツが小さくてもスクロール可能にする
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  wrapper: {
    backgroundColor: defaultTheme.background,
    flex: 1, // 親の高さを埋める
  },
});

export default Wrapper;
