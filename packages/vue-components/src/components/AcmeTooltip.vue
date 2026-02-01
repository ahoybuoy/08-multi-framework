<script setup lang="ts">
/**
 * Tooltip Component (Vue)
 *
 * This component exists in Vue but NOT in React
 * INCONSISTENCY: Component parity issue
 */
import { ref, computed } from 'vue';
import { colors, spacing, borderRadius, shadows, fontSizes } from '@acme/tokens';

interface Props {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  delay: 200,
});

const isVisible = ref(false);
let timeoutId: number | null = null;

function showTooltip() {
  timeoutId = window.setTimeout(() => {
    isVisible.value = true;
  }, props.delay);
}

function hideTooltip() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  isVisible.value = false;
}

const placementStyles = computed(() => {
  const offset = '8px';
  switch (props.placement) {
    case 'top':
      return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: offset };
    case 'bottom':
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: offset };
    case 'left':
      return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: offset };
    case 'right':
      return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: offset };
    default:
      return {};
  }
});

const tooltipStyle = computed(() => ({
  position: 'absolute' as const,
  padding: `${spacing[1.5]} ${spacing[3]}`,
  backgroundColor: colors.gray[800],
  color: colors.white,
  fontSize: fontSizes.sm,
  borderRadius: borderRadius.md,
  boxShadow: shadows.lg,
  whiteSpace: 'nowrap' as const,
  zIndex: 1000,
  opacity: isVisible.value ? 1 : 0,
  visibility: isVisible.value ? 'visible' as const : 'hidden' as const,
  transition: 'all 150ms ease',
  pointerEvents: 'none' as const,
  ...placementStyles.value,
}));
</script>

<template>
  <div
    style="position: relative; display: inline-block;"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <slot />
    <div :style="tooltipStyle">
      {{ content }}
    </div>
  </div>
</template>
