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
    <div className="flex items-center justify-center p-4 md:p-8">
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

          <div className="flex-1 flex flex-col gap-6">
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
  );
}
