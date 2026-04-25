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

export function Features({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="py-16 px-8"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
      }}
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
    <div
      className="p-6 rounded-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
      }}
    >
      <h3 className="mb-2 text-sm uppercase">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-mid)' }}>
        {description}
      </p>
    </div>
  );
}
