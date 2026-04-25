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
      <div className="text-4xl font-bold uppercase tracking-tight">{main}</div>
      <div className="text-xs text-[--color-text-mid] uppercase border-l-2 border-[--color-accent-screen] pl-2 leading-tight whitespace-pre-line">
        {sub}
      </div>
    </div>
  );
}
