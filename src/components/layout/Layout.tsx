import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="p-6 w-full max-w-[1200px] mx-auto flex justify-between items-center z-50">
      <Link
        to="/"
        className="text-[1.8rem] font-bold tracking-tighter text-[var(--color-text-dark)] no-underline"
      >
        BCL-4RMVN<span className="text-[var(--color-hw-orange)]">.</span>
      </Link>
      <ul className="flex gap-8 uppercase font-bold text-[0.85rem] text-[var(--color-text-mid)]">
        <li><Link to="/#features" className="hover:text-[var(--color-hw-orange)] transition-colors no-underline">Features</Link></li>
        <li><Link to="/midi-player" className="hover:text-[var(--color-hw-orange)] transition-colors no-underline">MIDI Player</Link></li>
        <li><Link to="/audio-player" className="hover:text-[var(--color-hw-orange)] transition-colors no-underline">Audio Player</Link></li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--color-text-dark)] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              BCL-4RMVN<span className="text-[var(--color-hw-orange)]">.</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Professional audio gear para músicos modernos. Performance sem latência com samples reais.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase text-[0.75rem] mb-4 text-[var(--color-hw-orange)]">
              Produtos
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/midi-player" className="hover:text-white transition-colors">KEYFORGE MIDI</Link></li>
              <li><Link to="/audio-player" className="hover:text-white transition-colors">501BCLST</Link></li>
              <li><span className="text-gray-600">VST Plugins (Em breve)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-[0.75rem] mb-4 text-[var(--color-hw-orange)]">
              Empresa
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-[0.75rem] mb-4 text-[var(--color-hw-orange)]">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-hw-orange)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.023 1.977 6.312-.673-.018-1.314-.206-1.87-.517-.027 1.357.965 2.589 2.095 3.026-.79.018-1.54.241-2.194.49v.041c0 3.042 2.153 5.584 5.018 6.161-.519.14-1.071.217-1.632.217-.4 0-.788-.039-1.166-.115.789 2.461 3.078 4.254 5.798 4.303-2.123 1.66-4.796 2.647-7.7 2.647-.502 0-1-.03-1.49-.089 2.762 1.863 6.032 2.95 9.54 2.95 11.456 0 17.714-9.493 17.714-17.715 0-.269-.005-.535-.015-.799 1.217-.88 2.276-1.97 3.114-3.22z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-hw-orange)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.792-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.208-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-hw-orange)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-hw-orange)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-1.52-.11-3.03-.4-4.42-1.09l-.91-.92c-.83-1.2-1.7-2.34-2.59-3.42-.41-.5-.83-.98-1.25-1.46.4-.14.8-.27 1.21-.41 1.61-.55 3.18-.73 4.9-.73.03.02.06.02.09.02-.02-.17-.03-.33-.03-.5 0-4.28 3.48-7.75 7.76-7.75 3.76 0 6.89 2.54 7.51 5.92.06.37.1.75.1 1.14 0 1.62-.52 3.14-1.47 4.37 1.12.29 2.27.51 3.47.67.26.03.51.05.76.05 4.28 0 7.76-3.47 7.76-7.76 0-2.74-1.43-5.28-3.64-6.64-2.22-1.38-5.03-2.06-7.93-2.06z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/brennoclins"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              BCL-4RMVN<span className="text-[var(--color-hw-orange)]">.</span>
            </a>
            Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link to="/terms-of-use" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}