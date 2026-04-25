interface AudioTransportProps {
  isPlaying: boolean;
  isLooping?: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleLoop?: () => void;
}

export function AudioTransport({
  isPlaying,
  isLooping = false,
  onPlayPause,
  onPrev,
  onNext,
  onToggleLoop,
}: AudioTransportProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPrev}
        className="bg-gradient-to-b from-white to-[var(--color-hw-case-base)] border border-black/10 rounded-md w-[50px] h-[45px] flex items-center justify-center shadow-[0_3px_0_var(--color-hw-case-shadow)] active:translate-y-[2px] active:shadow-[0_1px_0_var(--color-hw-case-shadow)] transition-all hover:shadow-[0_2px_0_var(--color-hw-case-shadow)] hover:!text-[var(--color-hw-orange)]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>

      <button
        onClick={onPlayPause}
        className={`group bg-gradient-to-b from-white to-[var(--color-hw-case-base)] border border-black/10 rounded-md w-[50px] h-[45px] flex items-center justify-center shadow-[0_3px_0_var(--color-hw-case-shadow)] active:translate-y-[2px] hover:!text-[var(--color-hw-orange)] active:shadow-[0_1px_0_var(--color-hw-case-shadow)] transition-all ${isPlaying
          ? 'bg-gradient-to-b from-[#ff8833] to-[#cc5500] border-[#aa4400] shadow-[0_0_12px_rgba(255,102,0,0.6)]'
          : ''
          }`}
      >
        <svg
          className={`w-5 h-5 ${isPlaying ? '!text-[var(--color-hw-orange)]' : ''}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {isPlaying ? (
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </button>

      <button
        onClick={onNext}
        className="bg-gradient-to-b from-white to-[var(--color-hw-case-base)] border border-black/10 rounded-md w-[50px] h-[45px] flex items-center justify-center shadow-[0_3px_0_var(--color-hw-case-shadow)] active:translate-y-[2px] active:shadow-[0_1px_0_var(--color-hw-case-shadow)] transition-all hover:shadow-[0_2px_0_var(--color-hw-case-shadow)] hover:!text-[var(--color-hw-orange)]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>

      {onToggleLoop && (
        <button
          onClick={onToggleLoop}
          className={`bg-gradient-to-b from-white to-[var(--color-hw-case-base)] border border-black/10 rounded-md w-[50px] h-[45px] flex items-center justify-center shadow-[0_3px_0_var(--color-hw-case-shadow)] hover:!text-[var(--color-hw-orange)] active:translate-y-[2px] active:shadow-[0_1px_0_var(--color-hw-case-shadow)] transition-all ${isLooping
            ? 'bg-[var(--color-accent-screen)] text-[var(--color-hw-orange)]'
            : ''
            }`}
          title={isLooping ? 'Loop ativado' : 'Loop desativado'}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
          </svg>
        </button>
      )}
    </div>
  );
}