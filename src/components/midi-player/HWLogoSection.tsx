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
      <div
        className="font-bold uppercase"
        style={{ fontSize: '2rem', letterSpacing: '-1px', color: 'var(--color-text-dark)' }}
      >
        {main}
      </div>
      <div
        className="text-xs uppercase leading-tight"
        style={{
          color: 'var(--color-text-mid)',
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
