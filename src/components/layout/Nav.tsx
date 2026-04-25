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
    <nav
      className="w-full py-6 px-8 z-50"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link
        to="/"
        className="text-[1.8rem] font-bold tracking-[-1px] text-[--color-text-dark] no-underline"
      >
        BCL-4RMVN<span className="text-[--color-hw-orange]">.</span>
      </Link>
      <ul className="flex gap-8 list-none">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`text-[0.85rem] font-bold uppercase tracking-wide transition-colors duration-300 hover:text-[--color-hw-orange] no-underline ${
                location.pathname === link.to
                  ? 'text-[--color-hw-orange] border-b-2 border-[--color-hw-orange]'
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