interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: 'Multitimbral',
    description: 'Suporte total a múltiplos canais MIDI com samples reais de pianos, baixos e guitarras.',
  },
  {
    title: 'Skeuomorfismo',
    description: 'Interface desenhada para simular a profundidade e a resposta tátil de controladores físicos.',
  },
  {
    title: '10 Drum Kits',
    description: 'De baterias acústicas a clássicos como TR-808 e LinnDrum com controle de pads realistas.',
  },
];

export function Features({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 py-16 px-8 max-w-[1200px] mx-auto"
    >
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl border border-white/50">
      <h3 className="font-bold uppercase mb-2 text-lg">{title}</h3>
      <p className="text-[var(--color-text-mid)] text-[0.85rem] leading-relaxed">
        {description}
      </p>
    </div>
  );
}