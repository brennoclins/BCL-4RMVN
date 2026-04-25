import { useEffect, useState, useRef } from 'react';
import { Nav } from '../components/layout';
import {
  AudioPlayerContainer,
  HWHeader,
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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const currentTrack = currentIndex >= 0 ? tracks[currentIndex] : null;

  const formatTime = (seconds: number): string => {
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

    setTracks((prev) => [...prev, ...newTracks]);
    if (currentIndex === -1 && newTracks.length > 0) {
      selectTrack(tracks.length);
    }
  };

  const selectTrack = (index: number) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    setCurrentIndex(index);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');

    const track = tracks[index];
    if (track) {
      setArtistDisplay(track.ext + ' File');
      setTotalTime('0:00');

      if (track.isMidi) {
        setTotalTime('0:00');
      } else {
        if (audioRef.current) {
          audioRef.current.src = track.url;
          audioRef.current.load();
          audioRef.current.addEventListener(
            'loadedmetadata',
            () => {
              setTotalTime(formatTime(audioRef.current?.duration || 0));
            },
            { once: true }
          );
        }
      }
    }
  };

  const play = () => {
    if (currentIndex === -1 || !currentTrack) return;

    if (currentTrack.isMidi) {
      setIsPlaying(true);
      setArtistDisplay('MIDI Mode');
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.src = currentTrack.url;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setArtistDisplay(currentTrack.ext + ' Playing');
      });
    }
  };

  const pause = () => {
    if (currentTrack?.isMidi) {
      setIsPlaying(false);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    setArtistDisplay(currentTrack?.ext + ' File' || 'Standby Mode');
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const prevTrack = () => {
    if (tracks.length > 0 && currentIndex > 0) {
      selectTrack(currentIndex - 1);
      play();
    }
  };

  const nextTrack = () => {
    if (tracks.length > 0) {
      if (currentIndex < tracks.length - 1) {
        selectTrack(currentIndex + 1);
      } else {
        selectTrack(0);
      }
      play();
    }
  };

  const changeVolume = (delta: number) => {
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
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current && audioRef.current.duration) {
          const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(percent);
          setCurrentTime(formatTime(audioRef.current.currentTime));
        }
      });

      audioRef.current.addEventListener('ended', () => {
        nextTrack();
        play();
      });
    }
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
  }, [isPlaying, currentIndex, tracks]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav variant="player" />

      <main className="flex-1 flex items-center justify-center p-8 pb-[3rem]">
        <AudioPlayerContainer>
          <HWHeader title="501BCLST" model="Audio Player Module / FX-900" />

          <HWSidebar
            tracks={tracks}
            currentIndex={currentIndex}
            onSelectTrack={selectTrack}
            onFileUpload={handleFileUpload}
          />

          <AudioScreen
            trackName={currentTrack?.name || 'Ready to Load'}
            artistName={artistDisplay}
            isPlaying={isPlaying}
          />

          <AudioTransport
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            onPrev={prevTrack}
            onNext={nextTrack}
          />

          <AudioVolumeSection
            onVolumeChange={changeVolume}
            progress={progress}
            currentTime={currentTime}
            totalTime={totalTime}
          />
        </AudioPlayerContainer>
      </main>
    </div>
  );
}