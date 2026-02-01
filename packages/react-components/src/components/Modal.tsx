import React, { useEffect, useCallback } from 'react';
import { colors, spacing, borderRadius, shadows, transitions, fontSizes, fontWeights } from '@acme/tokens';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeStyles = {
  sm: { width: '400px', maxWidth: '90vw' },
  md: { width: '560px', maxWidth: '90vw' },
  lg: { width: '720px', maxWidth: '90vw' },
  xl: { width: '960px', maxWidth: '90vw' },
  full: { width: '100vw', height: '100vh', maxWidth: '100vw' },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  footer,
}) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    ...sizeStyles[size],
    backgroundColor: colors.white,
    borderRadius: size === 'full' ? 0 : borderRadius.xl,
    boxShadow: shadows.xl,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: size === 'full' ? '100vh' : '90vh',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[6],
    borderBottom: `1px solid ${colors.gray[200]}`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    color: colors.gray[900],
    margin: 0,
  };

  const bodyStyle: React.CSSProperties = {
    padding: spacing[6],
    flex: 1,
    overflow: 'auto',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing[4],
    padding: spacing[6],
    borderTop: `1px solid ${colors.gray[200]}`,
  };

  const closeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: borderRadius.md,
    color: colors.gray[500],
  };

  return (
    <div style={overlayStyle} onClick={closeOnOverlayClick ? onClose : undefined}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button style={closeButtonStyle} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div style={bodyStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
