import { Link } from 'react-router-dom';

interface SectionLinkProps {
  to: string;
  title: string;
  description: string;
  emoji: string;
}

export function SectionLink({ to, title, description, emoji }: SectionLinkProps) {
  return (
    <Link
      to={to}
      className="block text-center py-8 px-8 no-underline transition-colors"
      style={{ color: 'var(--color-text-dark)' }}
    >
      <h2 className="mb-2" style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>
        {emoji} {title}
      </h2>
      <p className="text-sm" style={{ color: 'var(--color-text-mid)' }}>
        {description}
      </p>
    </Link>
  );
}
