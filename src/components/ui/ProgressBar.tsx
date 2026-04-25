interface ProgressBarProps {
  progress: number;
  onClick?: (progress: number) => void;
  className?: string;
}

export function ProgressBar({ progress, onClick, className = '' }: ProgressBarProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    onClick(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div
      className={`h-3 bg-[#101010] rounded-md cursor-pointer relative overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] ${className}`}
      onClick={handleClick}
    >
      <div
        className="h-full bg-[--color-accent-screen] rounded-md transition-all duration-100"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}
