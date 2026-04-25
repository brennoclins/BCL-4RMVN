import { ProgressBar } from '@/components/ui';

interface AudioVolumeSectionProps {
  progress: number;
  currentTime: string;
  onProgressClick?: (progress: number) => void;
}

export function AudioVolumeSection({
  progress,
  currentTime,
  onProgressClick,
}: AudioVolumeSectionProps) {
  return (
    <div className="flex items-center gap-4 pt-6 border-t border-[--color-border-alpha] col-span-3">
      <span className="text-xs text-[--color-text-mid] uppercase">Progress</span>
      <ProgressBar progress={progress} onClick={onProgressClick} className="flex-1" />
      <span className="text-xs text-[--color-text-mid] font-mono min-w-[60px]">{currentTime}</span>
    </div>
  );
}
