import React from 'react';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '@acme/tokens';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const variantStyles = {
  info: {
    background: '#DBEAFE',
    border: colors.info,
    text: '#1E40AF',
    icon: colors.info,
  },
  success: {
    background: '#D1FAE5',
    border: colors.success,
    text: '#065F46',
    icon: colors.success,
  },
  warning: {
    background: '#FEF3C7',
    border: colors.warning,
    text: '#92400E',
    icon: colors.warning,
  },
  error: {
    background: '#FEE2E2',
    border: colors.error,
    text: '#991B1B',
    icon: colors.error,
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  icon,
}) => {
  const styles = variantStyles[variant];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: styles.background,
    borderLeft: `4px solid ${styles.border}`,
    borderRadius: borderRadius.md,
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '20px',
    height: '20px',
    color: styles.icon,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const titleStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: styles.text,
  };

  const textStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    color: styles.text,
  };

  const closeButtonStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: borderRadius.base,
    color: styles.text,
  };

  return (
    <div role="alert" style={containerStyle}>
      {icon && <span style={iconStyle}>{icon}</span>}
      <div style={contentStyle}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={textStyle}>{children}</div>
      </div>
      {onClose && (
        <button style={closeButtonStyle} onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
