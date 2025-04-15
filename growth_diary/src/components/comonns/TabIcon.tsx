import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  focused: boolean;
  color?: string;
  size: number;
  defaultIcon: ImageSourcePropType;
  focusedIcon: ImageSourcePropType;
};

const TabIcon = (props: Props) => {
  const { focused, defaultIcon, focusedIcon } = props;

  const styles = StyleSheet.create({
    icon: {
      height: 20,
      width: 20,
    },
  });

  if (focused) {
    return <Image source={focusedIcon} style={styles.icon} />;
  } else {
    return <Image source={defaultIcon} style={styles.icon} />;
  }
};

export default TabIcon;
