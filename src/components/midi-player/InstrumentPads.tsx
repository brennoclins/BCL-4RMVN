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

interface PadOption {
  label: string;
  value: string;
}

interface PadGroupProps {
  label: string;
  options: PadOption[];
  value: string;
  onChange: (value: string) => void;
  color: string;
}

function PadGroup({ label, options, value, onChange, color }: PadGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.55rem] font-bold uppercase tracking-[0.15em] text-[var(--color-text-mid)] text-center">
        {label}
      </span>
      <div className="flex gap-1">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              aria-label={`${label}: ${opt.label}`}
              aria-pressed={isActive}
              className={`
                flex-1 py-2.5 px-1 rounded-md text-[0.5rem] font-bold uppercase tracking-wider
                transition-all duration-75 select-none
                ${isActive
                  ? 'text-white translate-y-[2px]'
                  : 'text-[var(--color-text-mid)] translate-y-0 hover:brightness-110'
                }
              `}
              style={isActive
                ? {
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}50, 0 1px 0 ${color}80, inset 0 1px 2px rgba(255,255,255,0.3)`,
                  }
                : {
                    backgroundColor: '#b0b0b0',
                    boxShadow: '0 3px 0 #888, inset 0 1px 1px rgba(255,255,255,0.5)',
                  }
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface InstrumentPadsProps {
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

export function InstrumentPads({
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
}: InstrumentPadsProps) {
  return (
    <div
      className="bg-[#1a1a1a] rounded-lg p-4 shadow-[inset_0_3px_10px_rgba(0,0,0,0.6)] border-2 border-[#303030]"
      style={{ gridArea: 'instruments' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ff6600] shadow-[0_0_6px_#ff6600]"></div>
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--color-text-mid)]">
          Instrument Select
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <PadGroup
          label="Main"
          value={mainInstrument}
          onChange={(v) => onMainInstrumentChange(v as MainInstrumentType)}
          options={[
            { value: 'casio', label: 'Casio' },
            { value: 'piano', label: 'Piano' },
          ]}
          color="#ff6600"
        />

        <PadGroup
          label="Drums"
          value={drumKit}
          onChange={(v) => onDrumKitChange(v as DrumKitType)}
          options={[
            { value: 'acoustic', label: 'Acoustic' },
            { value: 'linn', label: 'Linn' },
            { value: 'cr78', label: 'CR78' },
          ]}
          color="#ff4444"
        />

        <PadGroup
          label="Organ"
          value={organ}
          onChange={(v) => onOrganChange(v as OrganType)}
          options={[
            { value: 'church', label: 'Church' },
            { value: 'electric', label: 'Electric' },
          ]}
          color="#aa66ff"
        />

        {showBass && (
          <PadGroup
            label="Bass"
            value={bass}
            onChange={(v) => onBassChange(v as BassType)}
            options={[
              { value: 'finger', label: 'Finger' },
              { value: 'pick', label: 'Pick' },
              { value: 'slap', label: 'Slap' },
            ]}
            color="#44aaff"
          />
        )}

        {showGuitar && (
          <PadGroup
            label="Guitar"
            value={guitar}
            onChange={(v) => onGuitarChange(v as GuitarType)}
            options={[
              { value: 'nylon', label: 'Nylon' },
              { value: 'elec', label: 'Elec' },
            ]}
            color="#44ff88"
          />
        )}

        {showBrass && (
          <PadGroup
            label="Brass"
            value={brass}
            onChange={(v) => onBrassChange(v as BrassType)}
            options={[
              { value: 'trumpet', label: 'Trumpet' },
              { value: 'sax', label: 'Sax' },
              { value: 'trombone', label: 'Trombone' },
            ]}
            color="#ffaa44"
          />
        )}

        <PadGroup
          label="Strings"
          value={strings}
          onChange={(v) => onStringsChange(v as StringsType)}
          options={[
            { value: 'strings', label: 'Strings' },
            { value: 'pizz', label: 'Pizz' },
          ]}
          color="#44ddff"
        />

        <PadGroup
          label="Synth"
          value={synth}
          onChange={(v) => onSynthChange(v as SynthType)}
          options={[
            { value: 'lead', label: 'Lead' },
            { value: 'pad', label: 'Pad' },
          ]}
          color="#ff44aa"
        />
      </div>
    </div>
  );
}
