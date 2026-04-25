interface HWLogoSectionProps {
  main?: string;
  sub?: string;
}

export function HWLogoSection({
  main = 'KEYFORGE',
  sub = 'PROFESSIONAL\nMIDI PLAYER',
}: HWLogoSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[2rem] font-bold uppercase tracking-tighter text-[var(--color-text-dark)]">
        {main}
      </div>
      <div
        className="text-[0.65rem] uppercase leading-tight text-[var(--color-text-mid)]"
        style={{
          borderLeft: '2px solid var(--color-accent-screen)',
          paddingLeft: '0.4rem',
          whiteSpace: 'pre-line',
        }}
      >
        {sub}
      </div>
    </div>
  );
}