import AuthTabs from '@/components/login/AuthTabs';

const ACCENT_COLOR = '#1a8f5a';

export default function StaticBasicTypePreview() {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 px-5 pt-4 pb-4">
        <span className="text-xs font-semibold text-gray-700">Welcome to</span>
        <span className="flex h-6 w-16 items-center justify-center rounded bg-gray-100 text-[9px] text-gray-400">
          로고
        </span>
      </div>

      <AuthTabs />

      <div className="px-5 pt-4">
        <div className="space-y-2">
          <input
            disabled
            placeholder="아이디 입력"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-400"
          />
          <div className="relative">
            <input
              disabled
              placeholder="비밀번호 입력"
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 pr-9 text-xs text-gray-400"
            />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M3 3l18 18" />
            </svg>
          </div>
        </div>

        <button
          type="button"
          style={{ backgroundColor: ACCENT_COLOR }}
          className="mt-3 w-full rounded-md py-2.5 text-xs font-bold text-white"
        >
          로그인
        </button>

        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" disabled className="h-3 w-3 rounded border-gray-300" />
            아이디 저장하기
          </label>
          <span className="text-gray-400">아이디 / 비밀번호 찾기</span>
        </div>
      </div>

      <p className="px-5 pt-6 text-center text-[11px] leading-relaxed text-gray-500">
        판매사 회원가입 후 발주를 시작하세요.{' '}
        <span className="cursor-pointer font-semibold text-[#1a8f5a] underline underline-offset-2">
          입점 신청하기
        </span>
      </p>

      <div className="pb-6" />
    </div>
  );
}
