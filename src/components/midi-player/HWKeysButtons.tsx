interface HWKeysButtonsProps {
  activeMode?: 'keys' | 'step' | 'chord';
  onModeChange?: (mode: 'keys' | 'step' | 'chord') => void;
}

export function HWKeysButtons({ activeMode = 'keys', onModeChange }: HWKeysButtonsProps) {
  const modes = [
    { key: 'keys' as const, label: 'KEYS' },
    { key: 'step' as const, label: 'STEP' },
    { key: 'chord' as const, label: 'CHORD' },
  ];

  return (
    <div className="flex flex-col gap-2" style={{ alignItems: 'flex-end' }}>
      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => onModeChange?.(mode.key)}
          className="px-4 py-2 text-xs font-bold uppercase rounded transition-all"
          style={
            activeMode === mode.key
              ? {
                  background: 'linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 100%)',
                  boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.1)',
                }
              : {
                  background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 2px 3px rgba(0,0,0,0.1), inset 0 1px 1px #fff',
                }
          }
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
