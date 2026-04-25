import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'home' | 'player';
}

export function Logo({ variant = 'home' }: LogoProps) {
  const className =
    variant === 'player'
      ? 'text-3xl font-bold tracking-tight text-[--color-text-dark] no-underline'
      : 'text-3xl font-bold tracking-tight';

  return (
    <Link to="/" className={className}>
      BCL-4RMVN<span className="text-hw-orange">.</span>
    </Link>
  );
}
