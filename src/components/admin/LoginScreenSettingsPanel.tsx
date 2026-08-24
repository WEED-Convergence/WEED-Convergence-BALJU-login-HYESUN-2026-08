'use client';

import { ChangeEvent } from 'react';
import {
  FOOTER_FIELD_DEFS,
  LoginScreenFooterFields,
  LoginScreenSettingsState,
} from './loginScreenDefaults';

type Tab = 'basic' | 'custom';

interface Props {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  settings: LoginScreenSettingsState;
  onLogoFile: (file: File | null) => void;
  onColorChange: (key: 'buttonColor' | 'bgColor', value: string) => void;
  onFooterChange: (key: keyof LoginScreenFooterFields, value: string) => void;
  onReset: () => void;
}

export default function LoginScreenSettingsPanel({
  tab,
  onTabChange,
  settings,
  onLogoFile,
  onColorChange,
  onFooterChange,
  onReset,
}: Props) {
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    onLogoFile(e.target.files?.[0] ?? null);
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

      {tab === 'custom' ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-8 w-8 text-gray-300">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l2.5 2.5" />
          </svg>
          <p className="text-sm font-semibold text-gray-500">커스텀 타입 설정은 준비 중입니다.</p>
          <p className="text-xs text-gray-400">기본 타입 설정 화면을 먼저 이용해 주세요.</p>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">로그인 버튼 색상</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.buttonColor}
                  onChange={(e) => onColorChange('buttonColor', e.target.value)}
                  className="h-9 w-9 cursor-pointer rounded border border-gray-200 p-0.5"
                />
                <span className="font-mono text-xs text-gray-500">{settings.buttonColor}</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">배경 색상</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.bgColor}
                  onChange={(e) => onColorChange('bgColor', e.target.value)}
                  className="h-9 w-9 cursor-pointer rounded border border-gray-200 p-0.5"
                />
                <span className="font-mono text-xs text-gray-500">{settings.bgColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">푸터 정보</label>
            <div className="grid grid-cols-2 gap-3">
              {FOOTER_FIELD_DEFS.map((field) => (
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
            상단 로고 스택, 탭 정렬, 입력 필드 로직 등은 고정값으로 이 화면에서 변경할 수 없습니다.
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onReset}
              className="flex-1 rounded-md border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              초기화
            </button>
            <button
              type="button"
              className="flex-1 rounded-md bg-gray-900 py-2.5 text-sm font-semibold text-white"
            >
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
