import { IconButton, PlayButton } from '@/components/ui';

interface HWTransportProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export function HWTransport({
  isPlaying,
  onPlayPause,
  onStop,
  disabled = false,
}: HWTransportProps) {
  return (
    <div className="flex justify-center items-center gap-4 pt-4 border-t border-[--color-border-alpha]">
      <IconButton
        onClick={onStop}
        disabled={disabled}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        }
      />
      <PlayButton playing={isPlaying} onClick={onPlayPause} disabled={disabled} />
    </div>
  );
}
