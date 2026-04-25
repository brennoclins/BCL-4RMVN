import { useEffect, useRef } from 'react';

interface AudioScreenProps {
  trackName: string;
  artistName: string;
  isPlaying: boolean;
}

export function AudioScreen({ trackName, artistName, isPlaying }: AudioScreenProps) {
  const eqRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const animateEQ = () => {
      if (eqRef.current) {
        const bars = eqRef.current.querySelectorAll('.eq-bar');
        bars.forEach((bar) => {
          const el = bar as HTMLElement;
          el.style.height = isPlaying ? `${Math.random() * 80 + 10}%` : '10%';
        });
      }
      animationRef.current = requestAnimationFrame(animateEQ);
    };

    animateEQ();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div
      className="bg-[#0a0a0a] rounded-[10px] p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-[3px] border-[#2a2a2a] flex flex-col justify-between font-mono"
      style={{ gridArea: 'screen' }}
    >
      <div>
        <div className="text-[#008822] text-[0.8rem] uppercase mb-2">{artistName}</div>
        <div className="text-[var(--color-accent-screen)] text-[1.2rem] uppercase">
          {trackName}
        </div>
      </div>

      <div
        ref={eqRef}
        className="h-[60px] flex items-end gap-[2px] mt-4"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(0,255,68,0.1) 1px, transparent 1px)',
          backgroundSize: '100% 10px',
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-[var(--color-accent-screen)] h-[10%] transition-[height] duration-[100ms] opacity-70 rounded-sm"
          />
        ))}
      </div>
    </div>
  );
}