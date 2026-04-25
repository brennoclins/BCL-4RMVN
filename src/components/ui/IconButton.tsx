import type { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export function IconButton({ icon, className = '', ...props }: IconButtonProps) {
  return (
    <button
      className={`p-3 rounded ${className}`}
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
        color: 'var(--color-text-mid)',
      }}
      {...props}
    >
      {icon}
    </button>
  );
}
