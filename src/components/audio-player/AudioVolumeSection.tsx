interface AudioVolumeSectionProps {
  onVolumeChange: (delta: number) => void;
  progress: number;
  currentTime: string;
  totalTime: string;
  onProgressClick?: (percent: number) => void;
}

export function AudioVolumeSection({
  onVolumeChange,
  progress,
  currentTime,
  totalTime,
  onProgressClick,
}: AudioVolumeSectionProps) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-[0.7rem] font-bold uppercase text-[var(--color-text-mid)]">
          Master Vol
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => onVolumeChange(-5)}
            className="w-[35px] h-[28px] bg-white border border-black/10 rounded shadow-[0_2px_0_var(--color-hw-case-shadow)] text-[0.8rem] font-bold hover:!bg-[var(--color-hw-orange)] active:translate-y-[1px] active:shadow-none transition-all"
          >
            -
          </button>
          <button
            onClick={() => onVolumeChange(5)}
            className="w-[35px] h-[28px] bg-white border border-black/10 rounded shadow-[0_2px_0_var(--color-hw-case-shadow)] text-[0.8rem] font-bold hover:!bg-[var(--color-hw-orange)] active:translate-y-[1px] active:shadow-none transition-all"
          >
            +
          </button>
        </div>
      </div>

      <div
        className="h-[6px] bg-[#101010] rounded-full overflow-hidden shadow-inner cursor-pointer"
        onClick={(e) => {
          if (onProgressClick) {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            onProgressClick(Math.max(0, Math.min(100, percent)));
          }
        }}
      >
        <div
          className="h-full bg-[var(--color-accent-screen)] shadow-[0_0_8px_#00ff44] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-[0.65rem] font-mono text-[var(--color-text-mid)] text-right uppercase">
        <span>{currentTime}</span> / <span>{totalTime}</span>
      </div>
    </div>
  );
}