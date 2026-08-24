'use client';

import { ChangeEvent, useState } from 'react';
import {
  BANNER_POSITIONS,
  BLOCK_TYPE_DEFS,
  BannerPosition,
  BlockType,
  CUSTOM_FOOTER_FIELD_DEFS,
  CustomFooterFields,
  CustomLoginScreenSettingsState,
  FreeBlock,
  nextBlockId,
} from './customLoginScreenDefaults';
import { MockProduct } from './mockProducts';
import ProductPickerModal from './ProductPickerModal';

type Tab = 'basic' | 'custom';

interface Props {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  settings: CustomLoginScreenSettingsState;
  onLogoFile: (file: File | null) => void;
  onBannerToggle: (enabled: boolean) => void;
  onBannerPosition: (position: BannerPosition) => void;
  onBannerImageFile: (file: File | null) => void;
  onBannerLinkChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onBgColorChange: (value: string) => void;
  onRecommendedToggle: (enabled: boolean) => void;
  onProductsChange: (products: MockProduct[]) => void;
  onAddBlock: (block: FreeBlock) => void;
  onRemoveBlock: (id: string) => void;
  onFooterChange: (key: keyof CustomFooterFields, value: string) => void;
  onReset: () => void;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-[#1a8f5a]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

const BLOCK_TYPE_ICON: Record<BlockType, string> = {
  text: 'T',
  image: '🖼',
  link: '🔗',
};

function blockSummary(block: FreeBlock): string {
  if (block.type === 'text') return block.text || '(빈 텍스트)';
  if (block.type === 'image') return block.imageFileName ?? '(첨부된 이미지 없음)';
  return `${block.label || '버튼'} → ${block.url || '(URL 미입력)'}`;
}

export default function CustomLoginScreenSettingsPanel({
  tab,
  onTabChange,
  settings,
  onLogoFile,
  onBannerToggle,
  onBannerPosition,
  onBannerImageFile,
  onBannerLinkChange,
  onSubtitleChange,
  onBgColorChange,
  onRecommendedToggle,
  onProductsChange,
  onAddBlock,
  onRemoveBlock,
  onFooterChange,
  onReset,
}: Props) {
  const [productPickerOpen, setProductPickerOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pendingType, setPendingType] = useState<BlockType | null>(null);
  const [draftText, setDraftText] = useState('');
  const [draftLabel, setDraftLabel] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const [draftImageDataUrl, setDraftImageDataUrl] = useState<string | null>(null);
  const [draftImageFileName, setDraftImageFileName] = useState<string | null>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    onLogoFile(e.target.files?.[0] ?? null);
  };

  const handleBannerFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    onBannerImageFile(e.target.files?.[0] ?? null);
  };

  const handleDraftImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDraftImageDataUrl(reader.result as string);
      setDraftImageFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const resetComposer = () => {
    setPickerOpen(false);
    setPendingType(null);
    setDraftText('');
    setDraftLabel('');
    setDraftUrl('');
    setDraftImageDataUrl(null);
    setDraftImageFileName(null);
  };

