// src/components/Texto.tsx
import { Text, TextProps, TextStyle } from 'react-native';
import { FONT_FAMILY, COLORS, FONT_SIZE } from '../theme/theme';

export function Texto({ style, ...rest }: TextProps) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: FONT_FAMILY.DMSansRegular,
          fontSize: FONT_SIZE.medium,
          color: COLORS.text,
        },
        style as TextStyle,
      ]}
    />
  );
}
