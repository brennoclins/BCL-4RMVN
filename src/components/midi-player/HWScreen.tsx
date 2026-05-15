interface HWScreenProps {
  modeValue: string;
  status: string;
  statusVariant?: 'ready' | 'error' | 'default';
  duration: string;
  bpm?: number;
  isLooping?: boolean;
}

export function HWScreen({
  modeValue,
  status,
  statusVariant = 'default',
  duration,
  bpm,
  isLooping,
}: HWScreenProps) {
  const statusColor = statusVariant === 'error' ? '#ff4444' : 'var(--color-accent-screen)';

  return (
    <div className="bg-[#0a0a0a] rounded-lg p-4 shadow-[inset_0_3px_10px_rgba(0,0,0,0.8)] border-2 border-[#303030] font-mono flex flex-col justify-between min-h-[140px]">
      <div className="flex justify-between text-xs text-white uppercase">
        <span>Mode</span>
        <span className="text-[var(--color-accent-screen)]">{modeValue}</span>
      </div>

      <div className="text-[0.9rem] uppercase my-2 min-h-[1.2em]" style={{ color: statusColor }}>
        {status}
      </div>

      <div
        className="flex-1 my-2 rounded opacity-30"
        style={{
          background: `linear-gradient(0deg, var(--color-accent-screen) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent-screen) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="flex justify-between text-xs text-white">
        <div className="flex gap-4">
          <span>Length: {duration}</span>
          {bpm !== undefined && <span>BPM: {bpm}</span>}
          {isLooping && <span className="text-[var(--color-accent-screen)]">LOOP</span>}
        </div>
      </div>
    </div>
  );
}
