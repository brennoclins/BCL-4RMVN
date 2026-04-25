import { Nav, Hero, Features, SectionLink } from '../components/layout';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav variant="home" />

      <main className="flex-1">
        <Hero />
        <Features id="features" />

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
      </main>
    </div>
  );
}
