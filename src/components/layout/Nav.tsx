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

  return (
    <nav className="flex items-center justify-between w-full max-w-[1200px] mx-auto px-8 py-6 z-50">
      <Link
        to="/"
        className="text-3xl font-bold tracking-tight text-[--color-text-dark] no-underline"
      >
        BCL-4RMVN<span className="text-hw-orange">.</span>
      </Link>
      <ul className="flex gap-8 list-none">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`text-sm font-bold uppercase tracking-wide transition-colors duration-300 hover:text-hw-orange no-underline ${
                location.pathname === link.to
                  ? 'text-hw-orange border-b-2 border-hw-orange'
                  : 'text-[--color-text-mid]'
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
