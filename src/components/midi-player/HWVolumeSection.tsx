interface HWVolumeSectionProps {
  progress: number;
  currentTime: string;
  onProgressClick?: (progress: number) => void;
}

export function HWVolumeSection({ progress, currentTime, onProgressClick }: HWVolumeSectionProps) {
  return (
    <div
      className="flex items-center gap-4 pt-6 border-t border-black/10 col-span-3"
      style={{ gridArea: 'volume' }}
    >
      <span className="text-[0.7rem] uppercase text-[var(--color-text-mid)]">
        Progress
      </span>

      <div
        className="flex-1 h-[12px] bg-[#101010] rounded cursor-pointer shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] overflow-hidden relative"
        onClick={(e) => {
          if (onProgressClick) {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            onProgressClick(Math.max(0, Math.min(100, percent)));
          }
        }}
      >
        <div
          className="h-full bg-[var(--color-accent-screen)] rounded transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-[0.7rem] font-mono text-[var(--color-text-mid)] min-w-[60px]">
        {currentTime}
      </span>
    </div>
  );
}