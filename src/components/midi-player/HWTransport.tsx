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
    <div className="flex justify-center items-center gap-2 pt-4 border-t border-black/10">
      <button
        onClick={onStop}
        disabled={disabled}
        className="p-3 bg-gradient-to-b from-white to-[#e0e0e0] border border-black/10 rounded shadow-[0_2px_3px_rgba(0,0,0,0.1)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:border-[var(--color-text-mid)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[18px] h-[18px] text-[var(--color-text-mid)]"
        >
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      </button>

      <button
        onClick={onPlayPause}
        disabled={disabled}
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