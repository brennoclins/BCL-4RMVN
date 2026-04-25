import { Select } from '@/components/ui';
import type { DrumKitType, MainInstrumentType, BassType, GuitarType, BrassType } from '@/types';

interface HWControlsProps {
  soundMode: 'samples' | 'digital';
  onSoundModeChange: (value: 'samples' | 'digital') => void;
  drumKit: DrumKitType;
  onDrumKitChange: (value: DrumKitType) => void;
  mainInstrument: MainInstrumentType;
  onMainInstrumentChange: (value: MainInstrumentType) => void;
  bass: BassType;
  onBassChange: (value: BassType) => void;
  guitar: GuitarType;
  onGuitarChange: (value: GuitarType) => void;
  brass: BrassType;
  onBrassChange: (value: BrassType) => void;
  showBass?: boolean;
  showGuitar?: boolean;
  showBrass?: boolean;
}

const drumKitOptions = [
  { value: 'acoustic', label: 'Acoustic' },
  { value: 'cr78', label: 'CR78' },
  { value: 'linn', label: 'LinnDrum' },
  { value: 'r8', label: 'R8' },
  { value: 'techno', label: 'Techno' },
  { value: 'stark', label: 'Stark' },
  { value: 'kit3', label: 'Kit3' },
  { value: 'kit8', label: 'Kit8' },
  { value: 'kpr77', label: 'KPR77' },
  { value: 'bongos', label: 'Bongos' },
];

const mainInstrumentOptions = [
  { value: 'casio', label: 'Casio' },
  { value: 'piano', label: 'Piano' },
];

const bassOptions = [
  { value: 'finger', label: 'Finger' },
  { value: 'pick', label: 'Pick' },
  { value: 'slap', label: 'Slap' },
];

const guitarOptions = [
  { value: 'nylon', label: 'Nylon' },
  { value: 'electric', label: 'Electric' },
];

const brassOptions = [
  { value: 'trumpet', label: 'Trumpet' },
  { value: 'trombone', label: 'Trombone' },
  { value: 'sax', label: 'Sax' },
];

export function HWControls({
  soundMode,
  onSoundModeChange,
  drumKit,
  onDrumKitChange,
  mainInstrument,
  onMainInstrumentChange,
  bass,
  onBassChange,
  guitar,
  onGuitarChange,
  brass,
  onBrassChange,
  showBass = false,
  showGuitar = false,
  showBrass = false,
}: HWControlsProps) {
  return (
    <div className="flex flex-col gap-4 justify-around">
      <SettingRow
        label="Sound"
        value={soundMode}
        onChange={(v) => onSoundModeChange(v as 'samples' | 'digital')}
        options={[
          { value: 'samples', label: 'Samples' },
          { value: 'digital', label: 'Digital' },
        ]}
      />

      <SettingRow
        label="Drum Kit"
        value={drumKit}
        onChange={(v) => onDrumKitChange(v as DrumKitType)}
        options={drumKitOptions}
      />

      <SettingRow
        label="Main"
        value={mainInstrument}
        onChange={(v) => onMainInstrumentChange(v as MainInstrumentType)}
        options={mainInstrumentOptions}
      />

      {showBass && (
        <SettingRow
          label="Bass"
          value={bass}
          onChange={(v) => onBassChange(v as BassType)}
          options={bassOptions}
        />
      )}

      {showGuitar && (
        <SettingRow
          label="Guitar"
          value={guitar}
          onChange={(v) => onGuitarChange(v as GuitarType)}
          options={guitarOptions}
        />
      )}

      {showBrass && (
        <SettingRow
          label="Brass"
          value={brass}
          onChange={(v) => onBrassChange(v as BrassType)}
          options={brassOptions}
        />
      )}
    </div>
  );
}

interface SettingRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function SettingRow({ label, value, onChange, options }: SettingRowProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-xs text-[--color-text-mid] uppercase">{label}</span>
      <Select options={options} value={value} onChange={onChange} />
    </div>
  );
}
