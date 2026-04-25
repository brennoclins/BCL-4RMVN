interface HWHeaderProps {
  title: string;
  model: string;
}

export function HWHeader({ title, model }: HWHeaderProps) {
  return (
    <div
      className="flex justify-between items-start border-b border-[var(--color-border-alpha)] pb-4"
      style={{ gridArea: 'header' }}
    >
      <div>
        <h2 className="text-[1.8rem] tracking-tight">
          {title}<span className="text-[var(--color-hw-orange)]">.</span>
        </h2>
        <div className="text-[0.7rem] text-[var(--color-text-mid)] uppercase tracking-[2px]">
          {model}
        </div>
      </div>
      <div
        className="w-[10px] h-[10px] rounded-full bg-[var(--color-accent-screen)] shadow-[0_0_8px_var(--color-accent-screen)]"
        style={{ marginTop: '0.5rem' }}
      />
    </div>
  );
}