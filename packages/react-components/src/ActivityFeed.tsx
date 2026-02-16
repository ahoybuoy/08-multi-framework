import React from 'react';

interface ActivityItem {
  user: string;
  action: string;
  time: string;
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      padding: '20px',
      maxWidth: '400px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
        Recent Activity
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: i < items.length - 1 ? '1px solid #f3f4f6' : 'none',
          }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>{item.user}</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}> {item.action}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
