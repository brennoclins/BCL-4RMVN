import { ProgressBar } from '../ui';

interface HWVolumeSectionProps {
  progress: number;
  currentTime: string;
  onProgressClick?: (progress: number) => void;
}

export function HWVolumeSection({ progress, currentTime, onProgressClick }: HWVolumeSectionProps) {
  return (
    <div
      className="flex items-center gap-4"
      style={{
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        gridColumn: 'span 3',
      }}
    >
      <span className="text-xs uppercase" style={{ color: 'var(--color-text-mid)' }}>
        Progress
      </span>
      <ProgressBar progress={progress} onClick={onProgressClick} className="flex-1" />
      <span
        className="text-xs font-mono"
        style={{ color: 'var(--color-text-mid)', minWidth: '60px' }}
      >
        {currentTime}
      </span>
    </div>
  );
}
