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
    <section className="max-w-lg w-full bg-[#0a0a0a] rounded-xl p-6! shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-[3px] border-[#2a2a2a] font-mono min-h-45 flex flex-col justify-between">
      <div>
        <div className="text-[#008822] text-[0.8rem] uppercase" id="artistName">{artistName}</div>
        <div className="text-accent-screen text-[1.4rem] uppercase truncate" id="trackName">
          {trackName}
        </div>
      </div>
      <div
        ref={eqRef}
        className="h-15 flex items-end gap-0.5 bg-size[100%_10px]"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(0,255,68,0.1) 1px, transparent 1px)',
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="eq-bar flex-1 bg-accent-screen opacity-70 rounded-t-[1px] transition-all duration-100 h-[10%]"
          />
        ))}
      </div>
    </section>
  );
}