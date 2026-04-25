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
      className="block text-center py-12 px-8 hover:text-[var(--color-hw-orange)] transition-colors no-underline group"
    >
      <h2 className="text-2xl font-bold uppercase mb-1 flex items-center justify-center gap-2 text-[var(--color-text-dark)] group-hover:text-[var(--color-hw-orange)]">
        <span>{emoji}</span> {title}
      </h2>
      <p className="text-[var(--color-text-mid)] text-[0.85rem]">
        {description}
      </p>
    </Link>
  );
}