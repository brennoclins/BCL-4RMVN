import { useRef } from 'react';
import { InstrumentTag } from '../ui';

interface HWPadsProps {
  instruments: string[];
  onFileSelect: (file: File) => void;
}

export function HWPads({ instruments, onFileSelect }: HWPadsProps) {
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

      <div role="list" aria-label="Detected instruments">
        {instruments.map((inst) => {
          let type: 'default' | 'drums' | 'bass' = 'default';
          if (inst === 'Drums') type = 'drums';
          else if (inst.toLowerCase().includes('bass')) type = 'bass';

          return <InstrumentTag key={inst} name={inst} type={type} active />;
        })}
      </div>
    </div>
  );
}
