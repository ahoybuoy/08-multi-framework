<script setup lang="ts">
/**
 * Button Component (Vue)
 *
 * INCONSISTENCY: Vue uses "type" prop while React uses "variant"
 * INCONSISTENCY: Vue uses CSS custom properties, React uses direct values
 */
import { computed } from 'vue';
import { colors, componentSpacing, borderRadius, shadows, transitions } from '@acme/tokens';

// Vue uses "type" prop (React uses "variant")
interface Props {
  type?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean; // Vue uses "block", React uses "fullWidth"
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const typeStyles = {
  primary: {
    background: colors.primary[500],
    color: colors.white,
    border: 'none',
  },
  secondary: {
    background: colors.gray[100],
    color: colors.gray[900],
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: colors.primary[600],
    border: `1px solid ${colors.primary[500]}`,
  },
  ghost: {
    background: 'transparent',
    color: colors.gray[700],
    border: 'none',
  },
};

const buttonStyle = computed(() => {
  const typeStyle = typeStyles[props.type];
  const padding = componentSpacing.button[props.size];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    // INCONSISTENCY: Vue uses slightly different padding
    padding: `${padding.y} ${padding.x}`,
    fontSize: props.size === 'sm' ? '13px' : props.size === 'lg' ? '17px' : '15px',
    fontWeight: 500,
    lineHeight: 1.5,
    borderRadius: borderRadius.md,
    cursor: props.disabled || props.loading ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.5 : 1,
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    width: props.block ? '100%' : 'auto',
    backgroundColor: typeStyle.background,
    color: typeStyle.color,
    border: typeStyle.border,
    boxShadow: props.type === 'primary' ? shadows.sm : 'none',
  };
});

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-dasharray="32" stroke-dashoffset="12" />
      </svg>
    </span>
    <slot name="icon-left" v-if="!loading" />
    <slot />
    <slot name="icon-right" v-if="!loading" />
  </button>
</template>

<style scoped>
.spinner svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
