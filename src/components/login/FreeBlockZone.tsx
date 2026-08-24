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
          클릭 시 텍스트 블록, 이미지·배너 블록(클릭 시 이동 URL 설정 가능), 링크 버튼 블록(버튼 색상 지정 가능) 중
          하나를 선택해 개수 제한 없이 추가·삭제할 수 있는 목업입니다.
        </p>
      </CustomZone>
    </div>
  );
}
