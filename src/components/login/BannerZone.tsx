import CustomZone from './CustomZone';

export default function BannerZone() {
  return (
    <div className="px-6 pt-4">
      <CustomZone label="커스텀 · 배너 (노출여부/상단·하단 위치)" className="flex h-20 flex-col items-center justify-center gap-1">
        <span className="text-[11px] text-[#8B5CF6]">배너 이미지 영역</span>
        <span className="text-[9px] text-[#8B5CF6]/70">이미지·URL 최대 3개 등록, 등록 순 순차 롤링</span>
      </CustomZone>
    </div>
  );
}
