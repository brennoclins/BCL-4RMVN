import { useRef } from 'react';

interface TrackInfo {
  index: number;
  name: string;
  channel: number;
  muted: boolean;
  noteCount: number;
}

interface HWPadsProps {
  tracks: TrackInfo[];
  onFileSelect: (file: File) => void;
  onToggleMute: (trackIndex: number, muted: boolean) => void;
}

export function HWPads({ tracks, onFileSelect, onToggleMute }: HWPadsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="pr-6 col-start-1 row-start-2 row-span-2 grid grid-cols-3 gap-2 border-r border-black/10" aria-label="MIDI file controls">
      <button
        onClick={() => fileInputRef.current?.click()}
        aria-label="Load MIDI file"
        className="col-span-3 bg-[var(--color-pad-off)] rounded-md cursor-pointer flex flex-col items-center justify-center p-4 shadow-[0_3px_6px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] border-none text-white text-[0.7rem] uppercase transition-all hover:shadow-[0_0_15px_rgba(255,51,102,0.6)] hover:bg-[#303030]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 mb-1"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Load MIDI
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".mid,.midi"
        onChange={handleFileChange}
        aria-label="Select MIDI file"
        className="hidden"
      />

      <div className="col-span-3 flex flex-col gap-1.5 max-h-[300px] overflow-y-auto pr-1" role="list" aria-label="MIDI tracks">
        {tracks.length === 0 ? (
          <div className="text-[0.7rem] text-white/40 text-center py-4 italic">
            No tracks loaded
          </div>
        ) : (
          tracks.map((track) => (
            <div
              key={track.index}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-[0.65rem] transition-all ${
                track.muted
                  ? 'bg-black/30 text-white/30'
                  : 'bg-white/10 text-white'
              }`}
              role="listitem"
            >
              <button
                onClick={() => onToggleMute(track.index, !track.muted)}
                aria-label={track.muted ? `Unmute ${track.name}` : `Mute ${track.name}`}
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                  track.muted
                    ? 'bg-red-900/50 text-red-400 hover:bg-red-800/50'
                    : 'bg-green-900/50 text-green-400 hover:bg-green-800/50'
                }`}
              >
                {track.muted ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="truncate font-bold uppercase">{track.name}</div>
                <div className="text-white/40">
                  Ch {track.channel + 1} · {track.noteCount} notes
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
