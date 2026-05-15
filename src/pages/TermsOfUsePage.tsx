import { Link } from 'react-router-dom';

interface SectionCardProps {
  number: string;
  title: string;
  children: React.ReactNode;
  accent?: 'orange' | 'green';
}

function SectionCard({ number, title, children, accent = 'orange' }: SectionCardProps) {
  const accentColor = accent === 'orange' ? '#ff6600' : '#00ff44';

  return (
    <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
        </div>
        <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
          SECTION {number}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full shadow-[0_0_6px_currentColor]" style={{ backgroundColor: accentColor, color: accentColor }}></div>
          <h2 className="text-lg font-black uppercase tracking-tighter text-[#202020] m-0">
            {title}
          </h2>
        </div>
        <div className="text-[0.9rem] text-[#505050] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function TermsOfUsePage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-12">
      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          </div>
          <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
            SYSTEM UNIT: 4RMVN-TERMS-02
          </span>
        </div>

        <div className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0">
            <span className="text-3xl filter grayscale-0">📋</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-[#202020] m-0 leading-none">
              Termos de Uso
            </h1>
            <div className="h-1 w-12 my-3 mx-auto md:mx-0 rounded-full bg-[#ff6600]"></div>
            <p className="text-[0.85rem] text-[#505050] font-medium uppercase leading-tight">
              Regras claras para uso responsável
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded border border-black/5">
              <div className="w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_8px_#ff6600]"></div>
              <span className="text-[10px] font-mono font-bold text-[#202020]">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] font-mono text-black/30 tracking-wider mb-8 text-center">
        ÚLTIMA ATUALIZAÇÃO: {new Date().toLocaleDateString('pt-BR').toUpperCase()}
      </p>

      <div className="flex flex-col gap-6 mb-8">
        <SectionCard number="01" title="Aceitação dos Termos">
          Ao acessar e utilizar o BCL-4RMVN, você concorda com estes Termos de Uso. Se não concordar com qualquer parte, não utilize a aplicação.
        </SectionCard>

        <SectionCard number="02" title="Descrição do Serviço">
          O BCL-4RMVN é um reprodutor de áudio e MIDI baseado em navegador, construído com React e Tone.js. Permite carregar e reproduzir arquivos diretamente no navegador, sem servidor.
        </SectionCard>

        <SectionCard number="03" title="Uso Permitido">
          <p className="mb-2">Você pode utilizar o BCL-4RMVN para uso pessoal e não comercial:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Carregar e reproduzir arquivos de áudio e MIDI de sua propriedade</li>
            <li>Utilizar para fins educacionais e de aprendizado</li>
            <li>Contribuir com o código-fonte através do repositório público</li>
          </ul>
        </SectionCard>

        <SectionCard number="04" title="Restrições" accent="green">
          <p className="mb-2">É proibido utilizar a aplicação para:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Reproduzir conteúdo protegido por direitos autorais sem autorização</li>
            <li>Distribuir a aplicação como se fosse um produto próprio</li>
            <li>Utilizar para fins ilegais ou não autorizados</li>
          </ul>
        </SectionCard>

        <SectionCard number="05" title="Propriedade Intelectual">
          O código-fonte é de autoria de Brenno. Os samples de áudio são provenientes do projeto Tone.js e estão sujeitos às suas respectivas licenças.
        </SectionCard>

        <SectionCard number="06" title="Limitação de Responsabilidade">
          A aplicação é fornecida <strong className="text-[#202020]">"como está"</strong>, sem garantias de qualquer tipo. Não nos responsabilizamos por quaisquer danos resultantes do uso.
        </SectionCard>

        <SectionCard number="07" title="Alterações">
          Estes termos podem ser alterados a qualquer momento. As alterações entram em vigor imediatamente após a publicação.
        </SectionCard>

        <SectionCard number="08" title="Contato" accent="green">
          Para dúvidas, entre em contato através do{' '}
          <a
            href="https://github.com/brennoclins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff6600] font-bold hover:underline"
          >
            GitHub
          </a>
          .
        </SectionCard>
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
