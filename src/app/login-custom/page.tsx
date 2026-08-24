import PhoneFrame from '@/components/login/PhoneFrame';
import TopBar from '@/components/login/TopBar';
import LogoStack from '@/components/login/LogoStack';
import LoginFields from '@/components/login/LoginFields';
import SignupCTA from '@/components/login/SignupCTA';
import CustomZone from '@/components/login/CustomZone';
import BannerZone from '@/components/login/BannerZone';
import SubtitleZone from '@/components/login/SubtitleZone';
import FreeBlockZone from '@/components/login/FreeBlockZone';

const ACCENT_COLOR = '#1F2937';

export default function LoginCustomPage() {
  return (
    <PhoneFrame caption="※ 배경 색상/이미지는 화면 전체에 적용되며 고객사별로 자유롭게 커스텀할 수 있습니다.">
      <TopBar />
      <LogoStack />

      <div className="px-6 pb-4">
        <CustomZone label="커스텀 · 로고 삽입 영역" className="flex h-12 items-center justify-center">
          <span className="text-[11px] text-[#8B5CF6]">고객사 로고 영역</span>
        </CustomZone>
      </div>

      <BannerZone />
      <SubtitleZone />

      <LoginFields accentColor={ACCENT_COLOR} />
      <SignupCTA />
      <FreeBlockZone />

      <div className="pb-6" />
    </PhoneFrame>
  );
}
