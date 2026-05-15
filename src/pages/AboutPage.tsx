import { Link } from 'react-router-dom';

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  accent?: 'orange' | 'green';
}

function InfoCard({ icon, title, description, accent = 'orange' }: InfoCardProps) {
  const accentColor = accent === 'orange' ? '#ff6600' : '#00ff44';

  return (
    <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] mb-4">
          <span className="text-2xl filter grayscale-0">{icon}</span>
        </div>
        <h3 className="text-base font-black uppercase tracking-tighter text-[#202020] mb-2">
          {title}
        </h3>
        <div className={`h-0.5 w-8 mb-3 rounded-full`} style={{ backgroundColor: accentColor }}></div>
        <p className="text-[0.85rem] text-[#505050] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  accent?: 'orange' | 'green';
}

function StatCard({ value, label, accent = 'orange' }: StatCardProps) {
  const accentColor = accent === 'orange' ? '#ff6600' : '#00ff44';

  return (
    <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="text-3xl font-black tracking-tighter" style={{ color: accentColor }}>
          {value}
        </div>
        <div className="h-0.5 w-8 my-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
        <span className="text-[0.75rem] font-bold uppercase tracking-wider text-[#505050]">
          {label}
        </span>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12">
      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          </div>
          <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
            SYSTEM UNIT: 4RMVN-ABOUT-04
          </span>
        </div>

        <div className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0">
            <span className="text-3xl filter grayscale-0">🎛️</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-[#202020] m-0 leading-none">
              Sobre Nós
            </h1>
            <div className="h-1 w-12 my-3 mx-auto md:mx-0 rounded-full bg-[#ff6600]"></div>
            <p className="text-[0.85rem] text-[#505050] font-medium uppercase leading-tight">
              Criando ferramentas de áudio com paixão e precisão
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded border border-black/5">
              <div className="w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_8px_#ff6600]"></div>
              <span className="text-[10px] font-mono font-bold text-[#202020]">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="p-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#202020] mb-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_6px_#ff6600]"></div>
            Nossa História
          </h2>
          <div className="text-[0.9rem] text-[#505050] leading-relaxed space-y-4">
            <p>
              O <strong className="text-[#202020]">BCL-4RMVN</strong> nasceu da paixão por música e tecnologia.
              Como músico e desenvolvedor, percebi que faltavam ferramentas de áudio web que
              combinassem <strong className="text-[#202020]">qualidade profissional</strong> com uma interface que
              remetesse à experiência tátil de hardware real.
            </p>
            <p>
              Assim surgiu o Keyforce: um player de áudio e MIDI que roda inteiramente no
              navegador, utilizando <strong className="text-[#202020]">samples reais</strong> de instrumentos e
              uma interface skeuomórfica que simula a profundidade e resposta de controladores
              físicos.
            </p>
            <p>
              Nosso objetivo é democratizar o acesso a ferramentas de áudio de qualidade,
              permitindo que qualquer pessoa com um navegador possa carregar, reproduzir e
              explorar arquivos MIDI e de áudio com <strong className="text-[#202020]">fidelidade e estilo</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard value="100%" label="Client-Side" accent="orange" />
        <StatCard value="10+" label="Drum Kits" accent="green" />
        <StatCard value="0" label="Cookies" accent="orange" />
        <StatCard value="∞" label="Possibilidades" accent="green" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          icon="🎹"
          title="Multitimbral"
          description="Engine que suporta múltiplos canais MIDI com samples reais de pianos, baixos, guitarras e baterias."
          accent="orange"
        />
        <InfoCard
          icon="🎨"
          title="Skeuomorfismo"
          description="Interface desenhada para simular a profundidade e resposta tátil de hardware profissional."
          accent="green"
        />
        <InfoCard
          icon="🔒"
          title="Privacidade"
          description="Tudo roda no seu navegador. Nenhum dado é enviado para servidores externos."
          accent="orange"
        />
      </div>

      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="p-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#202020] mb-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff44] shadow-[0_0_6px_#00ff44]"></div>
            Tecnologias
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React 19', 'TypeScript', 'Vite', 'Tone.js', 'Tailwind CSS', 'Vitest', 'Playwright', 'Biome'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-[#202020] text-[#00ff44] rounded font-mono text-[0.75rem] font-bold uppercase tracking-wider shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="p-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#202020] mb-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_6px_#ff6600]"></div>
            Contato
          </h2>
          <p className="text-[0.9rem] text-[#505050] leading-relaxed mb-4">
            Quer saber mais, contribuir ou apenas trocar uma ideia sobre música e tecnologia?
            Entre em contato pelo GitHub:
          </p>
          <a
            href="https://github.com/brennoclins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase text-[0.85rem] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] bg-gradient-to-br from-[#ff7733] to-[#ff5500] text-white hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 no-underline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.956-1.129 2.538 1.004 5.258.386 7.812-.972.822-.937 1.778-1.305 2.742-1.335.089-.022.18-.034.27-.034.09 0 .181.012.271.034 2.554 1.386 4.264 3.796 5.086 6.588.651 1.652.26 2.872.127 3.176.76.84 1.233 1.91 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.37.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase text-[0.85rem] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] bg-gradient-to-br from-[#ff7733] to-[#ff5500] text-white hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 no-underline"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        Voltar ao início
      </Link>
    </div>
  );
}
