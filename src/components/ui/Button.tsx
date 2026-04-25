import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'hardware' | 'hardware-orange' | 'default';
}

const variantClasses = {
  hardware:
    'px-6 py-3 text-sm font-bold uppercase bg-gradient-to-b from-white to-gray-200 border border-black/10 rounded-md shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] hover:translate-y-[-2px] hover:shadow-[5px_5px_12px_rgba(0,0,0,0.15)] transition-all disabled:opacity-40 disabled:cursor-not-allowed',
  'hardware-orange':
    'px-6 py-3 text-sm font-bold uppercase bg-gradient-to-b from-[#ff7733] to-[#ff5500] border border-black/10 rounded-md shadow-[3px_3px_8px_rgba(0,0,0,0.1),-2px_-2px_5px_#fff] hover:translate-y-[-2px] hover:shadow-[5px_5px_12px_rgba(0,0,0,0.15)] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed',
  default:
    'px-4 py-2 text-sm font-bold uppercase bg-gray-200 border border-black/10 rounded-md hover:bg-gray-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed',
};

export function Button({ variant = 'default', children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
