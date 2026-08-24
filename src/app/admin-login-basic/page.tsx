'use client';

import { useState } from 'react';
import AdminGNB from '@/components/admin/GNB';
import AdminLNB from '@/components/admin/LNB';
import LoginScreenSettingsPanel from '@/components/admin/LoginScreenSettingsPanel';
import LoginPreview from '@/components/admin/LoginPreview';
import {
  DEFAULT_LOGIN_SCREEN_SETTINGS,
  LoginScreenFooterFields,
  LoginScreenSettingsState,
} from '@/components/admin/loginScreenDefaults';

type Tab = 'basic' | 'custom';

export default function AdminLoginBasicPage() {
  const [tab, setTab] = useState<Tab>('basic');
  const [settings, setSettings] = useState<LoginScreenSettingsState>(DEFAULT_LOGIN_SCREEN_SETTINGS);

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

  const handleColorChange = (key: 'buttonColor' | 'bgColor', value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleFooterChange = (key: keyof LoginScreenFooterFields, value: string) => {
    setSettings((prev) => ({ ...prev, footer: { ...prev.footer, [key]: value } }));
  };

  const handleReset = () => setSettings(DEFAULT_LOGIN_SCREEN_SETTINGS);

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
              <LoginScreenSettingsPanel
                tab={tab}
                onTabChange={setTab}
                settings={settings}
                onLogoFile={handleLogoFile}
                onColorChange={handleColorChange}
                onFooterChange={handleFooterChange}
                onReset={handleReset}
              />
            </div>
            <div className="w-[320px] shrink-0">
              <LoginPreview settings={settings} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
