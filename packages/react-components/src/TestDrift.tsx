import React from 'react';

export function TestDrift() {
  return (
    <div
      className="bg-[#18181b] p-[24px] rounded-[12px]"
      style={{ border: '1px solid #27272a', boxShadow: '0 4px 6px -1px #0000001a' }}
    >
      <header className="flex justify-between items-center mb-[16px]">
        <h2 className="text-[#fafafa] text-[20px] font-[700]">Metrics</h2>
        <span className="text-[12px] text-[#a1a1aa] bg-[#27272a] px-[8px] py-[2px] rounded-[4px]">
          Live
        </span>
      </header>
      <div className="grid grid-cols-2 gap-[12px]">
        <div className="p-[12px] bg-[#09090b] rounded-[8px]">
          <p className="text-[#71717a] text-[12px]">Uptime</p>
          <p className="text-[#22c55e] text-[24px] font-[800]">99.9%</p>
        </div>
        <div className="p-[12px] bg-[#09090b] rounded-[8px]">
          <p className="text-[#71717a] text-[12px]">Errors</p>
          <p style={{ color: '#ef4444', fontSize: '24px', fontWeight: 800 }}>12</p>
        </div>
      </div>
    </div>
  );
}
