import { Hero, Features } from '../components/layout';
import { SectionLink } from '../components/layout';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features id="features" />

      <div className="py-12 px-8 max-w-[1200px] mx-auto flex flex-col items-center">
        <SectionLink
          to="/midi-player"
          title="KEYFORCE MIDI Player"
          description="Engine Multitimbral com samples reais de pianos e baixos"
          emoji="🎹"
          unitId="4RMVN-MIDI-01"
          accentColor="orange"
        />
        <SectionLink
          to="/audio-player"
          title="501BCLST Audio Player"
          description="Reprodutor master para formatos de alta fidelidade"
          emoji="🎵"
          unitId="4RMVN-CORE-02"
          accentColor="green"
        />
      </div>


    </>
  );
}