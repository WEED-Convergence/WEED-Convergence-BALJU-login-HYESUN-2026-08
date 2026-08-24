import CustomZone from './CustomZone';

export default function FreeBlockZone() {
  return (
    <div className="px-6 pt-6">
      <CustomZone label="커스텀 · 자유 블록 추가 영역" className="p-3">
        <button
          type="button"
          className="w-full rounded-md border border-gray-200 bg-white py-2 text-xs font-semibold text-gray-600"
        >
          + 블록 추가
        </button>
        <p className="mt-2 text-[10px] leading-relaxed text-gray-400">
          클릭 시 (a) 사전 정의된 블록(이미지 배너 · 텍스트 · 상품 노출) 중 선택하거나
          (b) HTML/이미지를 직접 삽입하는 임베드 방식 중 하나를 선택하는 목업입니다.
        </p>
      </CustomZone>
    </div>
  );
}
