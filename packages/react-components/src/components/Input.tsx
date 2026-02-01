import React, { forwardRef } from 'react';
import { colors, componentSpacing, borderRadius, transitions, fontFamilies, fontSizes } from '@acme/tokens';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: { height: '32px', fontSize: fontSizes.sm },
  md: { height: '40px', fontSize: fontSizes.base },
  lg: { height: '48px', fontSize: fontSizes.lg },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  error = false,
  errorMessage,
  label,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}, ref) => {
  const sizeStyle = sizeStyles[size];
  const padding = componentSpacing.input[size];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: 500,
    color: colors.gray[700],
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: sizeStyle.height,
    padding: `0 ${padding.x}`,
    paddingLeft: leftIcon ? '40px' : padding.x,
    paddingRight: rightIcon ? '40px' : padding.x,
    fontFamily: fontFamilies.sans,
    fontSize: sizeStyle.fontSize,
    color: colors.gray[900],
    backgroundColor: disabled ? colors.gray[100] : colors.white,
    border: `1px solid ${error ? colors.error : colors.gray[300]}`,
    borderRadius: borderRadius.md,
    outline: 'none',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.gray[400],
  };

  const helperStyle: React.CSSProperties = {
    fontSize: fontSizes.xs,
    color: error ? colors.error : colors.gray[500],
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapperStyle}>
        {leftIcon && (
          <span style={{ ...iconStyle, left: '12px' }}>{leftIcon}</span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
        {rightIcon && (
          <span style={{ ...iconStyle, right: '12px' }}>{rightIcon}</span>
        )}
      </div>
      {(helperText || errorMessage) && (
        <span style={helperStyle}>{error ? errorMessage : helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
