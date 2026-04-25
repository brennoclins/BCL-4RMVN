import type { ReactNode } from 'react';

interface AudioPlayerContainerProps {
  children: ReactNode;
}

export function AudioPlayerContainer({ children }: AudioPlayerContainerProps) {
  return (
    <div className="w-full max-w-[950px] bg-gradient-to-br from-[var(--color-hw-case-light)] to-[var(--color-hw-case-base)] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_1px_1px_white] p-10 border border-black/5">
      {children}
    </div>
  );
}