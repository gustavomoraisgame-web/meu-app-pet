import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@theme/index';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12, sm: 16, md: 20, lg: 24, xl: 32, xxl: 48,
};

interface IconProps {
  name: string;
  size?: IconSize | number;
  color?: string;
  style?: StyleProp<TextStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export const Icon: React.FC<IconProps> = ({
  name, size = 'md', color, style, testID, accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const fontSize = typeof size === 'number' ? size : SIZE_MAP[size];

  return (
    <Text
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? name}
      accessibilityRole="image"
      style={[
        { fontSize, lineHeight: fontSize * 1.25, color: color ?? theme.colors.text, textAlign: 'center' },
        style,
      ]}
    >
      {name}
    </Text>
  );
};

export default Icon;
