import { UploadButton, InstrumentTag } from '@/components/ui';

interface HWPadsProps {
  instruments: string[];
  onFileSelect: (file: File) => void;
}

export function HWPads({ instruments, onFileSelect }: HWPadsProps) {
  return (
    <div
      className="grid grid-cols-3 gap-2 pr-6 border-r border-[--color-border-alpha]"
      style={{ gridTemplateRows: 'auto repeat(3, 1fr)' }}
    >
      <UploadButton onFileSelect={onFileSelect} label="Load MIDI" />

      {instruments.map((inst) => {
        let type: 'default' | 'drums' | 'bass' = 'default';
        if (inst === 'Drums') type = 'drums';
        else if (inst.toLowerCase().includes('bass')) type = 'bass';

        return <InstrumentTag key={inst} name={inst} type={type} active />;
      })}
    </div>
  );
}
