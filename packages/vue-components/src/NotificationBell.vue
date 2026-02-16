<template>
  <div class="notification-bell" @click="toggleDropdown">
    <button class="bell-button">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
      </svg>
      <span v-if="count > 0" class="badge">{{ count }}</span>
    </button>
    <div v-if="open" class="dropdown">
      <div class="dropdown-header">Notifications</div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{ count: number }>();
const open = ref(false);

function toggleDropdown() {
  open.value = !open.value;
}
</script>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
}

.bell-button {
  position: relative;
  padding: 8px;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 150ms ease;
}

.bell-button:hover {
  background-color: #f9fafb;
  color: #111827;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  background-color: #ef4444;
  border-radius: 9px;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 320px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 50;
  overflow: hidden;
}

.dropdown-header {
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid #f3f4f6;
}
</style>
