import { useState, useEffect } from 'react';
import { useMidiPlayer } from '../hooks/useMidiPlayer';
import {
  PlayerContainer,
  HWLogoSection,
  HWScreen,
  HWControls,
  HWPads,
  HWKeysButtons,
  HWTransport,
  HWVolumeSection,
} from '../components/midi-player';
import type { DrumKitType, MainInstrumentType, BassType, GuitarType, BrassType } from '../types';

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
        </div>
        <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
          FEATURE
        </span>
      </div>

      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] mb-4">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-black uppercase tracking-tighter text-[#202020] mb-2">
          {title}
        </h3>
        <p className="text-[0.8rem] text-[#505050] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function MobileCard({ scenario, description, screenContent }: { scenario: string; description: string; screenContent: React.ReactNode }) {
  return (
    <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
        </div>
        <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
          MOBILE
        </span>
      </div>

      <div className="p-6 flex flex-col items-center">
        {/* Phone Mockup */}
        <div className="relative w-[120px] h-[200px] mb-6">
          {/* Phone body */}
          <div className="absolute inset-0 bg-[#202020] rounded-[20px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),4px_4px_12px_rgba(0,0,0,0.2)] border border-[#303030]" />
          {/* Phone screen */}
          <div className="absolute inset-[6px] top-[16px] bottom-[16px] bg-[#1a1a1a] rounded-[14px] overflow-hidden">
            {/* Status bar */}
            <div className="flex justify-between items-center px-2 py-0.5 bg-[#101010]">
              <div className="w-1 h-1 rounded-full bg-[#00aa33]" />
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1 rounded-sm bg-gray-600" />
                <div className="w-1.5 h-1 rounded-sm bg-gray-600" />
              </div>
            </div>
            {/* Screen content */}
            <div className="h-[calc(100%-12px)]">
              {screenContent}
            </div>
          </div>
          {/* Notch */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[30px] h-[4px] bg-[#101010] rounded-full" />
          {/* Home indicator */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[20px] h-[3px] bg-gray-600 rounded-full" />
        </div>

        <h3 className="text-lg font-black uppercase tracking-tighter text-[#202020] mb-2 text-center">
          {scenario}
        </h3>
        <p className="text-[0.8rem] text-[#505050] leading-relaxed text-center">
          {description}
        </p>
      </div>
    </div>
  );
}

export function MidiPlayerPage() {
  const {
    status,
    fileName,
    isPlaying,
    progress,
    formattedTime,
    formattedDuration,
    detectedInstruments,
    loadFile,
    play,
    pause,
    stop,
  } = useMidiPlayer();

  const [soundMode, setSoundMode] = useState<'samples' | 'digital'>('samples');
  const [drumKit, setDrumKit] = useState<DrumKitType>('acoustic');
  const [mainInstrument, setMainInstrument] = useState<MainInstrumentType>('casio');
  const [bass, setBass] = useState<BassType>('finger');
  const [guitar, setGuitar] = useState<GuitarType>('nylon');
  const [brass, setBrass] = useState<BrassType>('trumpet');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (isPlaying) {
          pause();
        } else {
          play();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stop();
    };
  }, [isPlaying, play, pause, stop]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const instruments = Array.from(detectedInstruments.instruments);

  const getStatusText = () => {
    switch (status) {
      case 'idle':
        return 'Select Midi File';
      case 'loading':
        return 'Loading...';
      case 'ready':
        return fileName || 'Ready';
      case 'playing':
        return 'Playing...';
      case 'paused':
        return 'Paused';
      case 'error':
        return 'Error loading file';
      default:
        return 'Select Midi File';
    }
  };

  const getStatusVariant = () => {
    if (status === 'error') return 'error';
    if (status === 'ready' || status === 'playing' || status === 'paused') return 'ready';
    return 'default';
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <div className="flex items-center justify-center w-full max-w-[1200px]">
        <PlayerContainer>
          <div className="col-start-1 row-start-1">
            <HWLogoSection />
          </div>

          <div className="col-start-2 row-start-1 col-span-2">
            <HWScreen
              modeValue={soundMode === 'samples' ? 'SAMPLES' : 'DIGITAL'}
              status={getStatusText()}
              statusVariant={getStatusVariant()}
              duration={formattedDuration}
            />
          </div>

          <div className="col-start-4 row-start-1 row-span-2">
            <HWControls
              soundMode={soundMode}
              onSoundModeChange={setSoundMode}
              drumKit={drumKit}
              onDrumKitChange={setDrumKit}
              mainInstrument={mainInstrument}
              onMainInstrumentChange={setMainInstrument}
              bass={bass}
              onBassChange={setBass}
              guitar={guitar}
              onGuitarChange={setGuitar}
              brass={brass}
              onBrassChange={setBrass}
              showBass={detectedInstruments.channels.bass}
              showGuitar={detectedInstruments.channels.guitar}
              showBrass={detectedInstruments.channels.brass}
            />
          </div>

          <div className="col-start-1 row-start-2 row-span-2">
            <HWPads instruments={instruments} onFileSelect={loadFile} />
          </div>

          <div className="col-start-4 row-start-3">
            <HWKeysButtons />
          </div>

          <div className="col-start-2 col-span-3 row-start-3">
            <HWTransport
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onStop={stop}
              disabled={status === 'idle' || status === 'loading'}
            />
          </div>

          <div className="col-span-3 row-start-4">
            <HWVolumeSection progress={progress} currentTime={formattedTime} />
          </div>
        </PlayerContainer>
      </div>

      {/* Marketing Section */}
      <div className="w-full max-w-[1200px] mt-12 md:mt-16 px-4 md:px-8">
        {/* Hero Banner */}
        <div className="bg-[#e0e0e0] rounded-xl border-t border-l border-white/60 border-b border-r border-black/20 overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.1)] mb-8">
          <div className="flex justify-between items-center px-4 py-2 bg-black/5 border-b border-black/10">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-black/15 shadow-inner"></div>
            </div>
            <span className="text-[9px] font-mono font-bold text-black/30 tracking-[0.2em]">
              PRODUCT INFO: 4RMVN-MIDI-01
            </span>
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0">
              <span className="text-4xl">🎹</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#202020] m-0 leading-none">
                Keyforce<span className="text-[#ff6600]">.</span>
              </h1>
              <div className="h-1 w-16 my-3 mx-auto md:mx-0 rounded-full bg-[#00aa33]"></div>
              <p className="text-[0.9rem] text-[#505050] font-medium uppercase leading-tight mb-2">
                MIDI Player com Engine Multitimbral Profissional
              </p>
              <p className="text-[0.85rem] text-[#606060] leading-relaxed">
                Reproduza arquivos MIDI com samples reais de instrumentos. Piano, baixo, bateria, guitarra,
                brass, strings e synth — tudo direto no navegador, sem plugins ou instalações.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded border border-black/5">
                <div className="w-2 h-2 rounded-full bg-[#00aa33] shadow-[0_0_8px_#00aa33]"></div>
                <span className="text-[10px] font-mono font-bold text-[#202020]">ONLINE</span>
              </div>
              <span className="text-[9px] font-mono text-black/30">v1.0.0</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon="🥁"
            title="10 Drum Kits"
            description="Acoustic, CR78, LinnDrum, R8, Techno, Stark, Kit3, Kit8, KPR77 e Bongos — samples reais do Tone.js CDN"
          />
          <FeatureCard
            icon="🎸"
            title="Engine Multitimbral"
            description="Detecção automática de instrumentos por canal e programa MIDI. Piano, baixo, guitarra, brass, strings e synth"
          />
          <FeatureCard
            icon="⚡"
            title="Zero Latência"
            description="Roda 100% no navegador. Sem servidor, sem downloads, sem plugins. Carregue e toque instantaneamente"
          />
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-br from-[#202020] to-[#303030] rounded-xl overflow-hidden shadow-[6px_6px_15px_rgba(0,0,0,0.2)] mb-8">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-[#ff6600] text-white text-[10px] font-bold uppercase tracking-wider rounded mb-4">
                Lançamento
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white m-0 leading-none mb-3">
                Experimente o Keyforce<span className="text-[#00aa33]">.</span>
              </h2>
              <p className="text-[0.85rem] text-gray-400 leading-relaxed mb-4">
                Player MIDI profissional gratuito, direto no seu navegador. Perfeito para músicos,
                produtores e entusiastas que querem ouvir seus arquivos MIDI com qualidade de verdade.
              </p>
              <div className="flex flex-wrap gap-4 text-[0.75rem] font-mono text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00aa33]"></span>
                  100% Gratuito
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00aa33]"></span>
                  Sem Cadastro
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00aa33]"></span>
                  Open Source
                </span>
              </div>
            </div>

            <div className="text-center shrink-0">
              <div className="text-5xl font-black text-white leading-none">
                FREE<span className="text-[#ff6600]">.</span>
              </div>
              <p className="text-[0.7rem] font-mono text-gray-500 mt-2 uppercase tracking-wider">
                Para sempre
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Usage Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#202020] text-center mb-2">
            Keyforce em Qualquer Lugar<span className="text-[#ff6600]">.</span>
          </h2>
          <p className="text-[0.8rem] text-[#505050] text-center mb-8">
            Leve seus arquivos MIDI para onde for. Funciona em qualquer dispositivo com navegador.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MobileCard
              scenario="Estúdio Móvel"
              description="Componha no tablet durante o deslocamento. Samples reais, latência zero."
              screenContent={
                <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                  <div className="text-[8px] font-mono text-[#00aa33]">KEYFORCE</div>
                  <div className="flex gap-0.5">
                    {[40, 65, 80, 55, 90, 45, 70, 60].map((h, i) => (
                      <div key={i} className="w-1 bg-[#00aa33] rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="text-[6px] text-gray-500">Playing...</div>
                </div>
              }
            />
            <MobileCard
              scenario="Ensaio ao Vivo"
              description="Carregue backing tracks MIDI direto no celular do palco. Sem apps extras."
              screenContent={
                <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                  <div className="text-[8px] font-mono text-[#ff6600]">READY</div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#202020] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#00aa33]" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#202020] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-sm bg-[#ff6600]" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#202020] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#202020]" />
                    </div>
                  </div>
                  <div className="text-[6px] text-gray-500">3 tracks loaded</div>
                </div>
              }
            />
            <MobileCard
              scenario="Estudo em Casa"
              description="Analise estruturas MIDI de músicas famosas. Visualize canais e instrumentos."
              screenContent={
                <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                  <div className="text-[8px] font-mono text-[#00aa33]">PAUSED</div>
                  <div className="w-full h-1 bg-[#202020] rounded overflow-hidden">
                    <div className="h-full bg-[#ff6600] w-[60%]" />
                  </div>
                  <div className="flex justify-between w-full text-[6px] text-gray-500">
                    <span>1:24</span>
                    <span>2:18</span>
                  </div>
                  <div className="text-[6px] text-gray-500">Ch: Piano, Bass, Drums</div>
                </div>
              }
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-8">
          <p className="text-[0.8rem] text-[#505050] font-mono uppercase tracking-wider mb-4">
            Curta o projeto e acompanhe as atualizações
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/brennoclins"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase text-[0.85rem] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] bg-gradient-to-br from-[#202020] to-[#303030] text-white hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 no-underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.655.984.774-.215 1.607-.322 2.441-.325.834.003 1.669.11 2.441.325 1.647-1.306 2.654-.984 2.654-.984.653 1.652.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase text-[0.85rem] shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] bg-gradient-to-br from-[#ff7733] to-[#ff5500] text-white hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 no-underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Voltar ao início
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}