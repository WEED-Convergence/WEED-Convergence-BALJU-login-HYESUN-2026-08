import PhoneFrame from '@/components/login/PhoneFrame';
import TopBar from '@/components/login/TopBar';
import LogoStack from '@/components/login/LogoStack';
import AuthTabs from '@/components/login/AuthTabs';
import LoginFields from '@/components/login/LoginFields';
import SignupCTA from '@/components/login/SignupCTA';
import Footer from '@/components/login/Footer';
import CustomZone from '@/components/login/CustomZone';

const ACCENT_COLOR = '#2F6FED';

export default function LoginBasicPage() {
  return (
    <PhoneFrame caption="※ 배경 색상/이미지는 화면 전체에 적용되며 고객사별로 커스텀할 수 있습니다.">
      <TopBar />
      <LogoStack />

      <div className="flex items-center justify-center gap-2 px-6 pb-5">
        <span className="text-sm font-semibold text-gray-700">Welcome to</span>
        <CustomZone label="커스텀 · 고객사 로고" className="flex h-7 w-20 items-center justify-center">
          <span className="text-[10px] text-[#8B5CF6]">로고 영역</span>
        </CustomZone>
      </div>

      <AuthTabs />
      <LoginFields accentColor={ACCENT_COLOR} />
      <SignupCTA />
      <div className="mt-8 px-6">
        <CustomZone label="커스텀 · 푸터 텍스트" className="overflow-hidden p-0">
          <Footer text="발주모아 파트너스 ㅣ 대표: 홍길동 ㅣ 서울특별시 강남구 테헤란로 000 ㅣ 사업자등록번호: 000-00-00000 ㅣ 고객센터: 1588-0000" />
        </CustomZone>
      </div>
    </PhoneFrame>
  );
}
