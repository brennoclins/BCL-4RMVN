import { Link } from 'react-router-dom';

interface SectionLinkProps {
  to: string;
  title: string;
  description: string;
  emoji: string;
  unitId: string;
  accentColor: 'orange' | 'green';
}

export function SectionLink({ to, title, description, emoji, unitId, accentColor }: SectionLinkProps) {
  const isOrange = accentColor === 'orange';

  return (
    <Link
      to={to}
      className="relative block w-full max-w-[800px] mx-auto mb-8 bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden transition-all duration-300 hover:translate-x-1 group no-underline shadow-[6px_6px_15px_rgba(0,0,0,0.1)]"
    >
      {/* Header Estilo Rack */}
      <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
        </div>
        <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
          SYSTEM UNIT: {unitId}
        </span>
      </div>

      <div className="p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Slot de Ícone Encastrado */}
        <div className={`w-20 h-20 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0 transition-all duration-500 ${isOrange ? 'group-hover:shadow-[0_0_20px_rgba(255,102,0,0.3)]' : 'group-hover:shadow-[0_0_20px_rgba(0,255,68,0.3)]'}`}>
          <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">
            {emoji}
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#202020] m-0 leading-none">
            {title}
          </h2>
          <div className={`h-1 w-12 my-3 mx-auto md:mx-0 rounded-full ${isOrange ? 'bg-[#ff6600]' : 'bg-[#00aa33]'}`}></div>
          <p className="text-[0.9rem] text-[#505050] font-medium uppercase leading-tight">
            {description}
          </p>
        </div>

        {/* LED de Status e Seta */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded border border-black/5">
            <div className={`w-2 h-2 rounded-full ${isOrange ? 'bg-[#ff6600] animate-pulse shadow-[0_0_8px_#ff6600]' : 'bg-[#00aa33] shadow-[0_0_8px_#00aa33]'}`}></div>
            <span className="text-[10px] font-mono font-bold text-[#202020]">READY</span>
          </div>
          <svg className={`w-6 h-6 text-[#505050] group-hover:translate-x-2 transition-transform ${isOrange ? 'group-hover:text-[#ff6600]' : 'group-hover:text-[#00aa33]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}