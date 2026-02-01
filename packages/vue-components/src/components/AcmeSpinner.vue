<script setup lang="ts">
/**
 * Spinner Component (Vue)
 */
import { computed } from 'vue';
import { colors } from '@acme/tokens';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'accent' | 'white' | 'current';
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  label: 'Loading...',
});

const sizeMap = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

const colorMap = {
  primary: colors.primary[500],
  accent: colors.accent[500],
  white: colors.white,
  current: 'currentColor',
};

const dimension = computed(() => sizeMap[props.size]);
const strokeColor = computed(() => colorMap[props.color]);
</script>

<template>
  <div
    style="display: inline-flex; align-items: center; justify-content: center;"
    role="status"
    :aria-label="label"
  >
    <svg
      :width="dimension"
      :height="dimension"
      viewBox="0 0 24 24"
      fill="none"
      class="spinner-svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        :stroke="colors.gray[200]"
        stroke-width="2"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        :stroke="strokeColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="32"
        stroke-dashoffset="12"
        fill="none"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { colors as colorTokens } from '@acme/tokens';
export default {
  data() {
    return { colors: colorTokens };
  },
};
</script>

<style scoped>
.spinner-svg {
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
