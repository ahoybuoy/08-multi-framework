/**
 * Spacing Design Tokens
 * Based on 4px base unit
 */

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
} as const;

// Semantic spacing
export const componentSpacing = {
  button: {
    sm: { x: spacing[3], y: spacing[1.5] },
    md: { x: spacing[4], y: spacing[2] },
    lg: { x: spacing[6], y: spacing[3] },
  },
  input: {
    sm: { x: spacing[2], y: spacing[1] },
    md: { x: spacing[3], y: spacing[2] },
    lg: { x: spacing[4], y: spacing[3] },
  },
  card: {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
  },
} as const;

export type SpacingToken = keyof typeof spacing;
