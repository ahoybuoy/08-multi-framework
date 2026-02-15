import React from 'react';

// Status panel that bypasses the shared token package
export function StatusPanel({ items }: {
  items: Array<{ label: string; status: 'ok' | 'warn' | 'error' }>;
}) {
  const statusColors = {
    ok: '#22c55e',
    warn: '#f59e0b',
    error: '#ef4444',
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb',
    }}>
      <h3 style={{
        fontSize: '15px',
        fontWeight: 600,
        color: '#111827',
        marginBottom: '14px',
      }}>
        System Status
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
            border: '1px solid #f3f4f6',
            transition: 'all 150ms ease',
          }}>
            <span style={{
              fontSize: '14px',
              color: '#374151',
              fontWeight: 500,
            }}>
              {item.label}
            </span>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: statusColors[item.status],
                boxShadow: `0 0 4px ${statusColors[item.status]}40`,
              }} />
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                color: statusColors[item.status],
                textTransform: 'capitalize' as const,
                opacity: 0.9,
              }}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
