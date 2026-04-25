interface PlayButtonProps {
  playing: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function PlayButton({ playing, onClick, disabled }: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-white to-gray-200 border border-black/10 rounded text-sm font-bold uppercase shadow-[0_2px_3px_rgba(0,0,0,0.1)] hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
        playing
          ? 'bg-gradient-to-b from-red-500 to-red-700 text-white shadow-[0_0_15px_rgba(255,68,68,0.6)]'
          : ''
      }`}
    >
      {playing ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
          PAUSE
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          PLAY
        </>
      )}
    </button>
  );
}
