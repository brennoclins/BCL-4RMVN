import { useState } from 'react';

interface HWKeysButtonsProps {
  activeMode?: 'keys' | 'step' | 'chord';
  onModeChange?: (mode: 'keys' | 'step' | 'chord') => void;
}

export function HWKeysButtons({ activeMode = 'keys', onModeChange }: HWKeysButtonsProps) {
  const [mode, setMode] = useState(activeMode);

  const modes = [
    { key: 'keys' as const, label: 'KEYS' },
    { key: 'step' as const, label: 'STEP' },
    { key: 'chord' as const, label: 'CHORD' },
  ];

  const handleClick = (key: 'keys' | 'step' | 'chord') => {
    setMode(key);
    onModeChange?.(key);
  };

  return (
    <div className="flex flex-col gap-2 items-end h-full justify-center">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => handleClick(m.key)}
          className={`px-4 py-2 text-[0.7rem] font-bold uppercase rounded transition-all border border-black/10 ${
            mode === m.key
              ? 'bg-gradient-to-b from-[#f0f0f0] to-[#d0d0d0] shadow-[inset_0_2px_3px_rgba(0,0,0,0.1)]'
              : 'bg-gradient-to-b from-white to-[#e0e0e0] shadow-[0_2px_3px_rgba(0,0,0,0.1),inset_0_1px_1px_#fff] hover:border-[var(--color-text-mid)]'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}