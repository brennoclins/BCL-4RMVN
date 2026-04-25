import type { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
}

export function IconButton({
  icon,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`p-3 bg-gradient-to-b from-white to-gray-200 border border-black/10 rounded text-[--color-text-mid] hover:border-[--color-text-mid] disabled:opacity-40 disabled:cursor-not-allowed transition-all ${className}`}
      {...props}
    >
      {icon}
    </button>
  )
}