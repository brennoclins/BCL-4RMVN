import type { ReactNode } from 'react';

interface PlayerContainerProps {
  children: ReactNode;
}

export function PlayerContainer({ children }: PlayerContainerProps) {
  return (
    <div
      className="midi-grid w-full p-4 md:p-8 rounded-xl relative bg-gradient-to-br from-[var(--color-hw-case-light)] to-[var(--color-hw-case-base)] border border-black/5 shadow-[0_15px_30px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1),inset_0_1px_1px_var(--color-hw-case-light)] max-w-[900px] grid gap-[1.5rem]"
      style={{
        gridTemplateAreas: '"logo screen screen" "pads screen screen" "pads transport transport" "volume volume volume" "instruments instruments instruments"',
        gridTemplateColumns: '1fr 2.5fr 1fr',
        gridTemplateRows: 'auto 2fr auto auto auto',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .midi-grid {
            grid-template-areas: 'logo' 'screen' 'pads' 'transport' 'volume' 'instruments' !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
