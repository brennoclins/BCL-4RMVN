import { Nav } from '@/components/layout';

export function MidiPlayerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav variant="player" />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">MIDI Player</h1>
          <p className="text-[--color-text-mid]">Em construção...</p>
        </div>
      </main>
    </div>
  );
}
