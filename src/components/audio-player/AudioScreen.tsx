interface AudioScreenProps {
  status: string;
  statusVariant?: 'ready' | 'error' | 'default';
  duration: string;
}

export function AudioScreen({ status, statusVariant = 'default', duration }: AudioScreenProps) {
  const statusClasses = {
    ready: 'text-[--color-accent-screen]',
    error: 'text-red-500',
    default: 'text-[--color-accent-screen]',
  };

  return (
    <div className="bg-[#0a0a0a] rounded-lg p-4 shadow-[inset_0_3px_10px_rgba(0,0,0,0.8)] border-2 border-[#303030] flex flex-col justify-between font-mono min-h-[120px]">
      <div className="flex justify-between text-xs text-white uppercase">
        <span>Mode</span>
        <span className="text-[--color-accent-screen]">AUDIO</span>
      </div>

      <div className={`text-sm uppercase my-2 min-h-[1.2em] ${statusClasses[statusVariant]}`}>
        {status}
      </div>

      <div
        className="flex-1 my-2 opacity-30 rounded"
        style={{
          background: 'linear-gradient(180deg, rgba(0,255,68,0.1) 0%, rgba(0,255,68,0.3) 100%)',
        }}
      />

      <div className="flex justify-between text-xs text-white">
        <span>Length</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}
