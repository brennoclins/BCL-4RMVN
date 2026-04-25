import { Hero, Features } from '../components/layout';
import { SectionLink } from '../components/layout';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features id="features" />
      
      <div className="py-12 px-8 max-w-[1200px] mx-auto">
        <SectionLink
          to="/midi-player"
          title="MIDI Player Pro"
          description="Carregue seus arquivos MIDI e toque com samples reais"
          emoji="🎹"
        />
        <SectionLink
          to="/audio-player"
          title="Audio Player"
          description="Reproduza MP3, WAV, OGG e outros formatos de áudio"
          emoji="🎵"
        />
      </div>
    </>
  );
}