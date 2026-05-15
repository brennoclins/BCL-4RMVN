import { Link } from 'react-router-dom';

export function TermsOfUsePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tighter mb-8">
        Termos de Uso<span className="text-[var(--color-hw-orange)]">.</span>
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        Última atualização: {new Date().toLocaleDateString('pt-BR')}
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">1. Aceitação dos Termos</h2>
        <p className="text-gray-300 leading-relaxed">
          Ao acessar e utilizar o Keyforce, você concorda com estes Termos de Uso.
          Se não concordar com qualquer parte destes termos, não utilize a aplicação.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">2. Descrição do Serviço</h2>
        <p className="text-gray-300 leading-relaxed">
          O Keyforce é um reprodutor de áudio e MIDI baseado em navegador, construído
          com React e Tone.js. A aplicação permite carregar e reproduzir arquivos de
          áudio e MIDI diretamente no navegador, sem necessidade de servidor.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">3. Uso Permitido</h2>
        <p className="text-gray-300 leading-relaxed">
          Você pode utilizar o Keyforce para uso pessoal e não comercial. É permitido:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
          <li>Carregar e reproduzir arquivos de áudio e MIDI de sua propriedade</li>
          <li>Utilizar a aplicação para fins educacionais e de aprendizado</li>
          <li>Contribuir com o código-fonte através do repositório público</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">4. Restrições</h2>
        <p className="text-gray-300 leading-relaxed">
          É proibido utilizar a aplicação para:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
          <li>Reproduzir conteúdo protegido por direitos autorais sem autorização</li>
          <li>Distribuir a aplicação como se fosse um produto próprio</li>
          <li>Utilizar a aplicação para fins ilegais ou não autorizados</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">5. Propriedade Intelectual</h2>
        <p className="text-gray-300 leading-relaxed">
          O código-fonte do Keyforce é de autoria de Brenno. Os samples de áudio
          utilizados são provenientes do projeto Tone.js e estão sujeitos às suas
          respectivas licenças.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">6. Limitação de Responsabilidade</h2>
        <p className="text-gray-300 leading-relaxed">
          A aplicação é fornecida "como está", sem garantias de qualquer tipo.
          Não nos responsabilizamos por quaisquer danos resultantes do uso da aplicação.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">7. Alterações</h2>
        <p className="text-gray-300 leading-relaxed">
          Estes termos podem ser alterados a qualquer momento. As alterações entram
          em vigor imediatamente após a publicação.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-hw-orange)]">8. Contato</h2>
        <p className="text-gray-300 leading-relaxed">
          Para dúvidas sobre estes termos, entre em contato através do{' '}
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
