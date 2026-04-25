import type { ReactNode } from 'react';

interface AudioPlayerContainerProps {
  children: ReactNode;
}

export function AudioPlayerContainer({ children }: AudioPlayerContainerProps) {
  return (
    <div
      className="w-full max-w-[900px] bg-gradient-to-b from-[var(--color-hw-case-light)] to-[var(--color-hw-case-base)] rounded-xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_1px_1px_var(--color-hw-case-light)] p-8 relative"
      style={{
        display: 'grid',
        gridTemplateAreas: '"header header header" "sidebar screen screen" "sidebar transport volume"',
        gridTemplateColumns: '250px 1fr 200px',
        gap: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}