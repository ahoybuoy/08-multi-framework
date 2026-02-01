import React from 'react';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '@acme/tokens';

export interface BadgeProps {
  variant?: 'solid' | 'subtle' | 'outline';
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const colorMap = {
  primary: { base: colors.primary[500], light: colors.primary[100], dark: colors.primary[700] },
  accent: { base: colors.accent[500], light: colors.accent[100], dark: colors.accent[700] },
  success: { base: colors.success, light: '#D1FAE5', dark: '#065F46' },
  warning: { base: colors.warning, light: '#FEF3C7', dark: '#92400E' },
  error: { base: colors.error, light: '#FEE2E2', dark: '#991B1B' },
  info: { base: colors.info, light: '#DBEAFE', dark: '#1E40AF' },
  gray: { base: colors.gray[500], light: colors.gray[100], dark: colors.gray[700] },
};

const sizeStyles = {
  sm: { padding: `${spacing[0.5]} ${spacing[2]}`, fontSize: fontSizes.xs },
  md: { padding: `${spacing[1]} ${spacing[2.5]}`, fontSize: fontSizes.sm },
  lg: { padding: `${spacing[1.5]} ${spacing[3]}`, fontSize: fontSizes.base },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'subtle',
  color = 'primary',
  size = 'md',
  children,
}) => {
  const colorStyle = colorMap[color];
  const sizeStyle = sizeStyles[size];

  const variantStyles: Record<string, React.CSSProperties> = {
    solid: {
      backgroundColor: colorStyle.base,
      color: colors.white,
      border: 'none',
    },
    subtle: {
      backgroundColor: colorStyle.light,
      color: colorStyle.dark,
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: colorStyle.base,
      border: `1px solid ${colorStyle.base}`,
    },
  };

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: fontWeights.medium,
    lineHeight: 1,
    borderRadius: borderRadius.full,
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
  };

  return <span style={style}>{children}</span>;
};

export default Badge;
