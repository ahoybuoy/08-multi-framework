<script setup lang="ts">
/**
 * Alert Component (Vue)
 *
 * Uses events for close (React uses callbacks)
 */
import { computed } from 'vue';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '@acme/tokens';

interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  closable?: boolean; // Vue uses "closable", React uses onClose presence
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  closable: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const variantStyles = {
  info: {
    background: '#DBEAFE',
    border: colors.info,
    text: '#1E40AF',
    icon: colors.info,
  },
  success: {
    background: '#D1FAE5',
    border: colors.success,
    text: '#065F46',
    icon: colors.success,
  },
  warning: {
    background: '#FEF3C7',
    border: colors.warning,
    text: '#92400E',
    icon: colors.warning,
  },
  error: {
    background: '#FEE2E2',
    border: colors.error,
    text: '#991B1B',
    icon: colors.error,
  },
};

const styles = computed(() => variantStyles[props.variant]);

const containerStyle = computed(() => ({
  display: 'flex',
  gap: spacing[3],
  padding: spacing[4],
  backgroundColor: styles.value.background,
  borderLeft: `4px solid ${styles.value.border}`,
  borderRadius: borderRadius.md,
}));

const titleStyle = computed(() => ({
  fontSize: fontSizes.sm,
  fontWeight: fontWeights.semibold,
  color: styles.value.text,
}));

const textStyle = computed(() => ({
  fontSize: fontSizes.sm,
  color: styles.value.text,
}));

const closeButtonStyle = computed(() => ({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: borderRadius.base,
  color: styles.value.text,
}));
</script>

<template>
  <div role="alert" :style="containerStyle">
    <slot name="icon">
      <!-- Default icon slot -->
    </slot>
    <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
      <div v-if="title" :style="titleStyle">{{ title }}</div>
      <div :style="textStyle">
        <slot />
      </div>
    </div>
    <button
      v-if="closable"
      :style="closeButtonStyle"
      @click="emit('close')"
      aria-label="Close"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>
