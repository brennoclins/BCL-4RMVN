import { Hero, Features } from '../components/layout';
import { SectionLink } from '../components/layout';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features id="features" />

      {/* <div className="py-12 px-8 max-w-[1200px] mx-auto">
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
      </div> */}

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-12 px-4">

        <a href="/midi-player" className="group relative w-full max-w-[320px] aspect-square flex flex-col items-center justify-center p-8 bg-hw-base rounded-[2.5rem] shadow-lg transition-all duration-500 hover:shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-hw-orange/0 via-hw-orange/0 to-hw-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative mb-6 p-6 rounded-full bg-hw-light shadow-[4px_4px_10px_#bebebe,-4px_-4px_10px_#ffffff] group-hover:scale-110 transition-transform duration-500">
            <span className="text-5xl filter drop-shadow-md">🎹</span>
            <div className="absolute top-2 right-2 w-3 h-3 bg-hw-dark rounded-full border-2 border-hw-base group-hover:bg-hw-orange group-hover:shadow-[0_0_10px_#ff6600] transition-all duration-300"></div>
          </div>

          <h2 className="relative text-2xl font-black uppercase tracking-tighter text-hw-dark group-hover:text-hw-orange transition-colors">
            MIDI <span className="block text-sm font-light tracking-[0.3em] -mt-1 text-hw-mid">Player Pro</span>
          </h2>

          <p className="mt-4 text-center text-xs font-bold uppercase leading-tight text-hw-mid opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            Samples Reais <br /> & Baixa Latência
          </p>

          <div className="absolute bottom-4 flex gap-1">
            <div className="w-8 h-1 bg-hw-dark/10 rounded-full"></div>
            <div className="w-2 h-1 bg-hw-orange opacity-40 rounded-full"></div>
          </div>
        </a>

        <a href="/audio-player" className="group relative w-full max-w-[320px] aspect-square flex flex-col items-center justify-center p-8 bg-hw-base rounded-[2.5rem] shadow-lg transition-all duration-500 hover:shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-hw-screen/0 via-hw-screen/0 to-hw-screen/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative mb-6 p-6 rounded-full bg-hw-light shadow-[4px_4px_10px_#bebebe,-4px_-4px_10px_#ffffff] group-hover:scale-110 transition-transform duration-500">
            <span className="text-5xl filter drop-shadow-md">🎵</span>
            <div className="absolute top-2 right-2 w-3 h-3 bg-hw-dark rounded-full border-2 border-hw-base group-hover:bg-hw-screen group-hover:shadow-[0_0_10px_#00ff44] transition-all duration-300"></div>
          </div>

          <h2 className="relative text-2xl font-black uppercase tracking-tighter text-hw-dark group-hover:text-hw-screen transition-colors">
            Audio <span className="block text-sm font-light tracking-[0.3em] -mt-1 text-hw-mid">Engine</span>
          </h2>

          <p className="mt-4 text-center text-xs font-bold uppercase leading-tight text-hw-mid opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            MP3, WAV, OGG <br /> High Fidelity
          </p>

          <div className="absolute bottom-4 flex gap-1">
            <div className="w-2 h-1 bg-hw-screen opacity-40 rounded-full"></div>
            <div className="w-8 h-1 bg-hw-dark/10 rounded-full"></div>
          </div>
        </a>

      </div>
    </>
  );
}