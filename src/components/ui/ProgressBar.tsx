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
      className={`rounded cursor-pointer relative overflow-hidden ${className}`}
      onClick={handleClick}
      style={{
        height: '12px',
        background: '#101010',
        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="h-full rounded"
        style={{
          width: `${Math.min(progress, 100)}%`,
          backgroundColor: 'var(--color-accent-screen)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}
