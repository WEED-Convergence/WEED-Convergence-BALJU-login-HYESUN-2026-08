interface Props {
  children: React.ReactNode;
  caption?: string;
}

export default function PhoneFrame({ children, caption }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-[#eef0f2] px-4 py-8">
      <div className="w-[375px] shrink-0 overflow-hidden rounded-[28px] border border-gray-300 bg-white shadow-xl">
        {/* 디바이스 상태바 (목업용, 실제 기능 없음) */}
        <div className="flex items-center justify-between bg-white px-5 pt-3 pb-1 text-[11px] font-semibold text-gray-800">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[1px] border border-gray-800" />
            <span className="h-2 w-2 rounded-full border border-gray-800" />
          </span>
        </div>
        {children}
      </div>
      {caption && (
        <p className="w-[375px] text-center text-[11px] leading-relaxed text-gray-400">{caption}</p>
      )}
    </div>
  );
}
