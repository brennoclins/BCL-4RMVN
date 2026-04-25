import { UploadButton, InstrumentTag } from '../ui';

interface HWPadsProps {
  instruments: string[];
  onFileSelect: (file: File) => void;
}

export function HWPads({ instruments, onFileSelect }: HWPadsProps) {
  return (
    <div
      className="pr-6"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '0.5rem',
        borderRight: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <UploadButton onFileSelect={onFileSelect} label="Load MIDI" className="col-span-3" />

      {instruments.map((inst) => {
        let type: 'default' | 'drums' | 'bass' = 'default';
        if (inst === 'Drums') type = 'drums';
        else if (inst.toLowerCase().includes('bass')) type = 'bass';

        return <InstrumentTag key={inst} name={inst} type={type} active />;
      })}
    </div>
  );
}
