import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section
      className="flex items-center justify-center px-8 py-12"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '70vh',
        gap: '3rem',
      }}
    >
      <div className="flex-1" style={{ maxWidth: '500px' }}>
        <div
          className="inline-block text-white px-2 py-1 text-[0.65rem] font-bold uppercase mb-4 rounded"
          style={{ backgroundColor: 'var(--color-text-dark)' }}
        >
          Professional MIDI Solutions
        </div>
        <h1
          className="uppercase leading-[1.05] mb-4"
          style={{ fontSize: '3.5rem', letterSpacing: '-2px' }}
        >
          Sinta o Som Tátil.
        </h1>
        <p className="text-base mb-6" style={{ color: 'var(--color-text-mid)', lineHeight: 1.5 }}>
          O BCL-4RMVN Professional une a precisão digital do KeyForge com a experiência tátil de
          hardware premium. Performance sem latência para músicos modernos.
        </p>
        <Link
          to="/midi-player"
          className="inline-block px-8 py-3 text-sm font-bold uppercase rounded"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
            border: '1px solid rgba(0,0,0,0.1)',
            color: 'var(--color-text-dark)',
            boxShadow: '3px 3px 8px rgba(0,0,0,0.1), -2px -2px 5px #fff',
          }}
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
      className="rounded-2xl p-6"
      style={{
        width: '400px',
        height: '280px',
        background: 'linear-gradient(145deg, #f5f5f5, #d0d0d0)',
        boxShadow: '15px 15px 40px rgba(0,0,0,0.2), -4px -4px 12px #ffffff',
        display: 'grid',
        gap: '0.8rem',
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
          className="rounded"
          style={{
            backgroundColor: i === 0 || i === 3 ? 'var(--color-pad-on)' : 'var(--color-pad-off)',
            boxShadow: i === 0 || i === 3 ? '0 0 12px var(--color-pad-on)' : '0 3px 0 #000',
          }}
        />
      ))}
    </div>
  );
}

function HWScreenMock() {
  return (
    <div
      className="rounded flex items-center justify-center text-[--color-accent-screen] font-mono text-xs"
      style={{
        gridArea: 'screen',
        backgroundColor: '#000',
        border: '3px solid #333',
        boxShadow: 'inset 0 0 8px rgba(0,255,68,0.3)',
      }}
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
      className="rounded flex items-end justify-center p-2"
      style={{
        gridArea: 'keys',
        backgroundColor: 'white',
        boxShadow: '0 4px 0 #ccc',
        gap: '3px',
      }}
    >
      {keys.map((key, i) => (
        <div
          key={i}
          className="flex-1 rounded-b"
          style={{
            height: '25px',
            background: key.isBlack
              ? 'linear-gradient(180deg, #404040, #1a1a1a)'
              : 'linear-gradient(180deg, #f5f5f5, #e0e0e0)',
            ...(key.isBlack
              ? {
                  width: '12px',
                  margin: '0 -6px',
                  zIndex: 1,
                  borderRadius: '0 0 2px 2px',
                }
              : {}),
          }}
        />
      ))}
    </div>
  );
}
