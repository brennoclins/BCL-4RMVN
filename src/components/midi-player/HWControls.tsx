import { Select } from '../ui';
import type {
  DrumKitType,
  MainInstrumentType,
  BassType,
  GuitarType,
  BrassType,
  StringsType,
  SynthType,
  OrganType,
} from '../../types';

interface HWControlsProps {
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
  strings: StringsType;
  onStringsChange: (value: StringsType) => void;
  synth: SynthType;
  onSynthChange: (value: SynthType) => void;
  organ: OrganType;
  onOrganChange: (value: OrganType) => void;
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

const stringsOptions = [
  { value: 'strings', label: 'Strings' },
  { value: 'pizzicato', label: 'Pizzicato' },
];

const synthOptions = [
  { value: 'lead', label: 'Lead' },
  { value: 'pad', label: 'Pad' },
];

const organOptions = [
  { value: 'church', label: 'Church' },
  { value: 'electric', label: 'Electric' },
];

export function HWControls({
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
  strings,
  onStringsChange,
  synth,
  onSynthChange,
  organ,
  onOrganChange,
  showBass = false,
  showGuitar = false,
  showBrass = false,
}: HWControlsProps) {
  return (
    <div className="flex flex-col gap-3 justify-around h-full overflow-y-auto">
      <SettingRow
        label="Main"
        value={mainInstrument}
        onChange={(v) => onMainInstrumentChange(v as MainInstrumentType)}
        options={mainInstrumentOptions}
      />

      <SettingRow
        label="Drums"
        value={drumKit}
        onChange={(v) => onDrumKitChange(v as DrumKitType)}
        options={drumKitOptions}
      />

      <SettingRow
        label="Organ"
        value={organ}
        onChange={(v) => onOrganChange(v as OrganType)}
        options={organOptions}
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

      <SettingRow
        label="Strings"
        value={strings}
        onChange={(v) => onStringsChange(v as StringsType)}
        options={stringsOptions}
      />

      <SettingRow
        label="Synth"
        value={synth}
        onChange={(v) => onSynthChange(v as SynthType)}
        options={synthOptions}
      />
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
      <span className="text-[0.65rem] uppercase text-[var(--color-text-mid)] w-12 text-right">{label}</span>
      <Select options={options} value={value} onChange={onChange} />
    </div>
  );
}
