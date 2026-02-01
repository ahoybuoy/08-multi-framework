/**
 * Vue Component Library
 * Uses shared tokens from @acme/tokens
 *
 * KNOWN INCONSISTENCIES WITH REACT LIBRARY:
 * 1. Button: Vue uses "type" prop, React uses "variant"
 * 2. Button: Vue uses "block" prop, React uses "fullWidth"
 * 3. Card: Vue uses "clickable" prop, React uses "interactive"
 * 4. Alert: Vue uses "closable" prop, React checks onClose presence
 * 5. Tooltip: Exists in Vue but NOT in React
 * 6. Modal: Exists in React but NOT in Vue
 * 7. Avatar: Exists in React but NOT in Vue
 */

// Components
export { default as AcmeButton } from './components/AcmeButton.vue';
export { default as AcmeInput } from './components/AcmeInput.vue';
export { default as AcmeCard } from './components/AcmeCard.vue';
export { default as AcmeBadge } from './components/AcmeBadge.vue';
export { default as AcmeSpinner } from './components/AcmeSpinner.vue';
export { default as AcmeAlert } from './components/AcmeAlert.vue';
export { default as AcmeTooltip } from './components/AcmeTooltip.vue';

// Composables
export { useToggle } from './composables/useToggle';
export { useClickOutside } from './composables/useClickOutside';

// NOTE: Vue components use "Acme" prefix and kebab-case files
// React components use PascalCase without prefix
// This is another intentional inconsistency for testing
