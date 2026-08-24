import TopBar from '@/components/login/TopBar';
import LogoStack from '@/components/login/LogoStack';
import AuthTabs from '@/components/login/AuthTabs';
import SignupCTA from '@/components/login/SignupCTA';
import Footer from '@/components/login/Footer';
import { CustomLoginScreenSettingsState, FreeBlock } from './customLoginScreenDefaults';

const ACCENT_COLOR = '#1F2937';

interface Props {
  settings: CustomLoginScreenSettingsState;
}

function BannerPlaceholder() {
  return (
    <div className="px-5 pt-4">
      <div className="flex h-16 items-center justify-center rounded-md bg-gray-100 text-[10px] text-gray-400">
        배너 이미지 영역
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
    return block.imageDataUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={block.imageDataUrl} alt="" className="w-full rounded-md object-cover" />
    ) : (
      <div className="flex h-16 items-center justify-center rounded-md bg-gray-100 text-[10px] text-gray-400">
        이미지 영역
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
  const footerText = [
    settings.footer.email,
    settings.footer.phone,
    settings.footer.address,
    `개인정보책임자: ${settings.footer.privacyOfficer}`,
    `대표이사: ${settings.footer.ceo}`,
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

        {settings.bannerEnabled && settings.bannerPosition === 'top' && <BannerPlaceholder />}

        <div className="px-5 pt-3">
          <p className="rounded-md bg-gray-50 py-2 text-center text-xs font-semibold text-gray-700">
            {settings.subtitle}
          </p>
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
            style={{ backgroundColor: ACCENT_COLOR }}
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

        <SignupCTA />

        {settings.bannerEnabled && settings.bannerPosition === 'middle' && <BannerPlaceholder />}

        {settings.showRecommended && (
          <div className="px-5 pt-5">
            <p className="mb-2 text-[11px] font-semibold text-gray-500">추천 상품</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-1">
                  <div className="aspect-square rounded-md bg-gray-100" />
                  <div className="h-1.5 w-3/4 rounded-full bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        )}

        {settings.blocks.length > 0 && (
          <div className="space-y-2.5 px-5 pt-5">
            {settings.blocks.map((block) => (
              <BlockView key={block.id} block={block} />
            ))}
          </div>
        )}

        {settings.bannerEnabled && settings.bannerPosition === 'bottom' && <BannerPlaceholder />}

        <div className="mt-6">
          <Footer dark text={footerText} />
        </div>
      </div>
    </div>
  );
}
