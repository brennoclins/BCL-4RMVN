import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  to: string;
  label: string;
}

const homeLinks: NavLink[] = [
  { to: '#features', label: 'Features' },
  { to: '/midi-player', label: 'MIDI Player' },
  { to: '/audio-player', label: 'Audio Player' },
];

const playerLinks: NavLink[] = [
  { to: '/', label: 'Hardware' },
  { to: '#', label: 'Software' },
  { to: '/midi-player', label: 'MIDI Player' },
  { to: '/audio-player', label: 'Audio Player' },
];

interface NavProps {
  variant?: 'home' | 'player';
}

export function Nav({ variant = 'home' }: NavProps) {
  const location = useLocation();
  const links = variant === 'player' ? playerLinks : homeLinks;

  const isActiveLink = (link: NavLink) => {
    if (link.to === '/audio-player') {
      return location.pathname === '/audio-player';
    }
    return location.pathname === link.to;
  };

  return (
    <nav className="p-6 w-full max-w-[1200px] mx-auto flex justify-between items-center z-50">
      <Link
        to="/"
        className="text-[1.8rem] font-bold tracking-tighter text-[var(--color-text-dark)] no-underline"
      >
        BCL-4RMVN<span className="text-[var(--color-hw-orange)]">.</span>
      </Link>
      <ul className="flex gap-8 uppercase font-bold text-[0.85rem] text-[var(--color-text-mid)]">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`hover:text-[var(--color-hw-orange)] transition-colors no-underline ${isActiveLink(link)
                ? 'text-[var(--color-hw-orange)] border-b-2 border-[var(--color-hw-orange)]'
                : ''
                }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}