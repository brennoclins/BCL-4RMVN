import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tighter mb-8">
        Política de Privacidade<span className="text-[var(--color-hw-orange)]">.</span>
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        Última atualização: {new Date().toLocaleDateString('pt-BR')}
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">1. Coleta de Dados</h2>
        <p className="text-gray-300 leading-relaxed">
          O Keyforce é uma aplicação web que opera inteiramente no navegador do usuário.
          Não coletamos, armazenamos ou transmitimos dados pessoais para servidores externos.
          Todos os arquivos de áudio e MIDI são processados localmente no seu dispositivo.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">2. Arquivos Locais</h2>
        <p className="text-gray-300 leading-relaxed">
          Os arquivos de áudio e MIDI que você carrega são processados exclusivamente no
          seu navegador. Nenhum arquivo é enviado para servidores de terceiros. Após o
          carregamento, os arquivos são mantidos em memória apenas durante a sessão ativa.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">3. Serviços de Terceiros</h2>
        <p className="text-gray-300 leading-relaxed">
          A aplicação utiliza samples de áudio hospedados em servidores públicos do projeto
          Tone.js (tonejs.github.io). O acesso a esses recursos é feito diretamente pelo
          navegador para carregamento de instrumentos virtuais.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">4. Cookies</h2>
        <p className="text-gray-300 leading-relaxed">
          Esta aplicação não utiliza cookies de rastreamento ou analytics. Para informações
          sobre o uso de tecnologias de armazenamento local, consulte nossa{' '}
          <Link to="/cookies" className="text-[var(--color-hw-orange)] hover:underline">
            Política de Cookies
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">5. Seus Direitos</h2>
        <p className="text-gray-300 leading-relaxed">
          Como não coletamos dados pessoais, não há necessidade de mecanismos de exclusão
          ou acesso a dados. Você tem controle total sobre os arquivos que carrega na aplicação.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">6. Contato</h2>
        <p className="text-gray-300 leading-relaxed">
          Para dúvidas sobre esta política de privacidade, entre em contato através do{' '}
          <a
            href="https://github.com/brennoclins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-hw-orange)] hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </section>

      <Link to="/" className="text-[var(--color-hw-orange)] hover:underline">
        ← Voltar ao início
      </Link>
    </div>
  );
}
