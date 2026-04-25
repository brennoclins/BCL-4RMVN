import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'hardware' | 'hardware-orange' | 'default';
}

export function Button({ variant = 'default', children, className = '', ...props }: ButtonProps) {
  let style: React.CSSProperties = {};

  switch (variant) {
    case 'hardware':
      style = {
        padding: '0.8rem 2rem',
        fontSize: '0.9rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        borderRadius: '6px',
        background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
        border: '1px solid rgba(0,0,0,0.1)',
        color: 'var(--color-text-dark)',
        boxShadow: '3px 3px 8px rgba(0,0,0,0.1), -2px -2px 5px #fff',
      };
      break;
    case 'hardware-orange':
      style = {
        padding: '0.8rem 2rem',
        fontSize: '0.9rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        borderRadius: '6px',
        background: 'linear-gradient(145deg, #ff7733, #ff5500)',
        color: 'white',
        boxShadow: '3px 3px 8px rgba(0,0,0,0.1), -2px -2px 5px #fff',
      };
      break;
    default:
      style = {
        padding: '0.6rem 1.2rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        borderRadius: '4px',
        background: '#e0e0e0',
        border: '1px solid rgba(0,0,0,0.1)',
      };
  }

  return (
    <button
      className={`transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
