import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-12 px-8 max-w-[1200px] mx-auto min-h-[70vh] gap-12">
      <div className="flex-1 max-w-[500px] text-center md:text-left">
        <div className="bg-[var(--color-text-dark)] text-white px-3 py-1.5 inline-block text-[0.65rem] font-bold uppercase mb-4 rounded">
          Professional MIDI Solutions
        </div>
        <h1 className="text-[3.5rem] leading-[1.05] mb-4 uppercase tracking-[-2px] font-bold">
          Sinta o Som Tátil.
        </h1>
        <p className="text-[1rem] text-[var(--color-text-mid)] mb-6 leading-relaxed">
          O BCL-4RMVN Professional une a precisão digital do KeyForge com a experiência tátil de hardware premium. Performance sem latência para músicos modernos.
        </p>
        <Link
          to="/midi-player"
          className="inline-block text-white px-8 py-3 rounded-md font-bold uppercase text-[0.9rem] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] bg-gradient-to-br from-[#ff7733] to-[#ff5500] hover:-translate-y-0.5 transition-all active:scale-95"
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
      className="w-[400px] h-[280px] bg-gradient-to-br from-[var(--color-hw-case-light)] to-[#d0d0d0] rounded-2xl shadow-[15px_15px_40px_rgba(0,0,0,0.2),-4px_-4px_12px_#ffffff] p-6 grid gap-3"
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
  const pads = [
    { active: true },
    { active: false },
    { active: false },
    { active: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-2" style={{ gridArea: 'pad' }}>
      {pads.map((pad, i) => (
        <div
          key={i}
          className={`rounded-md ${pad.active ? 'bg-[var(--color-hw-orange)] shadow-[0_0_12px_#ff6600]' : 'bg-[var(--color-pad-off)] shadow-[0_3px_0_#000]'}`}
        />
      ))}
    </div>
  );
}

function HWScreenMock() {
  return (
    <div
      className="rounded-md border-[3px] border-[#333] shadow-[inset_0_0_8px_rgba(0,255,102,0.3)] flex items-center justify-center bg-black"
      style={{ gridArea: 'screen' }}
    >
      <span className="text-[var(--color-accent-screen)] font-mono text-[0.7rem] animate-pulse">
        4RMVN EQ
      </span>
    </div>
  );
}

function HWKeysMock() {
  return (
    <div
      className="rounded-md bg-white shadow-[0_4px_0_#ccc] flex items-end justify-center gap-[3px] p-1.5 h-[50px] relative"
      style={{ gridArea: 'keys' }}
    >
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className="flex-1 h-full bg-gradient-to-b from-[#f5f5f5] to-[var(--color-hw-case-base)] rounded-b-sm"
        />
      ))}
      <div className="absolute w-3 h-[60%] bg-gradient-to-b from-[#404040] to-black left-[13%] rounded-b-sm z-10" />
      <div className="absolute w-3 h-[60%] bg-gradient-to-b from-[#404040] to-black left-[27%] rounded-b-sm z-10" />
      <div className="absolute w-3 h-[60%] bg-gradient-to-b from-[#404040] to-black left-[56%] rounded-b-sm z-10" />
      <div className="absolute w-3 h-[60%] bg-gradient-to-b from-[#404040] to-black left-[70%] rounded-b-sm z-10" />
      <div className="absolute w-3 h-[60%] bg-gradient-to-b from-[#404040] to-black left-[84%] rounded-b-sm z-10" />
    </div>
  );
}