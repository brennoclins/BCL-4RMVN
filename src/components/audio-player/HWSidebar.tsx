import type { Track } from '../../pages/AudioPlayerPage';

interface HWSidebarProps {
  tracks: Track[];
  currentIndex: number;
  onSelectTrack: (index: number) => void;
  onFileUpload: (files: FileList) => void;
}

export function HWSidebar({ tracks, currentIndex, onSelectTrack, onFileUpload }: HWSidebarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <aside className="w-full md:w-[280px] md:min-w-[280px] bg-[#d8d8d8] rounded-lg p-5 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] flex flex-col gap-4">
      <span className="text-[0.7rem] font-bold uppercase text-[var(--color-text-mid)]">
        Playlist Data
      </span>

      <div className="flex-1 overflow-hidden">
        <ul id="fileList" className="overflow-y-auto max-h-[250px] pr-2">
          {tracks.length === 0 ? (
            <li className="text-[0.8rem] p-3 rounded bg-white/30 truncate italic text-[var(--color-text-mid)]">
              Nenhum arquivo...
            </li>
          ) : (
            tracks.map((track, index) => (
              <li
                key={index}
                onClick={() => onSelectTrack(index)}
                className={`file-item text-[0.8rem] p-3 rounded mb-1 cursor-pointer transition-all truncate ${index === currentIndex
                  ? 'bg-[var(--color-hw-orange)] text-white shadow-md'
                  : 'bg-white/30 hover:bg-white/50'
                  }`}
                title={track.name}
              >
                {track.name}
              </li>
            ))
          )}
        </ul>
      </div>

      <label className="block bg-[var(--color-pad-off)] text-white text-center p-3 rounded text-[0.7rem] uppercase font-bold cursor-pointer hover:bg-[#303030] shadow-[0_3px_6px_rgba(0,0,0,0.4)] transition-all active:scale-95">
        Importar MP3/WAV
        <input
          type="file"
          multiple
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </aside>
  );
}