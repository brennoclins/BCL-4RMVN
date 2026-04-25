import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="flex items-center justify-center px-8 py-12 max-w-[1200px] mx-auto min-h-[70vh] gap-12">
      <div className="flex-1 max-w-[500px]">
        <div className="bg-[--color-text-dark] text-white px-3 py-2 inline-block text-xs font-bold uppercase mb-4 rounded">
          Professional MIDI Solutions
        </div>
        <h1 className="text-5xl leading-tight mb-4 uppercase tracking-wide">Sinta o Som Tátil.</h1>
        <p className="text-base text-[--color-text-mid] mb-6 leading-relaxed">
          O BCL-4RMVN Professional une a precisão digital do KeyForge com a experiência tátil de
          hardware premium. Performance sem latência para músicos modernos.
        </p>
        <Link
          to="/midi-player"
          className="inline-block px-8 py-3 text-sm font-bold uppercase bg-gradient-to-b from-white to-e0e0e0 border border-black/10 rounded-md text-[--color-text-dark] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] hover:translate-y-[-2px] hover:shadow-[5px_5px_12px_rgba(0,0,0,0.15)] transition-all"
        >
          Abrir KEYFORGE MIDI Player
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <HWPreview />
      </div>
    </section>
  );
}

function HWPreview() {
  return (
    <div
      className="w-[400px] h-[280px] bg-gradient-to-b from-[#f5f5f5] to-[#d0d0d0] rounded-2xl shadow-[15px_15px_40px_rgba(0,0,0,0.2),-4px_-4px_12px_#fff] p-6 grid gap-3"
      style={{
        gridTemplateAreas: '"pad pad screen" "pad pad screen" "keys keys keys"',
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
    >
      <HWPadMock />
      <HWScreenMock />
      <HWKeysMock />
    </div>
  );
}

function HWPadMock() {
  return (
    <div className="grid grid-cols-2 gap-2" style={{ gridArea: 'pad' }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`bg-[--color-pad-off] rounded shadow-[0_3px_0_#000] ${
            i === 0 || i === 3 ? 'bg-[--color-pad-on] shadow-[0_0_12px_var(--color-pad-on)]' : ''
          }`}
        />
      ))}
    </div>
  );
}

function HWScreenMock() {
  return (
    <div
      className="bg-black rounded border-[3px] border-[#333] shadow-[inset_0_0_8px_rgba(0,255,68,0.3)] flex items-center justify-center text-[--color-accent-screen] font-mono text-xs"
      style={{ gridArea: 'screen' }}
    >
      <span className="animate-pulse">4RMVN EQ</span>
    </div>
  );
}

function HWKeysMock() {
  const keys = [
    { isBlack: false },
    { isBlack: false },
    { isBlack: true },
    { isBlack: false },
    { isBlack: true },
    { isBlack: false },
    { isBlack: false },
    { isBlack: true },
    { isBlack: false },
    { isBlack: true },
    { isBlack: false },
    { isBlack: false },
  ];

  return (
    <div
      className="bg-white rounded shadow-[0_4px_0_#ccc] flex items-end justify-center gap-[3px] p-2"
      style={{ gridArea: 'keys' }}
    >
      {keys.map((key, i) => (
        <div
          key={i}
          className={`flex-1 rounded-b h-6 bg-gradient-to-b from-white to-gray-200 ${
            key.isBlack
              ? 'w-3 h-4 bg-gradient-to-b from-gray-600 to-gray-900 -mx-1.5 z-10 rounded-b-sm'
              : ''
          }`}
        />
      ))}
    </div>
  );
}
