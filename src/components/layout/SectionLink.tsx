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
      className="block text-center py-16 px-8 no-underline text-[--color-text-dark] hover:text-hw-orange transition-colors"
    >
      <h2 className="text-2xl uppercase mb-2">
        {emoji} {title}
      </h2>
      <p className="text-sm text-[--color-text-mid]">{description}</p>
    </Link>
  );
}
