import { UploadButton } from '@/components/ui';

interface AudioPadsProps {
  onFileSelect: (file: File) => void;
}

export function AudioPads({ onFileSelect }: AudioPadsProps) {
  return (
    <div
      className="grid grid-cols-1 gap-2 pr-6 border-r border-[--color-border-alpha]"
      style={{ gridTemplateRows: 'repeat(4, 1fr)' }}
    >
      <UploadButton
        onFileSelect={onFileSelect}
        accept=".mp3,.wav,.ogg,.m4a,.aac,.flac"
        label="Load Audio"
        className="col-span-1"
      />
    </div>
  );
}
