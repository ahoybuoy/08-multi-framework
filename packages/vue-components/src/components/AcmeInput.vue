<script setup lang="ts">
/**
 * Input Component (Vue)
 *
 * Uses v-model for two-way binding (React uses controlled/uncontrolled pattern)
 */
import { computed } from 'vue';
import { colors, componentSpacing, borderRadius, transitions, fontFamilies, fontSizes } from '@acme/tokens';

interface Props {
  modelValue?: string;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  size: 'md',
  error: false,
  disabled: false,
  type: 'text',
  block: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const sizeStyles = {
  sm: { height: '32px', fontSize: fontSizes.sm },
  md: { height: '40px', fontSize: fontSizes.base },
  lg: { height: '48px', fontSize: fontSizes.lg },
};

const containerStyle = computed(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '4px',
  width: props.block ? '100%' : 'auto',
}));

const labelStyle = {
  fontFamily: fontFamilies.sans,
  fontSize: fontSizes.sm,
  fontWeight: 500,
  color: colors.gray[700],
};

const inputStyle = computed(() => {
  const sizeStyle = sizeStyles[props.size];
  const padding = componentSpacing.input[props.size];

  return {
    width: '100%',
    height: sizeStyle.height,
    padding: `0 ${padding.x}`,
    fontFamily: fontFamilies.sans,
    fontSize: sizeStyle.fontSize,
    color: colors.gray[900],
    backgroundColor: props.disabled ? colors.gray[100] : colors.white,
    border: `1px solid ${props.error ? colors.error : colors.gray[300]}`,
    borderRadius: borderRadius.md,
    outline: 'none',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    cursor: props.disabled ? 'not-allowed' : 'text',
  };
});

const helperStyle = computed(() => ({
  fontSize: fontSizes.xs,
  color: props.error ? colors.error : colors.gray[500],
}));

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div :style="containerStyle">
    <label v-if="label" :style="labelStyle">{{ label }}</label>
    <div style="position: relative; display: flex; align-items: center;">
      <slot name="prefix" />
      <input
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :style="inputStyle"
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      <slot name="suffix" />
    </div>
    <span v-if="helperText || errorMessage" :style="helperStyle">
      {{ error ? errorMessage : helperText }}
    </span>
  </div>
</template>
