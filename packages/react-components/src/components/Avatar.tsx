import React from 'react';
import { colors, borderRadius, fontSizes, fontWeights } from '@acme/tokens';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizeMap = {
  xs: { size: '24px', fontSize: fontSizes.xs, statusSize: '8px' },
  sm: { size: '32px', fontSize: fontSizes.sm, statusSize: '10px' },
  md: { size: '40px', fontSize: fontSizes.base, statusSize: '12px' },
  lg: { size: '48px', fontSize: fontSizes.lg, statusSize: '14px' },
  xl: { size: '64px', fontSize: fontSizes.xl, statusSize: '16px' },
};

const statusColors = {
  online: colors.success,
  offline: colors.gray[400],
  away: colors.warning,
  busy: colors.error,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 55%)`;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
}) => {
  const sizeStyle = sizeMap[size];
  const hasImage = Boolean(src);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeStyle.size,
    height: sizeStyle.size,
    borderRadius: shape === 'circle' ? borderRadius.full : borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: hasImage ? colors.gray[200] : (name ? stringToColor(name) : colors.gray[300]),
    color: colors.white,
    fontSize: sizeStyle.fontSize,
    fontWeight: fontWeights.medium,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const statusStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: sizeStyle.statusSize,
    height: sizeStyle.statusSize,
    borderRadius: borderRadius.full,
    backgroundColor: status ? statusColors[status] : 'transparent',
    border: `2px solid ${colors.white}`,
  };

  return (
    <div style={containerStyle}>
      {hasImage ? (
        <img src={src} alt={alt || name} style={imageStyle} />
      ) : (
        <span>{name ? getInitials(name) : '?'}</span>
      )}
      {status && <span style={statusStyle} />}
    </div>
  );
};

export default Avatar;
