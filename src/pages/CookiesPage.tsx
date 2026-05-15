import { Link } from 'react-router-dom';

export function CookiesPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tighter mb-8">
        Política de Cookies<span className="text-[var(--color-hw-orange)]">.</span>
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        Última atualização: {new Date().toLocaleDateString('pt-BR')}
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">1. O que são cookies?</h2>
        <p className="text-gray-300 leading-relaxed">
          Cookies são pequenos arquivos de texto armazenados no seu navegador. Eles são
          utilizados para lembrar preferências e melhorar a experiência de navegação.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">2. Cookies utilizados</h2>
        <p className="text-gray-300 leading-relaxed">
          O Keyforce <strong>não utiliza cookies</strong> de rastreamento, analytics ou
          publicidade. A aplicação não armazena cookies no navegador do usuário.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">3. Armazenamento local</h2>
        <p className="text-gray-300 leading-relaxed">
          A aplicação pode utilizar o <code className="bg-gray-800 px-2 py-1 rounded text-sm">localStorage</code> do
          navegador para salvar preferências do usuário (como volume e configurações de
          instrumentos). Esses dados são armazenados exclusivamente no seu dispositivo
          e não são compartilhados com terceiros.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">4. Recursos externos</h2>
        <p className="text-gray-300 leading-relaxed">
          A aplicação carrega samples de áudio de servidores públicos do projeto Tone.js
          (tonejs.github.io). Esse acesso é feito diretamente pelo navegador e pode
          envolver cookies definidos por esses serviços de terceiros, sobre os quais
          não temos controle.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">5. Gerenciamento</h2>
        <p className="text-gray-300 leading-relaxed">
          Você pode gerenciar ou desativar cookies e armazenamento local nas configurações
          do seu navegador. Note que desativar o armazenamento local pode afetar a
          experiência de uso da aplicação.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">6. Contato</h2>
        <p className="text-gray-300 leading-relaxed">
          Para dúvidas sobre esta política de cookies, entre em contato através do{' '}
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
