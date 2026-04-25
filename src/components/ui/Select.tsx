import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-full text-xs cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
      style={{
        background: 'linear-gradient(180deg, #404040 0%, #1a1a1a 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        padding: '0.5rem 0.8rem',
        minWidth: '140px',
      }}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
