import type { ReactNode } from 'react';

interface PlayerContainerProps {
  children: ReactNode;
}

export function PlayerContainer({ children }: PlayerContainerProps) {
  return (
    <div
      className="w-full p-8 rounded-xl relative"
      style={{
        maxWidth: '900px',
        backgroundColor: 'var(--color-hw-case-base)',
        backgroundImage:
          'linear-gradient(145deg, var(--color-hw-case-light) 0%, var(--color-hw-case-base) 100%)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow:
          '0 15px 30px rgba(0,0,0,0.2), 0 5px 10px rgba(0,0,0,0.1), inset 0 1px 1px var(--color-hw-case-light)',
        display: 'grid',
        gridTemplateAreas:
          '"logo screen screen controls" "pads screen screen keys" "pads transport transport transport" "volume volume volume volume"',
        gridTemplateColumns: '1fr 2.5fr 1fr',
        gridTemplateRows: 'auto 2fr auto auto',
        gap: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}
