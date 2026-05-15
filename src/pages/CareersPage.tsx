import { Link } from 'react-router-dom';

interface JobCardProps {
  title: string;
  type: string;
  level: string;
  description: string;
  tags: string[];
  accent?: 'orange' | 'green';
  open?: boolean;
}

function JobCard({ title, type, level, description, tags, accent = 'orange', open = true }: JobCardProps) {
  const accentColor = accent === 'orange' ? '#ff6600' : '#00aa33';

  return (
    <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${open ? 'bg-[#00aa33] shadow-[0_0_8px_#00aa33]' : 'bg-gray-400'}`}></div>
          <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
            {open ? 'HIRING' : 'CLOSED'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tighter text-[#202020] m-0">
              {title}
            </h3>
            <div className="h-0.5 w-8 my-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
          </div>

          <div className="flex gap-2 shrink-0">
            <span className="px-2 py-1 bg-[#202020] text-[#00aa33] rounded font-mono text-[0.65rem] font-bold uppercase">
              {type}
            </span>
            <span className="px-2 py-1 bg-[#202020] text-[#ff6600] rounded font-mono text-[0.65rem] font-bold uppercase">
              {level}
            </span>
          </div>
        </div>

        <p className="text-[0.85rem] text-[#505050] leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/50 rounded text-[0.7rem] font-bold uppercase text-[#505050] border border-black/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] mb-3">
          <span className="text-xl filter grayscale-0">{icon}</span>
        </div>
        <h4 className="text-sm font-black uppercase tracking-tighter text-[#202020] mb-2">
          {title}
        </h4>
        <p className="text-[0.8rem] text-[#505050] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function CareersPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12">
      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          </div>
          <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
            SYSTEM UNIT: 4RMVN-CAREERS-06
          </span>
        </div>

        <div className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0">
            <span className="text-3xl filter grayscale-0">🚀</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-[#202020] m-0 leading-none">
              Carreiras
            </h1>
            <div className="h-1 w-12 my-3 mx-auto md:mx-0 rounded-full bg-[#ff6600]"></div>
            <p className="text-[0.85rem] text-[#505050] font-medium uppercase leading-tight">
              Construa o futuro do áudio web conosco
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded border border-black/5">
              <div className="w-2 h-2 rounded-full bg-[#00aa33] shadow-[0_0_8px_#00aa33] animate-pulse"></div>
              <span className="text-[10px] font-mono font-bold text-[#202020]">2 VAGAS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="p-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#202020] mb-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_6px_#ff6600]"></div>
            Por que trabalhar conosco?
          </h2>
          <p className="text-[0.9rem] text-[#505050] leading-relaxed">
            Somos um projeto pequeno mas ambicioso. Aqui você tem autonomia real,
            impacto direto no produto e a liberdade de experimentar com tecnologias
            de áudio e música. Trabalhamos de forma remota, assíncrona e com foco
            em qualidade — não em horas na cadeira.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <BenefitCard
          icon="🏠"
          title="100% Remoto"
          description="Trabalhe de qualquer lugar do mundo, no seu horário."
        />
        <BenefitCard
          icon="🎸"
          title="Projeto Musical"
          description="Trabalhe com áudio, MIDI e música todos os dias."
        />
        <BenefitCard
          icon="🔧"
          title="Stack Moderna"
          description="React 19, TypeScript, Vite, Tone.js e mais."
        />
        <BenefitCard
          icon="📈"
          title="Crescimento"
          description="Aprenda, contribua e cresça com o projeto."
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-black uppercase tracking-tighter text-[#202020] mb-6 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00aa33] shadow-[0_0_6px_#00aa33]"></div>
          Vagas Abertas
        </h2>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        <JobCard
          title="Desenvolvedor Front-end"
          type="Remoto"
          level="Pleno / Senior"
          description="Buscamos alguém apaixonado por interfaces e experiência do usuário para evoluir o player de áudio e MIDI. Experiência com React, TypeScript e Web Audio API é um diferencial."
          tags={['React', 'TypeScript', 'Web Audio', 'CSS/Tailwind', 'Testes']}
          accent="orange"
          open
        />

        <JobCard
          title="Designer de UI/UX"
          type="Remoto"
          level="Júnior / Pleno"
          description="Procuramos um designer com olhar apurado para interfaces skeuomórficas e experiência em hardware. Você será responsável por criar e refinar a identidade visual do produto."
          tags={['Figma', 'UI Design', 'Skeuomorphism', 'Design System', 'Prototipagem']}
          accent="green"
          open
        />

        <JobCard
          title="Engenheiro de Áudio"
          type="Remoto"
          level="Senior"
          description="Especialista em processamento de áudio digital para otimizar a engine de samples, reduzir latência e implementar novos sintetizadores. Conhecimento em DSP e Tone.js essencial."
          tags={['DSP', 'Tone.js', 'Web Audio API', 'MIDI', 'Samples']}
          accent="orange"
          open={false}
        />
      </div>

      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="p-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#202020] mb-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_6px_#ff6600]"></div>
            Como se Candidatar
          </h2>
          <p className="text-[0.9rem] text-[#505050] leading-relaxed mb-4">
            Envie seu portfólio, GitHub ou LinkedIn para nós através do formulário de contato.
            Não exigimos currículo formal — queremos ver o que você construiu e como pensa.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase text-[0.85rem] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] bg-gradient-to-br from-[#ff7733] to-[#ff5500] text-white hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 no-underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Entrar em Contato
          </Link>
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
