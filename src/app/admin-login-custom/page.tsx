'use client';

import { useState } from 'react';
import AdminGNB from '@/components/admin/GNB';
import AdminLNB from '@/components/admin/LNB';
import CustomLoginScreenSettingsPanel from '@/components/admin/CustomLoginScreenSettingsPanel';
import CustomLoginPreview from '@/components/admin/CustomLoginPreview';
import {
  BannerPosition,
  CustomLoginScreenSettingsState,
  DEFAULT_CUSTOM_LOGIN_SCREEN_SETTINGS,
  FreeBlock,
} from '@/components/admin/customLoginScreenDefaults';

type Tab = 'basic' | 'custom';

export default function AdminLoginCustomPage() {
  const [tab, setTab] = useState<Tab>('custom');
  const [settings, setSettings] = useState<CustomLoginScreenSettingsState>(
    DEFAULT_CUSTOM_LOGIN_SCREEN_SETTINGS
  );

  const handleLogoFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSettings((prev) => ({
        ...prev,
        logoDataUrl: reader.result as string,
        logoFileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleButtonColorChange = (value: string) => {
    setSettings((prev) => ({ ...prev, buttonColor: value }));
  };

  const handleBannerToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, bannerEnabled: enabled }));
  };

  const handleBannerPosition = (position: BannerPosition) => {
    setSettings((prev) => ({ ...prev, bannerPosition: position }));
  };

  const handleBannerImageFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSettings((prev) => ({
        ...prev,
        bannerImageDataUrl: reader.result as string,
        bannerImageFileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleBannerLinkChange = (value: string) => {
    setSettings((prev) => ({ ...prev, bannerLinkUrl: value }));
  };

  const handleSubtitleChange = (value: string) => {
    setSettings((prev) => ({ ...prev, subtitle: value }));
  };

  const handleBgColorChange = (value: string) => {
    setSettings((prev) => ({ ...prev, bgColor: value }));
  };

  const handleAddBlock = (block: FreeBlock) => {
    setSettings((prev) => ({ ...prev, blocks: [...prev.blocks, block] }));
  };

  const handleRemoveBlock = (id: string) => {
    setSettings((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
  };

  const handleReset = () => setSettings(DEFAULT_CUSTOM_LOGIN_SCREEN_SETTINGS);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f4f5f7]">
      <AdminGNB />
      <div className="flex flex-1 overflow-hidden">
        <AdminLNB />
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <h1 className="text-base font-bold text-gray-900">로그인 화면 관리</h1>
          </div>

          <div className="flex flex-wrap gap-6 p-6">
            <div className="min-w-[360px] flex-1">
              <CustomLoginScreenSettingsPanel
                tab={tab}
                onTabChange={setTab}
                settings={settings}
                onLogoFile={handleLogoFile}
                onButtonColorChange={handleButtonColorChange}
                onBannerToggle={handleBannerToggle}
                onBannerPosition={handleBannerPosition}
                onBannerImageFile={handleBannerImageFile}
                onBannerLinkChange={handleBannerLinkChange}
                onSubtitleChange={handleSubtitleChange}
                onBgColorChange={handleBgColorChange}
                onAddBlock={handleAddBlock}
                onRemoveBlock={handleRemoveBlock}
                onReset={handleReset}
              />
            </div>
            <div className="w-[320px] shrink-0">
              <CustomLoginPreview settings={settings} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
