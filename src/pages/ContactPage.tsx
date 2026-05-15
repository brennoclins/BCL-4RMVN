import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface ContactMethodProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  label: string;
  accent?: 'orange' | 'green';
}

function ContactMethod({ icon, title, description, href, label, accent = 'orange' }: ContactMethodProps) {
  const accentColor = accent === 'orange' ? '#ff6600' : '#00ff44';

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="block bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:translate-x-1 hover:shadow-[6px_6px_15px_rgba(0,0,0,0.15)] no-underline group"
    >
      <div className="p-6 flex items-start gap-4">
        <div
          className="w-12 h-12 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,102,0,0.3)]"
          style={{ color: accentColor }}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-black uppercase tracking-tighter text-[#202020] m-0">
            {title}
          </h3>
          <div className="h-0.5 w-8 my-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
          <p className="text-[0.85rem] text-[#505050] leading-relaxed mb-1">
            {description}
          </p>
          <span className="text-[0.75rem] font-bold uppercase tracking-wider" style={{ color: accentColor }}>
            {label} →
          </span>
        </div>
      </div>
    </a>
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

function FormField({ label, id, type = 'text', placeholder, required, value, onChange, multiline }: FormFieldProps) {
  const baseClasses = "w-full bg-[#d0d0d0] border border-black/10 rounded-lg px-4 py-3 text-[#202020] placeholder:text-[#808080] focus:outline-none focus:border-[#ff6600] focus:shadow-[0_0_0_2px_rgba(255,102,0,0.2)] transition-all text-[0.9rem]";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.75rem] font-bold uppercase tracking-wider text-[#505050]">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          className={`${baseClasses} resize-none`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={baseClasses}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12">
      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          </div>
          <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
            SYSTEM UNIT: 4RMVN-CONTACT-05
          </span>
        </div>

        <div className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0">
            <span className="text-3xl filter grayscale-0">📬</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-[#202020] m-0 leading-none">
              Contato
            </h1>
            <div className="h-1 w-12 my-3 mx-auto md:mx-0 rounded-full bg-[#ff6600]"></div>
            <p className="text-[0.85rem] text-[#505050] font-medium uppercase leading-tight">
              Entre em contato — respondemos sempre
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded border border-black/5">
              <div className="w-2 h-2 rounded-full bg-[#00ff44] shadow-[0_0_8px_#00ff44] animate-pulse"></div>
              <span className="text-[10px] font-mono font-bold text-[#202020]">AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ContactMethod
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.956-1.129 2.538 1.004 5.258.386 7.812-.972.822-.937 1.778-1.305 2.742-1.335.089-.022.18-.034.27-.034.09 0 .181.012.271.034 2.554 1.386 4.264 3.796 5.086 6.588.651 1.652.26 2.872.127 3.176.76.84 1.233 1.91 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.37.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          }
          title="GitHub"
          description="Contribua com código, reporte issues ou explore o repositório."
          href="https://github.com/brennoclins"
          label="Visitar perfil"
          accent="orange"
        />

        <ContactMethod
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          title="E-mail"
          description="Envie uma mensagem direta para dúvidas, sugestões ou parcerias."
          href="mailto:contato@bcl-st.com.br"
          label="Enviar e-mail"
          accent="green"
        />
      </div>

      <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
        <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          </div>
          <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
            TRANSMIT MESSAGE
          </span>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#202020] mb-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff6600] shadow-[0_0_6px_#ff6600]"></div>
            Envie uma Mensagem
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-[#202020] text-[#00ff44] rounded-lg font-mono text-[0.85rem] flex items-center gap-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              <div className="w-2 h-2 rounded-full bg-[#00ff44] shadow-[0_0_8px_#00ff44] animate-pulse"></div>
              Mensagem enviada com sucesso! Responderemos em breve.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Nome"
                id="name"
                placeholder="Seu nome completo"
                required
                value={name}
                onChange={setName}
              />
              <FormField
                label="E-mail"
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={setEmail}
              />
            </div>

            <FormField
              label="Assunto"
              id="subject"
              placeholder="Sobre o que deseja falar?"
              required
              value={subject}
              onChange={setSubject}
            />

            <FormField
              label="Mensagem"
              id="message"
              placeholder="Escreva sua mensagem aqui..."
              required
              value={message}
              onChange={setMessage}
              multiline
            />

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3 rounded-md font-bold uppercase text-[0.85rem] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] bg-gradient-to-br from-[#ff7733] to-[#ff5500] text-white hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
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
