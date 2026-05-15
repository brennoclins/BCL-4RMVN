interface HWTransportProps {
  isPlaying: boolean;
  isLooping: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onToggleLoop: () => void;
  disabled?: boolean;
}

export function HWTransport({
  isPlaying,
  isLooping,
  onPlayPause,
  onStop,
  onToggleLoop,
  disabled = false,
}: HWTransportProps) {
  return (
    <div className="flex justify-center items-center gap-2 pt-4 border-t border-black/10" role="toolbar" aria-label="Playback controls">
      <button
        onClick={onToggleLoop}
        disabled={disabled}
        aria-label={isLooping ? 'Disable loop' : 'Enable loop'}
        aria-pressed={isLooping}
        className={`p-3 border rounded shadow-[0_2px_3px_rgba(0,0,0,0.1)] disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
          isLooping
            ? 'bg-[var(--color-accent-screen)] text-[var(--color-accent-screen)] border-[var(--color-accent-screen)] shadow-[0_0_10px_rgba(0,255,68,0.4)]'
            : 'bg-gradient-to-b from-white to-[#e0e0e0] border-black/10 hover:border-[var(--color-text-mid)]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[18px] h-[18px]"
          aria-hidden="true"
        >
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
        </svg>
      </button>

      <button
        onClick={onStop}
        disabled={disabled}
        aria-label="Stop playback"
        className="p-3 bg-gradient-to-b from-white to-[#e0e0e0] border border-black/10 rounded shadow-[0_2px_3px_rgba(0,0,0,0.1)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-[var(--color-text-mid)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[18px] h-[18px] text-[var(--color-text-mid)]"
          aria-hidden="true"
        >
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      </button>

      <button
        onClick={onPlayPause}
        disabled={disabled}
        aria-label={isPlaying ? 'Pause playback' : 'Start playback'}
        className={`flex items-center gap-2 p-3 rounded border border-black/10 shadow-[0_2px_3px_rgba(0,0,0,0.1)] disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
          isPlaying
            ? 'bg-gradient-to-b from-[#ff6666] to-[#cc0000] text-white shadow-[0_0_15px_rgba(255,68,68,0.6)]'
            : 'bg-gradient-to-b from-white to-[#e0e0e0]'
        }`}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[18px] h-[18px] text-white"
            aria-hidden="true"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[18px] h-[18px] text-[var(--color-text-dark)]"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
        <span className="text-[0.75rem] font-bold uppercase">
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </span>
      </button>
    </div>
  );
}
