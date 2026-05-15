import { useEffect, useState, useRef, useCallback } from 'react';
import {
  AudioPlayerContainer,
  HWSidebar,
  AudioScreen,
  AudioTransport,
  AudioVolumeSection,
} from '../components/audio-player';

export interface Track {
  name: string;
  url: string;
  file: File;
  isMidi: boolean;
  ext: string;
}

function AudioFeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
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
        <div className="relative w-[120px] h-[200px] mb-6">
          <div className="absolute inset-0 bg-[#202020] rounded-[20px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),4px_4px_12px_rgba(0,0,0,0.2)] border border-[#303030]" />
          <div className="absolute inset-[6px] top-[16px] bottom-[16px] bg-[#1a1a1a] rounded-[14px] overflow-hidden">
            <div className="flex justify-between items-center px-2 py-0.5 bg-[#101010]">
              <div className="w-1 h-1 rounded-full bg-[#00aa33]" />
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1 rounded-sm bg-gray-600" />
                <div className="w-1.5 h-1 rounded-sm bg-gray-600" />
              </div>
            </div>
            <div className="h-[calc(100%-12px)]">
              {screenContent}
            </div>
          </div>
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[30px] h-[4px] bg-[#101010] rounded-full" />
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

export function AudioPlayerPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalTime, setTotalTime] = useState('0:00');
  const [volume, setVolume] = useState(0);
  const [artistDisplay, setArtistDisplay] = useState('Standby Mode');
  const [isLooping, setIsLooping] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const objectUrlsRef = useRef<Set<string>>(new Set());
  const tracksRef = useRef<Track[]>([]);
  const currentIndexRef = useRef<number>(-1);

  tracksRef.current = tracks;
  currentIndexRef.current = currentIndex;

  const currentTrack = currentIndex >= 0 ? tracks[currentIndex] : null;

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFileUpload = (files: FileList) => {
    const validExtensions = ['.mp3', '.wav', '.ogg', '.mid', '.midi', '.m4a', '.flac', '.aac'];
    const newTracks: Track[] = [];

    Array.from(files).forEach((file) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (validExtensions.includes(ext)) {
        const url = URL.createObjectURL(file);
        objectUrlsRef.current.add(url);
        const isMidiFile = ext === '.mid' || ext === '.midi';
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        newTracks.push({
          name: baseName,
          url,
          file,
          isMidi: isMidiFile,
          ext: ext.replace('.', '').toUpperCase(),
        });
      }
    });

    const updatedTracks = [...tracks, ...newTracks];
    setTracks(updatedTracks);

    if (currentIndex === -1 && newTracks.length > 0) {
      selectTrack(0, updatedTracks);
    }
  };

  const selectTrack = useCallback((index: number, trackList?: Track[]) => {
    const list = trackList || tracksRef.current;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    currentIndexRef.current = index;
    setCurrentIndex(index);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');

    const track = list[index];
    if (track) {
      setArtistDisplay(track.ext + ' File');

      if (!track.isMidi) {
        if (audioRef.current) {
          audioRef.current.src = track.url;
          audioRef.current.load();
        }
      }
      setTotalTime('0:00');
    }
  }, []);

  const playAudio = useCallback(() => {
    const idx = currentIndexRef.current;
    const list = tracksRef.current;
    const track = idx >= 0 ? list[idx] : null;

    if (!audioRef.current || !track || track.isMidi) {
      if (track?.isMidi) {
        setIsPlaying(true);
        setArtistDisplay('MIDI Mode');
      }
      return;
    }

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setArtistDisplay(track.ext + ' Playing');
    }).catch(err => {
      console.error('Playback error:', err);
    });
  }, []);

  const play = useCallback(() => {
    const idx = currentIndexRef.current;
    const list = tracksRef.current;
    const track = idx >= 0 ? list[idx] : null;

    if (idx === -1 || !track) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = track.url;
    } else if (audioRef.current.src !== track.url) {
      audioRef.current.pause();
      audioRef.current.src = track.url;
    }

    playAudio();
  }, [playAudio]);

  const pause = useCallback(() => {
    const idx = currentIndexRef.current;
    const list = tracksRef.current;
    const track = idx >= 0 ? list[idx] : null;

    if (track?.isMidi) {
      setIsPlaying(false);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    setArtistDisplay(track?.ext + ' File' || 'Standby Mode');
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const prevTrack = useCallback(() => {
    const list = tracksRef.current;
    const idx = currentIndexRef.current;

    if (list.length > 0) {
      const newIndex = idx > 0 ? idx - 1 : list.length - 1;
      selectTrack(newIndex);
      play();
    }
  }, [selectTrack, play]);

  const nextTrack = useCallback(() => {
    const list = tracksRef.current;
    const idx = currentIndexRef.current;

    if (list.length > 0) {
      const nextIndex = idx + 1;

      if (nextIndex >= list.length) {
        if (isLooping) {
          selectTrack(0);
          play();
        } else {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime('0:00');
          return;
        }
      } else {
        selectTrack(nextIndex);
        play();
      }
    }
  }, [isLooping, selectTrack, play]);

  const changeVolume = useCallback((delta: number) => {
    const newVolume = Math.max(-60, Math.min(6, volume + delta));
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, (newVolume + 60) / 66);
    }

    const originalText = artistDisplay;
    setArtistDisplay(`VOLUME: ${newVolume === -60 ? 'MUTE' : newVolume + ' dB'}`);

    setTimeout(() => {
      setArtistDisplay(originalText);
    }, 1200);
  }, [volume, artistDisplay]);

  const handleProgressClick = useCallback((percent: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
    }
  }, []);

  const nextTrackRef = useRef(nextTrack);
  nextTrackRef.current = nextTrack;

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    const urlsToRevoke = objectUrlsRef.current;

    const handleMetadata = () => {
      setTotalTime(formatTime(audio.duration));
    };

    const handleTimeUpdate = () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const handleEnded = () => {
      nextTrackRef.current();
    };

    audio.addEventListener('loadedmetadata', handleMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', handleMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
      urlsToRevoke.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === 'ArrowRight' && e.target === document.body) {
        nextTrack();
      }
      if (e.code === 'ArrowLeft' && e.target === document.body) {
        prevTrack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextTrack, prevTrack]);

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-[1200px]">
        <AudioPlayerContainer>
          <header className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-black/10 pb-6">
            <div>
              <h2 className="text-[2.4rem] font-bold tracking-tighter leading-none uppercase">
                501BCLST<span className="text-[var(--color-hw-orange)]">.</span>
              </h2>
              <p className="text-[0.7rem] text-[var(--color-text-mid)] uppercase tracking-[2px] mt-1">
                Audio Player Module / FX-900
              </p>
            </div>
            <div className="w-[10px] h-[10px] bg-[var(--color-accent-screen)] rounded-full shadow-[0_0_8px_#00aa33] mt-2" />
          </header>

          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <HWSidebar
              tracks={tracks}
              currentIndex={currentIndex}
              onSelectTrack={(idx) => {
                selectTrack(idx);
                play();
              }}
              onFileUpload={handleFileUpload}
            />

            <div className="flex-1 min-w-0 flex flex-col gap-6">
              <AudioScreen
                trackName={currentTrack?.name || 'Ready to Load'}
                artistName={artistDisplay}
                isPlaying={isPlaying}
              />

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <AudioTransport
                  isPlaying={isPlaying}
                  isLooping={isLooping}
                  onPlayPause={togglePlay}
                  onPrev={prevTrack}
                  onNext={nextTrack}
                  onToggleLoop={() => setIsLooping(!isLooping)}
                />

                <AudioVolumeSection
                  onVolumeChange={changeVolume}
                  progress={progress}
                  currentTime={currentTime}
                  totalTime={totalTime}
                  onProgressClick={handleProgressClick}
                />
              </div>
            </div>
          </div>
        </AudioPlayerContainer>
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
              PRODUCT INFO: 4RMVN-CORE-02
            </span>
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-[#202020] rounded-lg flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] shrink-0">
              <span className="text-4xl">🎵</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#202020] m-0 leading-none">
                501BCLST<span className="text-[#ff6600]">.</span>
              </h1>
              <div className="h-1 w-16 my-3 mx-auto md:mx-0 rounded-full bg-[#00aa33]"></div>
              <p className="text-[0.9rem] text-[#505050] font-medium uppercase leading-tight mb-2">
                Reprodutor de Áudio Master para Alta Fidelidade
              </p>
              <p className="text-[0.85rem] text-[#606060] leading-relaxed">
                Reproduza MP3, WAV, OGG, FLAC, AAC e M4A direto no navegador. Playlist, loop,
                controle de volume e navegação por teclado — tudo sem instalar nada.
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
          <AudioFeatureCard
            icon="🎧"
            title="Multi-Formato"
            description="MP3, WAV, OGG, FLAC, AAC, M4A e até MIDI — todos os formatos em um único player"
          />
          <AudioFeatureCard
            icon="📋"
            title="Playlist Integrada"
            description="Carregue múltiplos arquivos, navegue entre faixas com setas ou clique na sidebar"
          />
          <AudioFeatureCard
            icon="🔁"
            title="Loop & Controles"
            description="Repetição contínua, atalhos de teclado (Space, ←, →) e controle de volume preciso"
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
                Ouça Sem Limites<span className="text-[#00aa33]">.</span>
              </h2>
              <p className="text-[0.85rem] text-gray-400 leading-relaxed mb-4">
                Player de áudio profissional gratuito, direto no seu navegador. Perfeito para
                músicos, DJs, podcasters e qualquer pessoa que valorize qualidade de reprodução.
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
                  Processamento Local
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
            501BCLST em Qualquer Lugar<span className="text-[#ff6600]">.</span>
          </h2>
          <p className="text-[0.8rem] text-[#505050] text-center mb-8">
            Leve sua música para onde for. Funciona em qualquer dispositivo com navegador.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MobileCard
              scenario="DJ Set Móvel"
              description="Mixe playlists no celular entre sets. Suporte a FLAC e WAV para qualidade lossless."
              screenContent={
                <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                  <div className="text-[8px] font-mono text-[#00aa33]">PLAYING</div>
                  <div className="flex gap-0.5 items-end h-8">
                    {[30, 55, 80, 45, 90, 60, 70, 40, 85, 50].map((h, i) => (
                      <div key={i} className="w-1 bg-[#ff6600] rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="text-[6px] text-gray-500">track_01.flac</div>
                </div>
              }
            />
            <MobileCard
              scenario="Podcaster"
              description="Revise episódios em WAV ou AAC direto no navegador. Avance e retroceda com setas."
              screenContent={
                <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                  <div className="text-[8px] font-mono text-[#ff6600]">PAUSED</div>
                  <div className="w-full h-1 bg-[#202020] rounded overflow-hidden">
                    <div className="h-full bg-[#00aa33] w-[45%]" />
                  </div>
                  <div className="flex justify-between w-full text-[6px] text-gray-500">
                    <span>3:24</span>
                    <span>7:42</span>
                  </div>
                  <div className="text-[6px] text-gray-500">episode_12.wav</div>
                </div>
              }
            />
            <MobileCard
              scenario="Estúdio Caseiro"
              description="Compare mixes em diferentes formatos. Loop para analisar trechos específicos."
              screenContent={
                <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                  <div className="text-[8px] font-mono text-[#00aa33]">LOOP</div>
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
                  <div className="text-[6px] text-gray-500">3 tracks queued</div>
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
