'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/login/TopBar';
import LogoStack from '@/components/login/LogoStack';
import { BannerItem, CustomLoginScreenSettingsState, FreeBlock } from './customLoginScreenDefaults';

interface Props {
  settings: CustomLoginScreenSettingsState;
}

function BannerCarousel({ banners }: { banners: BannerItem[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div className="px-5 pt-4">
        <div className="flex h-16 items-center justify-center rounded-md bg-gray-100 text-[10px] text-gray-400">
          배너 이미지 영역
        </div>
      </div>
    );
  }

  const current = banners[index % banners.length];
  const hasLink = current.linkUrl.trim().length > 0;

  return (
    <div className="px-5 pt-4">
      <div
        className={`relative h-16 overflow-hidden rounded-md bg-gray-100 ${hasLink ? 'cursor-pointer' : ''}`}
        title={hasLink ? current.linkUrl : undefined}
      >
        {current.imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.imageDataUrl} alt="배너" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
            배너 이미지 영역
          </div>
        )}
        {hasLink && (
          <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M10 13a5 5 0 007.07 0l2-2a5 5 0 00-7.07-7.07l-1 1" />
              <path d="M14 11a5 5 0 00-7.07 0l-2 2a5 5 0 007.07 7.07l1-1" />
            </svg>
          </span>
        )}
        {banners.length > 1 && (
          <span className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
            {banners.map((b, i) => (
              <span
                key={b.id}
                className={`h-1 w-1 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

function BlockView({ block }: { block: FreeBlock }) {
  if (block.type === 'text') {
    return (
      <p className="rounded-md border border-gray-200 px-3 py-2 text-xs leading-relaxed text-gray-600">
        {block.text || '(빈 텍스트)'}
      </p>
    );
  }
  if (block.type === 'image') {
    const hasLink = block.linkUrl.trim().length > 0;
    return (
      <div className={`relative overflow-hidden rounded-md ${hasLink ? 'cursor-pointer' : ''}`} title={hasLink ? block.linkUrl : undefined}>
        {block.imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.imageDataUrl} alt="" className="w-full object-cover" />
        ) : (
          <div className="flex h-16 items-center justify-center bg-gray-100 text-[10px] text-gray-400">
            이미지 영역
          </div>
        )}
        {hasLink && (
          <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M10 13a5 5 0 007.07 0l2-2a5 5 0 00-7.07-7.07l-1 1" />
              <path d="M14 11a5 5 0 00-7.07 0l-2 2a5 5 0 007.07 7.07l1-1" />
            </svg>
          </span>
        )}
      </div>
    );
  }
  return (
    <button type="button" className="w-full rounded-md bg-gray-900 py-2 text-xs font-semibold text-white">
      {block.label || '버튼'}
    </button>
  );
}

export default function CustomLoginPreview({ settings }: Props) {
  return (
    <div className="sticky top-6">
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        미리보기
      </p>
      <div
        className="mx-auto w-[280px] overflow-hidden rounded-[26px] border border-gray-300 shadow-lg"
        style={{ backgroundColor: settings.bgColor }}
      >
        <div className="flex items-center justify-between px-4 pt-2.5 pb-1 text-[10px] font-semibold text-gray-800">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-2.5 rounded-[1px] border border-gray-800" />
            <span className="h-1.5 w-1.5 rounded-full border border-gray-800" />
          </span>
        </div>

        <TopBar />
        <LogoStack />

        <div className="px-5 pb-3">
          {settings.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logoDataUrl} alt="고객사 로고" className="mx-auto h-8 max-w-[140px] object-contain" />
          ) : (
            <div className="mx-auto flex h-8 w-24 items-center justify-center rounded border border-dashed border-gray-300 text-[9px] text-gray-300">
              로고 영역
            </div>
          )}
        </div>

        {settings.bannerEnabled && settings.bannerPosition === 'top' && <BannerCarousel banners={settings.banners} />}

        <div className="px-5 pt-3">
          <p className="rounded-md bg-gray-50 py-2 text-center text-xs font-semibold text-gray-700">
            {settings.subtitle}
          </p>
        </div>

        <div className="px-5 pt-4">
          <div className="space-y-2">
            <input
              disabled
              placeholder="아이디"
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-400"
            />
            <input
              disabled
              placeholder="비밀번호"
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-400"
            />
          </div>

          <button
            type="button"
            style={{ backgroundColor: settings.buttonColor }}
            className="mt-3 w-full rounded-md py-2.5 text-xs font-bold text-white"
          >
            로그인
          </button>

          <label className="mt-2.5 flex items-center gap-1.5 text-[10px] text-gray-500">
            <input type="checkbox" disabled className="h-3 w-3 rounded border-gray-300" />
            아이디 저장하기
          </label>

          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <span>아이디 찾기</span>
            <span className="text-gray-200">|</span>
            <span>비밀번호 찾기</span>
          </div>
        </div>

        <p className="px-5 pt-5 text-center text-[11px] leading-relaxed text-gray-500">
          판매사 회원가입 후 발주를 시작하세요.{' '}
          <span className="cursor-pointer font-semibold text-[#1a8f5a] underline underline-offset-2">
            입점 신청하기
          </span>
        </p>

        {settings.bannerEnabled && settings.bannerPosition === 'middle' && <BannerCarousel banners={settings.banners} />}

        {settings.blocks.length > 0 && (
          <div className="space-y-2.5 px-5 pt-5">
            {settings.blocks.map((block) => (
              <BlockView key={block.id} block={block} />
            ))}
          </div>
        )}

        {settings.bannerEnabled && settings.bannerPosition === 'bottom' && <BannerCarousel banners={settings.banners} />}

        <div className="pb-6" />
      </div>
    </div>
  );
}
