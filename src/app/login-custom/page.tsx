import PhoneFrame from '@/components/login/PhoneFrame';
import TopBar from '@/components/login/TopBar';
import LogoStack from '@/components/login/LogoStack';
import AuthTabs from '@/components/login/AuthTabs';
import LoginFields from '@/components/login/LoginFields';
import SignupCTA from '@/components/login/SignupCTA';
import Footer from '@/components/login/Footer';
import CustomZone from '@/components/login/CustomZone';
import BannerZone from '@/components/login/BannerZone';
import SubtitleZone from '@/components/login/SubtitleZone';
import RecommendedProducts from '@/components/login/RecommendedProducts';
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

      <AuthTabs />
      <LoginFields accentColor={ACCENT_COLOR} />
      <SignupCTA />
      <RecommendedProducts />
      <FreeBlockZone />

      <div className="px-6 pt-6">
        <CustomZone label="커스텀 · 푸터 색상/레이아웃 (필수 정보 유지)" className="overflow-hidden p-0">
          <Footer
            dark
            text="발주모아 파트너스 ㅣ My Shop 주식회사 ㅣ 대표: 김철수 ㅣ 사업자등록번호: 000-00-00000 ㅣ 고객센터: 1544-0000"
          />
        </CustomZone>
      </div>
    </PhoneFrame>
  );
}
