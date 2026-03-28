<script setup lang="ts">
/**
 * Status Indicator Component (Vue)
 * Shows online/offline/busy/away status with colored dot
 */
import { computed } from 'vue';
import { spacing, borderRadius } from '@acme/tokens';

interface Props {
  status?: 'online' | 'offline' | 'busy' | 'away';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'offline',
  size: 'md',
  showLabel: false,
});

const statusColors = {
  online: '#22C55E',
  offline: '#9CA3AF',
  busy: '#EF4444',
  away: '#F59E0B',
};

const sizeMap = {
  sm: { dot: '8px', font: '12px' },
  md: { dot: '12px', font: '14px' },
  lg: { dot: '16px', font: '16px' },
};

const containerStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[2],
}));

const dotStyle = computed(() => ({
  width: sizeMap[props.size].dot,
  height: sizeMap[props.size].dot,
  borderRadius: borderRadius.full,
  backgroundColor: statusColors[props.status],
  border: '2px solid #FFFFFF',
  boxShadow: '0 0 0 1px #E5E7EB',
  flexShrink: 0,
}));

const labelStyle = computed(() => ({
  fontSize: sizeMap[props.size].font,
  color: '#374151',
  fontWeight: 500,
  textTransform: 'capitalize' as const,
}));
</script>

<template>
  <span :style="containerStyle">
    <span :style="dotStyle" />
    <span v-if="showLabel" :style="labelStyle">{{ status }}</span>
  </span>
</template>
