import CustomZone from './CustomZone';

export default function BannerZone() {
  return (
    <div className="px-6 pt-4">
      <CustomZone label="커스텀 · 배너 (노출여부/위치 선택)" className="flex h-20 items-center justify-center">
        <span className="text-[11px] text-[#8B5CF6]">배너 이미지 영역</span>
      </CustomZone>
    </div>
  );
}
