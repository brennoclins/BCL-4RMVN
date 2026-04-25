interface InstrumentTagProps {
  name: string
  type?: 'default' | 'drums' | 'bass'
  active?: boolean
}

export function InstrumentTag({
  name,
  type = 'default',
  active = false,
}: InstrumentTagProps) {
  const displayName = name.length > 8 ? name.substring(0, 8) + '..' : name

  const typeClasses = {
    default: active
      ? 'bg-[--color-hw-orange] shadow-[0_0_15px_rgba(255,102,0,0.8),inset_0_2px_1px_rgba(255,255,255,0.4)] border-[#ffaa66] text-white'
      : 'bg-[#1a1a1a] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#303030]',
    drums: active
      ? 'bg-[--color-hw-orange] shadow-[0_0_15px_rgba(255,102,0,0.8)] border-[#ffaa66] text-white'
      : 'bg-[#1a1a1a] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#303030]',
    bass: active
      ? 'bg-[#00aaff] shadow-[0_0_15px_rgba(0,170,255,0.8)] border-[#66ccff] text-white'
      : 'bg-[#1a1a1a] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#303030]',
  }

  return (
    <div
      className={`rounded text-xs uppercase flex items-center justify-center p-2 transition-all ${typeClasses[type]}`}
    >
      {displayName}
    </div>
  )
}