import CustomZone from './CustomZone';

export default function RecommendedProducts() {
  return (
    <div className="px-6 pt-6">
      <CustomZone label="커스텀 · 추천 상품 노출 여부" className="p-3">
        <p className="mb-2 text-[11px] font-semibold text-gray-500">추천 상품</p>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <div className="aspect-square rounded-md bg-gray-100" />
              <div className="h-1.5 w-3/4 rounded-full bg-gray-100" />
            </div>
          ))}
        </div>
      </CustomZone>
    </div>
  );
}
