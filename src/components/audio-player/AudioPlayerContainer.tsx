import type { ReactNode } from 'react';

interface AudioPlayerContainerProps {
  children: ReactNode;
}

export function AudioPlayerContainer({ children }: AudioPlayerContainerProps) {
  return (
    <div
      className="w-full max-w-[700px] bg-gradient-to-b from-[--color-hw-case-light] to-[--color-hw-case-base] rounded-xl border border-black/5 shadow-[0_15px_30px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1),inset_0_1px_1px_var(--color-hw-case-light)] p-8 relative"
      style={{
        display: 'grid',
        gridTemplateAreas: '"logo screen" "pads transport" "volume volume"',
        gridTemplateColumns: '1fr 2fr',
        gap: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}
