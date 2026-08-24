const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 12L12 3l9 9" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  manual: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  store: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a2 2 0 002 2 2 2 0 002-2 2 2 0 002 2 2 2 0 002-2 2 2 0 002 2 2 2 0 002-2 2 2 0 002 2 2 2 0 002-2" />
      <path d="M5 11v9h14v-9" />
    </svg>
  ),
  banner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M21 15l-5-5-9 9" />
    </svg>
  ),
  login: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: '홈', icon: ICONS.home },
  { label: '매뉴얼', icon: ICONS.manual, badge: true },
  { label: '판매사 메인 등록', icon: ICONS.store },
  { label: '배너 관리', icon: ICONS.banner },
  { label: '로그인 화면 관리', icon: ICONS.login, active: true, isNew: true },
];

export default function AdminLNB() {
  return (
    <aside className="w-[200px] shrink-0 overflow-y-auto bg-[#1e2530] border-r border-white/5">
      <div className="py-5">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) =>
            item.badge ? (
              <li key={item.label} className="px-5 py-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                  {item.icon}
                  {item.label}
                </span>
              </li>
            ) : (
              <li key={item.label}>
                <div
                  className={`relative flex items-center gap-3 px-5 py-2.5 text-sm font-medium ${
                    item.active ? 'bg-[#4DB87A]/10 text-white' : 'text-gray-400'
                  }`}
                >
                  {item.active && (
                    <span className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-[#4DB87A]" />
                  )}
                  {item.icon}
                  <span>{item.label}</span>
                  {item.isNew && (
                    <span className="ml-auto rounded bg-[#4DB87A] px-1.5 py-0.5 text-[9px] font-bold text-white">
                      NEW
                    </span>
                  )}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
}
