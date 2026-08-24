import CustomZone from './CustomZone';

interface Props {
  accentColor: string;
}

export default function LoginFields({ accentColor }: Props) {
  return (
    <div className="px-6 pt-5">
      <div className="space-y-2.5">
        <input
          type="text"
          placeholder="아이디"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-300 focus:outline-none"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-300 focus:outline-none"
        />
      </div>

      <CustomZone label="커스텀 · 버튼 색상" className="mt-4 p-1">
        <button
          type="button"
          style={{ backgroundColor: accentColor }}
          className="w-full rounded-md py-3 text-sm font-bold text-white"
        >
          로그인
        </button>
      </CustomZone>

      <label className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" />
        아이디 저장하기
      </label>

      <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-400">
        <button type="button" className="hover:text-gray-600">아이디 찾기</button>
        <span className="text-gray-200">|</span>
        <button type="button" className="hover:text-gray-600">비밀번호 찾기</button>
      </div>
    </div>
  );
}
