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
    <div className="flex flex-col gap-2 items-end">
      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => onModeChange?.(mode.key)}
          className={`px-4 py-2 text-xs font-bold uppercase bg-gradient-to-b from-white to-gray-200 border border-black/10 rounded shadow-[0_2px_3px_rgba(0,0,0,0.1),inset_0_1px_1px_#fff] transition-all ${
            activeMode === mode.key
              ? 'from-gray-200 to-gray-300 shadow-[inset_0_2px_3px_rgba(0,0,0,0.1)]'
              : ''
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
