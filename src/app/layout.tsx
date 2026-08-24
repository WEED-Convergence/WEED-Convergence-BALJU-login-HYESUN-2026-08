import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '발주모아 파트너스 로그인 커스텀 프로토타입',
  description: '파트너스 셀러 로그인/회원가입 커스텀 정적 프로토타입',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
