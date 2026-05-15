interface HWVolumeSectionProps {
  progress: number;
  currentTime: string;
  volume: number;
  onProgressClick?: (progress: number) => void;
  onVolumeChange?: (volume: number) => void;
}

export function HWVolumeSection({ progress, currentTime, volume, onProgressClick, onVolumeChange }: HWVolumeSectionProps) {
  const volumePercent = ((volume + 60) / 60) * 100;

  return (
    <div
      className="flex items-center gap-4 pt-6 border-t border-black/10 col-span-3"
      style={{ gridArea: 'volume' }}
      role="group"
      aria-label="Playback progress and volume"
    >
      <span className="text-[0.7rem] uppercase text-[var(--color-text-mid)]" id="progress-label">
        Progress
      </span>

      <div
        className="flex-1 h-[12px] bg-[#101010] rounded cursor-pointer shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] overflow-hidden relative"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby="progress-label"
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

      <span className="text-[0.7rem] font-mono text-[var(--color-text-mid)] min-w-[60px]" aria-live="polite">
        {currentTime}
      </span>

      <div className="flex items-center gap-2 border-l border-black/10 pl-4">
        <span className="text-[0.7rem] uppercase text-[var(--color-text-mid)]">Vol</span>
        <div
          className="w-20 h-[8px] bg-[#101010] rounded cursor-pointer shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] overflow-hidden relative"
          role="slider"
          aria-label="Volume"
          aria-valuenow={Math.round(volume)}
          aria-valuemin={-60}
          aria-valuemax={0}
          onClick={(e) => {
            if (onVolumeChange) {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              onVolumeChange(pct * -60);
            }
          }}
        >
          <div
            className="h-full bg-[var(--color-hw-orange)] rounded transition-all duration-100"
            style={{ width: `${volumePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
