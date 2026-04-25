interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: 'Multitimbral',
    description:
      'Suporte total a múltiplos canais MIDI com samples reais de pianos, baixos e guitarras.',
  },
  {
    title: 'Skeuomorfismo',
    description:
      'Interface desenhada para simular a profundidade e a resposta tátil de controladores físicos.',
  },
  {
    title: '10 Drum Kits',
    description:
      'De baterias acústicas a clássicos como TR-808 e LinnDrum com controle de pads realistas.',
  },
];

interface FeaturesProps {
  id?: string;
}

export function Features({ id }: FeaturesProps = {}) {
  return (
    <section id={id} className="px-8 py-16 max-w-[1200px] mx-auto grid grid-cols-3 gap-6">
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
    <div className="bg-white/40 backdrop-blur p-6 rounded-lg border border-white/50">
      <h3 className="mb-2 text-sm uppercase">{title}</h3>
      <p className="text-sm text-[--color-text-mid] leading-relaxed">{description}</p>
    </div>
  );
}
