import React from 'react';
import { spacing, borderRadius, fontSizes, fontWeights } from '@acme/tokens';

export interface NotificationBadgeProps {
  count: number;
  variant?: 'dot' | 'count';
  color?: 'default' | 'success' | 'warning' | 'error';
  maxCount?: number;
  children: React.ReactNode;
}

const colorStyles = {
  default: { bg: '#818CF8', text: '#FFFFFF' },
  success: { bg: '#34D399', text: '#FFFFFF' },
  warning: { bg: '#FBBF24', text: '#1F2937' },
  error: { bg: '#F87171', text: '#FFFFFF' },
};

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  variant = 'count',
  color = 'default',
  maxCount = 99,
  children,
}) => {
  const colorStyle = colorStyles[color];
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorStyle.bg,
    color: colorStyle.text,
    borderRadius: borderRadius.full,
    border: '2px solid #FFFFFF',
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    lineHeight: 1,
    zIndex: 1,
    ...(variant === 'dot'
      ? { width: '10px', height: '10px' }
      : {
          minWidth: '20px',
          height: '20px',
          padding: `0 ${spacing[1.5]}`,
        }),
  };

  if (count <= 0) {
    return <>{children}</>;
  }

  return (
    <span style={containerStyle}>
      {children}
      <span style={badgeStyle}>
        {variant === 'count' ? displayCount : null}
      </span>
    </span>
  );
};

export default NotificationBadge;
