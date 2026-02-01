<script setup lang="ts">
/**
 * Badge Component (Vue)
 */
import { computed } from 'vue';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '@acme/tokens';

interface Props {
  variant?: 'solid' | 'subtle' | 'outline';
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'subtle',
  color: 'primary',
  size: 'md',
});

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

const badgeStyle = computed(() => {
  const colorStyle = colorMap[props.color];
  const sizeStyle = sizeStyles[props.size];

  const variantStyles = {
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

  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: fontWeights.medium,
    lineHeight: 1,
    borderRadius: borderRadius.full,
    whiteSpace: 'nowrap' as const,
    ...variantStyles[props.variant],
  };
});
</script>

<template>
  <span :style="badgeStyle">
    <slot />
  </span>
</template>
