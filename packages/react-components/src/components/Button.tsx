import React from 'react';
import { colors, componentSpacing, borderRadius, shadows, transitions } from '@acme/tokens';

// React uses "variant" prop (Vue uses "type")
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary: {
    background: colors.primary[500],
    color: colors.white,
    border: 'none',
    hoverBg: colors.primary[600],
  },
  secondary: {
    background: colors.gray[100],
    color: colors.gray[900],
    border: 'none',
    hoverBg: colors.gray[200],
  },
  outline: {
    background: 'transparent',
    color: colors.primary[600],
    border: `1px solid ${colors.primary[500]}`,
    hoverBg: colors.primary[50],
  },
  ghost: {
    background: 'transparent',
    color: colors.gray[700],
    border: 'none',
    hoverBg: colors.gray[100],
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  type = 'button',
}) => {
  const variantStyle = variantStyles[variant];
  const padding = componentSpacing.button[size];

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: `${padding.y} ${padding.x}`,
    fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
    fontWeight: 500,
    lineHeight: 1.5,
    borderRadius: borderRadius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    width: fullWidth ? '100%' : 'auto',
    backgroundColor: variantStyle.background,
    color: variantStyle.color,
    border: variantStyle.border,
    boxShadow: variant === 'primary' ? shadows.sm : 'none',
  };

  return (
    <button
      type={type}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Spinner />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

const Spinner: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ animation: 'spin 1s linear infinite' }}
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="32"
      strokeDashoffset="12"
    />
  </svg>
);

export default Button;
