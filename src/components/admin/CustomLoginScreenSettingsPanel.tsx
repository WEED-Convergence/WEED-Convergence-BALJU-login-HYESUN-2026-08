'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BANNER_POSITIONS,
  BLOCK_TYPE_DEFS,
  BannerItem,
  BannerPosition,
  BlockType,
  CustomLoginScreenSettingsState,
  FreeBlock,
  MAX_BANNERS,
  nextBannerId,
  nextBlockId,
} from './customLoginScreenDefaults';

interface Props {
  settings: CustomLoginScreenSettingsState;
  onLogoFile: (file: File | null) => void;
  onButtonColorChange: (value: string) => void;
  onBannerToggle: (enabled: boolean) => void;
  onBannerPosition: (position: BannerPosition) => void;
  onAddBanner: (banner: BannerItem) => void;
  onRemoveBanner: (id: string) => void;
  onSubtitleChange: (value: string) => void;
  onBgColorChange: (value: string) => void;
  onAddBlock: (block: FreeBlock) => void;
  onRemoveBlock: (id: string) => void;
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h3 className="mb-3 text-xs font-bold text-gray-700">{title}</h3>
      {children}
    </section>
  );
}

const BLOCK_TYPE_ICON: Record<BlockType, string> = {
  text: 'T',
  image: '🖼',
  link: '🔗',
};

function blockSummary(block: FreeBlock): string {
  if (block.type === 'text') return block.text || '(빈 텍스트)';
  if (block.type === 'image') {
    const name = block.imageFileName ?? '(첨부된 이미지 없음)';
    return block.linkUrl ? `${name} → ${block.linkUrl}` : name;
  }
  return `${block.label || '버튼'} → ${block.url || '(URL 미입력)'}`;
}

export default function CustomLoginScreenSettingsPanel({
  settings,
  onLogoFile,
  onButtonColorChange,
  onBannerToggle,
  onBannerPosition,
  onAddBanner,
  onRemoveBanner,
  onSubtitleChange,
  onBgColorChange,
  onAddBlock,
  onRemoveBlock,
  onReset,
}: Props) {
  const router = useRouter();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pendingType, setPendingType] = useState<BlockType | null>(null);
  const [draftText, setDraftText] = useState('');
  const [draftLabel, setDraftLabel] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const [draftImageDataUrl, setDraftImageDataUrl] = useState<string | null>(null);
  const [draftImageFileName, setDraftImageFileName] = useState<string | null>(null);

  const [bannerComposerOpen, setBannerComposerOpen] = useState(false);
  const [bannerDraftImageDataUrl, setBannerDraftImageDataUrl] = useState<string | null>(null);
  const [bannerDraftImageFileName, setBannerDraftImageFileName] = useState<string | null>(null);
  const [bannerDraftLinkUrl, setBannerDraftLinkUrl] = useState('');

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    onLogoFile(e.target.files?.[0] ?? null);
  };

  const handleBannerDraftImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBannerDraftImageDataUrl(reader.result as string);
      setBannerDraftImageFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const resetBannerComposer = () => {
    setBannerComposerOpen(false);
    setBannerDraftImageDataUrl(null);
    setBannerDraftImageFileName(null);
    setBannerDraftLinkUrl('');
  };

  const confirmAddBanner = () => {
    onAddBanner({
      id: nextBannerId(),
      imageDataUrl: bannerDraftImageDataUrl,
      imageFileName: bannerDraftImageFileName,
      linkUrl: bannerDraftLinkUrl,
    });
    resetBannerComposer();
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
        linkUrl: draftUrl,
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
          onClick={() => router.push('/admin-login-basic')}
          className="relative px-4 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600"
        >
          기본 타입
        </button>
        <button type="button" className="relative px-4 py-3 text-sm font-semibold text-gray-900">
          커스텀 타입
          <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gray-900" />
        </button>
      </div>

      <div className="space-y-4 px-5 py-5">
        <Section title="로고 영역">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
              파일 선택
              <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
            </label>
            <span className="truncate text-xs text-gray-400">
              {settings.logoFileName ?? '첨부된 파일 없음'}
            </span>
          </div>
        </Section>

        <Section title="로그인 버튼 영역">
          <label className="mb-1.5 block text-[11px] text-gray-400">버튼 색상</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.buttonColor}
              onChange={(e) => onButtonColorChange(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded border border-gray-200 p-0.5"
            />
            <span className="font-mono text-xs text-gray-500">{settings.buttonColor}</span>
          </div>
        </Section>

        <Section title="배너 영역">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-[11px] text-gray-400">배너 노출</label>
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

              <p className="rounded-md bg-gray-50 px-2.5 py-2 text-[11px] leading-relaxed text-gray-500">
                배너는 최대 {MAX_BANNERS}개까지 등록할 수 있으며, 등록 순으로 순차 롤링 처리됩니다.
              </p>

              {settings.banners.length > 0 && (
                <ul className="space-y-1.5">
                  {settings.banners.map((banner, i) => (
                    <li
                      key={banner.id}
                      className="flex items-center gap-2 rounded-md border border-gray-200 px-2.5 py-2"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-500">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-xs text-gray-600">
                        {banner.imageFileName ?? '(첨부된 이미지 없음)'}
                        {banner.linkUrl ? ` → ${banner.linkUrl}` : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveBanner(banner.id)}
                        className="shrink-0 text-xs font-semibold text-gray-400 hover:text-red-500"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {!bannerComposerOpen && settings.banners.length < MAX_BANNERS && (
                <button
                  type="button"
                  onClick={() => setBannerComposerOpen(true)}
                  className="w-full rounded-md border border-dashed border-gray-300 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50"
                >
                  + 배너 추가 ({settings.banners.length}/{MAX_BANNERS})
                </button>
              )}

              {bannerComposerOpen && (
                <div className="space-y-2 rounded-md border border-gray-200 p-2.5">
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                      파일 선택
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerDraftImageInput}
                      />
                    </label>
                    <span className="truncate text-xs text-gray-400">
                      {bannerDraftImageFileName ?? '첨부된 파일 없음'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={bannerDraftLinkUrl}
                    onChange={(e) => setBannerDraftLinkUrl(e.target.value)}
                    placeholder="배너 클릭 시 이동 URL"
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={resetBannerComposer}
                      className="flex-1 rounded-md border border-gray-200 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={confirmAddBanner}
                      className="flex-1 rounded-md bg-gray-900 py-1.5 text-xs font-semibold text-white"
                    >
                      추가
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Section>

        <Section title="서브타이틀 영역">
          <input
            type="text"
            value={settings.subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="예: My Shop 판매자센터"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
          />
        </Section>

        <Section title="배경 영역">
          <label className="mb-1.5 block text-[11px] text-gray-400">배경 색상</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.bgColor}
              onChange={(e) => onBgColorChange(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded border border-gray-200 p-0.5"
            />
            <span className="font-mono text-xs text-gray-500">{settings.bgColor}</span>
          </div>
        </Section>

        <Section title="자유 블록 영역">
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
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                      파일 선택
                      <input type="file" accept="image/*" className="hidden" onChange={handleDraftImageInput} />
                    </label>
                    <span className="truncate text-xs text-gray-400">
                      {draftImageFileName ?? '첨부된 파일 없음'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={draftUrl}
                    onChange={(e) => setDraftUrl(e.target.value)}
                    placeholder="배너 클릭 시 이동 URL"
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-xs text-gray-700 focus:border-gray-300 focus:outline-none"
                  />
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
        </Section>

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
    </div>
  );
}
