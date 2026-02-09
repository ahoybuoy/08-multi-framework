import React from 'react';
import { colors, componentSpacing, borderRadius, shadows, transitions } from '@acme/tokens';

// React uses "variant" prop (Vue uses "type")
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
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
  loadingText,
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
    opacity: disabled ? 0.5 : loading ? 0.75 : 1,
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    width: fullWidth ? '100%' : 'auto',
    backgroundColor: variantStyle.background,
    color: variantStyle.color,
    border: variantStyle.border,
    boxShadow: variant === 'primary' ? shadows.sm : 'none',
    position: 'relative',
  };

  return (
    <button
      type={type}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading && <Spinner size={size} />}
      {loading && loadingText ? (
        <span>{loadingText}</span>
      ) : (
        <>
          {!loading && leftIcon}
          <span style={{ opacity: loading && !loadingText ? 0 : 1 }}>{children}</span>
          {!loading && rightIcon}
        </>
      )}
    </button>
  );
};

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const spinnerSizes = { sm: 14, md: 16, lg: 20 };

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const s = spinnerSizes[size];
  return (
    <svg
      width={s}
      height={s}
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
};

export default Button;
