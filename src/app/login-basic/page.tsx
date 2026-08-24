import PhoneFrame from '@/components/login/PhoneFrame';
import TopBar from '@/components/login/TopBar';
import LogoStack from '@/components/login/LogoStack';
import AuthTabs from '@/components/login/AuthTabs';
import LoginFields from '@/components/login/LoginFields';
import SignupCTA from '@/components/login/SignupCTA';
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
      <div className="mt-8 px-6 pb-6">
        <CustomZone label="커스텀 · 푸터 텍스트" className="space-y-1 px-4 py-4 text-[10px] leading-relaxed text-gray-500">
          <p>e-mail : help@baljumoa.com&nbsp;&nbsp;&nbsp;Tel : 1588-0000</p>
          <p>주소 : 서울특별시 강남구 테헤란로 000&nbsp;&nbsp;개인정보책임자 : 김보호</p>
          <p>
            대표이사 : 홍길동&nbsp;&nbsp;&nbsp;사업자번호 : 000-00-00000&nbsp;
            <span className="text-gray-400">[사업자정보확인]</span>
          </p>
        </CustomZone>
      </div>
    </PhoneFrame>
  );
}
