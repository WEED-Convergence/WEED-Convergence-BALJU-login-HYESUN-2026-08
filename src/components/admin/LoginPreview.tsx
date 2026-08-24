import TopBar from '@/components/login/TopBar';
import LogoStack from '@/components/login/LogoStack';
import AuthTabs from '@/components/login/AuthTabs';
import Footer from '@/components/login/Footer';
import { LoginScreenSettingsState } from './loginScreenDefaults';

interface Props {
  settings: LoginScreenSettingsState;
}

export default function LoginPreview({ settings }: Props) {
  const footerText = [
    settings.footer.email,
    settings.footer.phone,
    settings.footer.address,
    `개인정보책임자: ${settings.footer.privacyOfficer}`,
    `대표자: ${settings.footer.ceo}`,
    `사업자번호: ${settings.footer.bizNumber}`,
  ].join(' ㅣ ');

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

        <div className="flex items-center justify-center gap-2 px-5 pb-4">
          <span className="text-xs font-semibold text-gray-700">Welcome to</span>
          {settings.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logoDataUrl} alt="고객사 로고" className="h-6 max-w-[72px] object-contain" />
          ) : (
            <span className="flex h-6 w-16 items-center justify-center rounded border border-dashed border-gray-300 text-[9px] text-gray-300">
              로고
            </span>
          )}
        </div>

        <AuthTabs />

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

        <div className="mt-5">
          <Footer text={footerText} />
        </div>
      </div>
    </div>
  );
}
