import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[]
  onChange?: (value: string) => void
}

export function Select({
  options,
  value,
  onChange,
  className = '',
  ...props
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`bg-gradient-to-b from-gray-400 to-gray-200 border border-white/10 text-white px-3 py-2 rounded-full text-xs cursor-pointer min-w-[140px] shadow-[0_2px_4px_rgba(0,0,0,0.4)] focus:border-[--color-hw-orange] disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}