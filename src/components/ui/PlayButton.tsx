import type { ButtonHTMLAttributes } from 'react';

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  playing: boolean;
  onClick: () => void;
}

export function PlayButton({ playing, onClick, disabled, className = '' }: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-3 rounded text-sm font-bold uppercase shadow-[0_2px_3px_rgba(0,0,0,0.1)] transition-all ${className}`}
      style={
        playing
          ? {
              background: 'linear-gradient(180deg, #ff6666 0%, #cc0000 100%)',
              boxShadow: '0 0 15px rgba(255, 68, 68, 0.6)',
              color: 'white',
            }
          : {
              background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: 'var(--color-text-dark)',
            }
      }
    >
      {playing ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[18px] h-[18px]"
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
            className="w-[18px] h-[18px]"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          PLAY
        </>
      )}
    </button>
  );
}
