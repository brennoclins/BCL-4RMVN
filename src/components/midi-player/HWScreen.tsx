interface HWScreenProps {
  modeValue: string;
  status: string;
  statusVariant?: 'ready' | 'error' | 'default';
  duration: string;
}

export function HWScreen({
  modeValue,
  status,
  statusVariant = 'default',
  duration,
}: HWScreenProps) {
  const statusColor = statusVariant === 'error' ? '#ff4444' : 'var(--color-accent-screen)';

  return (
    <div
      className="rounded-lg p-4 font-mono flex flex-col justify-between"
      style={{
        backgroundColor: '#0a0a0a',
        boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.8)',
        border: '2px solid #303030',
        minHeight: '140px',
      }}
    >
      <div className="flex justify-between text-xs text-white uppercase">
        <span>Mode</span>
        <span style={{ color: 'var(--color-accent-screen)' }}>{modeValue}</span>
      </div>

      <div className="text-sm uppercase my-2 min-h-[1.2em]" style={{ color: statusColor }}>
        {status}
      </div>

      <div
        className="flex-1 my-2 rounded"
        style={{
          background: `linear-gradient(0deg, var(--color-accent-screen) 1px, transparent 1px),
                       linear-gradient(90deg, var(--color-accent-screen) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          opacity: 0.3,
        }}
      />

      <div className="flex justify-between text-xs text-white">
        <span>Length</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}
