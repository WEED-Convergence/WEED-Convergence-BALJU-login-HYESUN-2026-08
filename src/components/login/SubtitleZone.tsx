import CustomZone from './CustomZone';

export default function SubtitleZone() {
  return (
    <div className="px-6 pt-4">
      <CustomZone label="커스텀 · 서브 타이틀 텍스트" className="flex h-9 items-center justify-center">
        <span className="text-xs font-semibold text-gray-700">My Shop 판매자센터</span>
      </CustomZone>
    </div>
  );
}
