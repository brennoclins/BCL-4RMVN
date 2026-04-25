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
    <div
      className="bg-[#d8d8d8] rounded-lg p-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] flex flex-col gap-4"
      style={{ gridArea: 'sidebar' }}
    >
      <span className="text-[0.7rem] font-bold uppercase text-[var(--color-text-mid)]">
        Playlist Data
      </span>

      <ul className="overflow-y-auto max-h-[280px] flex-1">
        {tracks.length === 0 ? (
          <li className="text-[0.8rem] px-2 py-1">Nenhum arquivo...</li>
        ) : (
          tracks.map((track, index) => (
            <li
              key={index}
              onClick={() => onSelectTrack(index)}
              className={`text-[0.8rem] px-2 py-1 rounded cursor-pointer mb-1 transition-all duration-200 whitespace-nowrap overflow-hidden text-overflow-ellipsis ${
                index === currentIndex
                  ? 'bg-[var(--color-hw-orange)] text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            >
              {track.name}
            </li>
          ))
        )}
      </ul>

      <label
        className="block bg-[var(--color-pad-off)] text-[var(--color-text-light)] text-center p-3 rounded text-[0.7rem] uppercase cursor-pointer mt-auto transition-all duration-200 hover:bg-[#303030] hover:shadow-[0_0_10px_rgba(255,102,0,0.4)]"
        style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.4)' }}
      >
        Importar MP3/WAV
        <input
          type="file"
          multiple
          accept="audio/*,.mid,.midi"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}