  const confirmAddBlock = () => {
    if (!pendingType) return;
    if (pendingType === 'text') {
      onAddBlock({ id: nextBlockId(), type: 'text', text: draftText });
    } else if (pendingType === 'image') {
      onAddBlock({
        id: nextBlockId(),
        type: 'image',
        imageDataUrl: draftImageDataUrl,
        imageFileName: draftImageFileName,
      });
    } else {
      onAddBlock({ id: nextBlockId(), type: 'link', label: draftLabel, url: draftUrl });
    }
    resetComposer();
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex border-b border-gray-100 px-2">
        <button
          type="button"
          onClick={() => onTabChange('basic')}
          className={`relative px-4 py-3 text-sm font-semibold ${
            tab === 'basic' ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          기본 타입
          {tab === 'basic' && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gray-900" />}
        </button>
        <button
          type="button"
          onClick={() => onTabChange('custom')}
          className={`relative px-4 py-3 text-sm font-semibold ${
            tab === 'custom' ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          커스텀 타입
          {tab === 'custom' && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gray-900" />}
        </button>
      </div>

      {tab === 'basic' ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-8 w-8 text-gray-300">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l2.5 2.5" />
          </svg>
          <p className="text-sm font-semibold text-gray-500">기본 타입 설정은 준비 중입니다.</p>
          <p className="text-xs text-gray-400">커스텀 타입 설정 화면을 먼저 이용해 주세요.</p>
        </div>
      ) : (
        <div className="space-y-6 px-5 py-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">고객사 로고</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                파일 선택
                <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
              </label>
              <span className="truncate text-xs text-gray-400">
                {settings.logoFileName ?? '첨부된 파일 없음'}
              </span>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-600">배너</label>
              <Toggle checked={settings.bannerEnabled} onChange={onBannerToggle} />
            </div>
            {settings.bannerEnabled && (
              <div className="space-y-3">
                <div className="flex gap-1.5">
                  {BANNER_POSITIONS.map((pos) => (
                    <button
                      key={pos.key}
                      type="button"
                      onClick={() => onBannerPosition(pos.key)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${
                        settings.bannerPosition === pos.key
                          ? 'border-[#1a8f5a] bg-[#1a8f5a]/10 text-[#1a8f5a]'
                          : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-gray-400">배너 이미지</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                      파일 선택
                      <input type="file" accept="image/*" className="hidden" onChange={handleBannerFileInput} />
                    </label>
                    <span className="truncate text-xs text-gray-400">
                      {settings.bannerImageFileName ?? '첨부된 파일 없음'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-gray-400">배너 클릭 시 이동 URL</label>
                  <input
                    type="text"
                    value={settings.bannerLinkUrl}
                    onChange={(e) => onBannerLinkChange(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">서브타이틀 텍스트</label>
            <input
              type="text"
              value={settings.subtitle}
              onChange={(e) => onSubtitleChange(e.target.value)}
              placeholder="예: My Shop 판매자센터"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">배경 색상</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border border-gray-200 p-0.5"
              />
              <span className="font-mono text-xs text-gray-500">{settings.bgColor}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-600">추천 상품 노출 영역</label>
              <Toggle checked={settings.showRecommended} onChange={onRecommendedToggle} />
            </div>

            <button
              type="button"
              onClick={() => setProductPickerOpen(true)}
              className="mt-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              상품 불러오기
            </button>

            {settings.selectedProducts.length > 0 && (
              <ul className="mt-2 space-y-1.5">
                {settings.selectedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-2 rounded-md border border-gray-200 px-2.5 py-1.5"
                  >
                    <span className="h-6 w-6 shrink-0 rounded bg-gray-100" />
                    <span className="min-w-0 flex-1 truncate text-xs text-gray-600">{product.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        onProductsChange(settings.selectedProducts.filter((p) => p.id !== product.id))
                      }
                      className="shrink-0 text-xs font-semibold text-gray-400 hover:text-red-500"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <ProductPickerModal
              open={productPickerOpen}
              selected={settings.selectedProducts}
              onClose={() => setProductPickerOpen(false)}
              onConfirm={(products) => {
                onProductsChange(products);
                setProductPickerOpen(false);
              }}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">자유 블록 추가</label>

            {settings.blocks.length > 0 && (
              <ul className="mb-3 space-y-1.5">
                {settings.blocks.map((block) => (
                  <li
                    key={block.id}
                    className="flex items-center gap-2 rounded-md border border-gray-200 px-2.5 py-2"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-500">
                      {BLOCK_TYPE_ICON[block.type]}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-gray-600">
                      {blockSummary(block)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveBlock(block.id)}
                      className="shrink-0 text-xs font-semibold text-gray-400 hover:text-red-500"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!pickerOpen && !pendingType && (
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="w-full rounded-md border border-dashed border-gray-300 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50"
              >
                + 블록 추가
              </button>
            )}

            {pickerOpen && !pendingType && (
              <div className="space-y-1.5 rounded-md border border-gray-200 p-2.5">
                <p className="mb-1 text-[11px] text-gray-400">추가할 블록 타입을 선택하세요.</p>
                {BLOCK_TYPE_DEFS.map((def) => (
                  <button
                    key={def.key}
                    type="button"
                    onClick={() => setPendingType(def.key)}
                    className="flex w-full items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-500">
                      {BLOCK_TYPE_ICON[def.key]}
                    </span>
                    {def.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={resetComposer}
                  className="w-full py-1 text-[11px] text-gray-400 hover:text-gray-600"
                >
                  취소
                </button>
              </div>
            )}

            {pendingType && (
              <div className="space-y-2 rounded-md border border-gray-200 p-2.5">
                <p className="text-[11px] font-semibold text-gray-500">
                  {BLOCK_TYPE_DEFS.find((d) => d.key === pendingType)?.label}
                </p>

                {pendingType === 'text' && (
                  <textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    placeholder="노출할 텍스트를 입력하세요."
                    rows={2}
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                  />
                )}

                {pendingType === 'image' && (
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                      파일 선택
                      <input type="file" accept="image/*" className="hidden" onChange={handleDraftImageInput} />
                    </label>
                    <span className="truncate text-xs text-gray-400">
                      {draftImageFileName ?? '첨부된 파일 없음'}
                    </span>
                  </div>
                )}

                {pendingType === 'link' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={draftLabel}
                      onChange={(e) => setDraftLabel(e.target.value)}
                      placeholder="버튼 텍스트"
                      className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={draftUrl}
                      onChange={(e) => setDraftUrl(e.target.value)}
                      placeholder="이동 URL"
                      className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={resetComposer}
                    className="flex-1 rounded-md border border-gray-200 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={confirmAddBlock}
                    className="flex-1 rounded-md bg-gray-900 py-1.5 text-xs font-semibold text-white"
                  >
                    추가
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">푸터 정보</label>
            <div className="grid grid-cols-2 gap-3">
              {CUSTOM_FOOTER_FIELD_DEFS.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-[11px] text-gray-400">{field.label}</label>
                  <input
                    type="text"
                    value={settings.footer[field.key]}
                    onChange={(e) => onFooterChange(field.key, e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-amber-100 bg-amber-50 px-3 py-2.5 text-[11px] leading-relaxed text-amber-700">
            상단 로고 스택, 판매사/관리자 탭 로직, 아이디·비밀번호 입력 로직 등은 고정값으로 이 화면에서 변경할 수 없습니다.
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onReset}
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
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
