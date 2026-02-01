<script setup lang="ts">
/**
 * Card Component (Vue)
 *
 * Uses named slots for header/body/footer (React uses child components)
 */
import { computed } from 'vue';
import { colors, componentSpacing, borderRadius, shadows } from '@acme/tokens';

interface Props {
  variant?: 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean; // Vue uses "clickable", React uses "interactive"
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  size: 'md',
  clickable: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const cardStyle = computed(() => {
  const padding = componentSpacing.card[props.size];

  const variantStyles = {
    elevated: {
      backgroundColor: colors.white,
      boxShadow: shadows.md,
      border: 'none',
    },
    outlined: {
      backgroundColor: colors.white,
      boxShadow: 'none',
      border: `1px solid ${colors.gray[200]}`,
    },
    filled: {
      backgroundColor: colors.gray[50],
      boxShadow: 'none',
      border: 'none',
    },
  };

  return {
    padding,
    borderRadius: borderRadius.lg,
    transition: 'all 200ms ease',
    cursor: props.clickable ? 'pointer' : 'default',
    ...variantStyles[props.variant],
  };
});
</script>

<template>
  <div :style="cardStyle" @click="clickable && emit('click', $event)">
    <header v-if="$slots.header" style="margin-bottom: 16px;">
      <slot name="header" />
    </header>
    <div>
      <slot />
    </div>
    <footer v-if="$slots.footer" style="margin-top: 16px; display: flex; gap: 8px;">
      <slot name="footer" />
    </footer>
  </div>
</template>
