interface InstrumentTagProps {
  name: string;
  type?: 'default' | 'drums' | 'bass';
  active?: boolean;
}

export function InstrumentTag({ name, type = 'default', active = false }: InstrumentTagProps) {
  const displayName = name.length > 8 ? name.substring(0, 8) + '..' : name;

  let backgroundColor = 'var(--color-pad-off)';
  let boxShadow = '0 2px 4px rgba(0,0,0,0.5)';
  let border = '1px solid #303030';

  if (active) {
    if (type === 'drums') {
      backgroundColor = 'var(--color-hw-orange)';
      boxShadow = '0 0 15px rgba(255,102,0,0.8)';
      border = '1px solid #ffaa66';
    } else if (type === 'bass') {
      backgroundColor = '#00aaff';
      boxShadow = '0 0 15px rgba(0,170,255,0.8)';
      border = '1px solid #66ccff';
    } else {
      backgroundColor = 'var(--color-hw-orange)';
      boxShadow = '0 0 15px rgba(255,102,0,0.8), inset 0 2px 1px rgba(255,255,255,0.4)';
      border = '1px solid #ffaa66';
    }
  }

  return (
    <div
      className="rounded text-xs uppercase flex items-center justify-center p-2 transition-all"
      style={{
        backgroundColor,
        boxShadow,
        border,
        color: active ? 'white' : 'var(--color-text-light)',
      }}
    >
      {displayName}
    </div>
  );
}
