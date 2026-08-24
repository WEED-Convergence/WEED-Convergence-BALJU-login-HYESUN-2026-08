'use client';

import { useEffect, useState } from 'react';
import { MOCK_PRODUCTS, MockProduct } from './mockProducts';

const MAX_SELECT = 3;

interface Props {
  open: boolean;
  selected: MockProduct[];
  onClose: () => void;
  onConfirm: (products: MockProduct[]) => void;
}

export default function ProductPickerModal({ open, selected, onClose, onConfirm }: Props) {
  const [draft, setDraft] = useState<MockProduct[]>(selected);

  useEffect(() => {
    if (open) setDraft(selected);
  }, [open, selected]);

  if (!open) return null;

  const isChecked = (id: string) => draft.some((p) => p.id === id);
  const toggle = (product: MockProduct) => {
    setDraft((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= MAX_SELECT) return prev;
      return [...prev, product];
    });
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-900">상품 검색</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-gray-400 hover:text-gray-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-5 w-5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto">
          <div className="space-y-3 border-b border-gray-100 px-6 py-4">
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="mb-1 block text-[11px] text-gray-400">상품명</label>
                <input
                  type="text"
                  placeholder="상품명 입력"
                  className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-400">옵션명</label>
                <input
                  type="text"
                  placeholder="옵션명 입력"
                  className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-400">상품코드</label>
                <input
                  type="text"
                  placeholder="상품코드 입력"
                  className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-400">공급사</label>
                <div className="flex gap-1.5">
                  <select className="w-full rounded-md border border-gray-200 px-2 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none">
                    <option>선택</option>
                  </select>
                  <button
                    type="button"
                    className="shrink-0 rounded-md bg-[#1a8f5a] px-2.5 text-xs font-semibold text-white hover:bg-[#157a4c]"
                  >
                    공급사 찾기
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 items-start gap-3">
              <div>
                <label className="mb-1 block text-[11px] text-gray-400">날짜검색</label>
                <div className="flex items-center gap-1.5">
                  <select className="shrink-0 rounded-md border border-gray-200 px-2 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none">
                    <option>파트너스 등록일</option>
                  </select>
                  <input
                    type="date"
                    defaultValue="2025-01-01"
                    className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                  />
                  <span className="shrink-0 text-gray-300">~</span>
                  <input
                    type="date"
                    defaultValue={today}
                    className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-400">상품메모</label>
                <input
                  type="text"
                  placeholder="메모 내용 입력"
                  className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span className="shrink-0 text-[11px] text-gray-400">전체공개여부</span>
                {['전체', '사용', '미사용'].map((label, i) => (
                  <label key={label} className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                    <input type="radio" name="public-scope" defaultChecked={i === 0} className="h-3 w-3" />
                    {label}
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span className="shrink-0 text-[11px] text-gray-400">판매여부</span>
                {['전체', '판매', '미판매'].map((label, i) => (
                  <label key={label} className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                    <input type="radio" name="sale-scope" defaultChecked={i === 1} className="h-3 w-3" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 pt-1">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M3 12a9 9 0 1 1 3 6.7" />
                  <path d="M3 4v6h6" />
                </svg>
                초기화
              </button>
              <button
                type="button"
                className="rounded-full bg-[#1a8f5a] px-6 py-2 text-sm font-semibold text-white hover:bg-[#157a4c]"
              >
                검색
              </button>
            </div>
          </div>

          <div className="px-6 pb-2">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-600">상품 리스트</p>
              <p className="text-[11px] text-gray-400">
                {draft.length} / {MAX_SELECT} 선택됨
              </p>
            </div>
            <ul className="max-h-64 space-y-1.5 overflow-y-auto">
              {MOCK_PRODUCTS.map((product) => {
                const checked = isChecked(product.id);
                const disabled = !checked && draft.length >= MAX_SELECT;
                return (
                  <li key={product.id}>
                    <label
                      className={`flex items-center gap-3 rounded-md border px-3 py-2.5 ${
                        checked ? 'border-[#1a8f5a] bg-[#1a8f5a]/5' : 'border-gray-200'
                      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggle(product)}
                        className="h-3.5 w-3.5 shrink-0 rounded border-gray-300"
                      />
                      <span className="h-10 w-10 shrink-0 rounded bg-gray-100" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-gray-700">
                          {product.name}
                        </span>
                        <span className="block text-[11px] text-gray-400">
                          {product.code} · {product.supplier}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-gray-600">
                        {product.price.toLocaleString()}원
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onConfirm(draft)}
            className="rounded-full bg-[#1a8f5a] px-6 py-2 text-sm font-semibold text-white hover:bg-[#157a4c]"
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}
