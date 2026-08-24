interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function CustomZone({ label, children, className = '' }: Props) {
  return (
    <div className={`relative rounded-lg border-2 border-dashed border-[#8B5CF6] bg-[#8B5CF6]/[0.05] ${className}`}>
      <span className="absolute -top-2.5 left-2 rounded bg-white px-1.5 text-[9px] font-bold leading-[14px] text-[#8B5CF6]">
        {label}
      </span>
      {children}
    </div>
  );
}
