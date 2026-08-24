'use client';

import { useState } from 'react';

interface Screen {
  id: string;
  name: string;
  href: string;
  description: string;
  customizable: string[];
  fixed: string[];
}

const SCREENS: Screen[] = [
  {
    id: 'login-basic',
    name: '로그인 - 기본 타입',
    href: '/login-basic',
    description:
      '파트너스 셀러 로그인 화면의 기본 커스텀 타입입니다. 최소한의 요소만 고객사 브랜드에 맞게 변경할 수 있으며, 그 외 레이아웃과 문구는 고정값으로 제공됩니다.',
    customizable: [
      '"Welcome to" 문구 옆 고객사 로고 삽입 영역을 배치할 수 있습니다.',
      '로그인 버튼 색상을 고객사 브랜드 컬러로 변경할 수 있습니다.',
      '배경 색상 또는 이미지를 지정할 수 있습니다.',
      '푸터의 주소·연락처 등 텍스트를 고객사 정보로 교체할 수 있습니다.',
    ],
    fixed: [
      '상단 "발주모아 Partners" 로고 스택은 커스텀 없이 고정 노출됩니다.',
      '판매사/관리자 탭은 중앙 정렬로 고정되며, 정렬 방식은 변경할 수 없습니다.',
      '전체 레이아웃 구조와 안내 문구는 고정값으로 유지됩니다.',
      '아이디/비밀번호 입력 필드와 유효성 검사 구조는 기존과 동일하게 유지됩니다.',
      '아이디 찾기·비밀번호 찾기, 입점신청 안내 등 기존 기능은 동일하게 제공됩니다.',
    ],
  },
  {
    id: 'admin-login-basic',
    name: '기본 타입 관리자',
    href: '/admin-login-basic',
    description:
      '파트너스 어드민에서 "로그인 - 기본 타입" 화면의 브랜드 요소를 설정하는 관리자 화면입니다. 좌측 설정 패널에서 값을 변경하면 우측 미리보기에 실시간으로 반영됩니다.',
    customizable: [
      '고객사 로고를 이미지 파일로 첨부하면 미리보기에 즉시 반영됩니다.',
      '로그인 버튼 색상을 컬러 피커로 변경하면 미리보기에 즉시 반영됩니다.',
      '배경 색상을 컬러 피커로 변경하면 미리보기에 즉시 반영됩니다.',
      '이메일·전화번호·주소·개인정보책임자·대표이사·사업자번호 등 푸터 6개 항목을 각각 입력하면 미리보기 하단에 즉시 반영됩니다.',
      '초기화 버튼을 클릭하면 모든 입력값과 미리보기가 기본값으로 되돌아갑니다.',
    ],
    fixed: [
      '상단 GNB의 HOME 외 메뉴(환경설정·상품관리·파트너·주문관리·매출관리·정산)는 시각적으로만 존재하며 클릭 동작이 없습니다.',
      '좌측 LNB의 홈·매뉴얼·판매사 메인 등록·배너 관리 메뉴는 클릭 동작이 없습니다.',
      '미리보기의 로고 스택, 탭 정렬, 입력 필드 로직 등은 고정값으로 이 화면에서 변경할 수 없습니다.',
      '커스텀 타입 탭은 이번 화면 범위에서 제외되며 "준비 중" 상태로 표시됩니다.',
      '저장 버튼은 화면상에만 존재하며 실제 저장·DB 연동은 구현되지 않습니다.',
    ],
  },
  {
    id: 'login-custom',
    name: '로그인 - 커스텀 타입',
    href: '/login-custom',
    description:
      '고객사가 자사 브랜드 경험을 폭넓게 구성할 수 있도록 지원하는 확장형 커스텀 타입입니다. 로고, 배너, 서브 타이틀, 추천 상품, 자유 블록 등 다양한 영역을 자유롭게 구성할 수 있습니다.',
    customizable: [
      '로고 삽입 영역을 자유롭게 배치할 수 있습니다.',
      '배너 영역의 노출 여부를 선택할 수 있으며, 상단/중단/하단 중 위치를 지정할 수 있습니다.',
      '"My Shop 판매자센터" 등 서브 타이틀 텍스트를 자유롭게 교체할 수 있습니다.',
      '배경 색상 또는 이미지를 자유롭게 지정할 수 있습니다.',
      '하단 추천 상품 영역의 노출 여부를 선택할 수 있습니다.',
      '"블록 추가" 클릭 시 (a) 사전 정의된 블록(이미지 배너·텍스트·상품 노출) 중 선택하거나 (b) HTML/이미지를 직접 삽입하는 임베드 방식을 선택하여 자유 블록을 구성할 수 있습니다.',
      '푸터의 색상과 레이아웃을 자유롭게 구성할 수 있습니다. (필수 정보 항목은 유지)',
    ],
    fixed: [
      '상단 "발주모아 Partners" 로고 스택은 커스텀 없이 고정 노출됩니다.',
      '판매사/관리자 탭 전환 로직은 기존과 동일하게 유지됩니다.',
      '아이디/비밀번호 입력 필드와 유효성 검사 구조는 기존과 동일하게 유지됩니다.',
      '아이디 저장하기, 아이디·비밀번호 찾기, 입점신청 안내 등 기존 기능은 동일하게 제공됩니다.',
      '푸터의 사업자 정보 등 필수 항목은 레이아웃이 자유롭더라도 반드시 유지되어야 합니다.',
    ],
  },
  {
    id: 'admin-login-custom',
    name: '커스텀 타입 관리자',
    href: '/admin-login-custom',
    description:
      '파트너스 어드민에서 "로그인 - 커스텀 타입" 화면의 브랜드 요소를 설정하는 관리자 화면입니다. 좌측 설정 패널에서 값을 변경하면 우측 미리보기에 실시간으로 반영됩니다.',
    customizable: [
      '고객사 로고를 이미지 파일로 첨부하면 미리보기에 즉시 반영됩니다.',
      '배너 노출 여부와 상단/중단/하단 위치를 설정하면 미리보기에 즉시 반영됩니다.',
      '서브타이틀 텍스트를 입력하면 미리보기에 즉시 반영됩니다.',
      '배경 색상을 컬러 피커로 변경하면 미리보기에 즉시 반영됩니다.',
      '추천 상품 노출 영역을 켜고 끄면 미리보기에 즉시 반영됩니다.',
      '"블록 추가"에서 텍스트·이미지·배너·링크 버튼 블록을 개수 제한 없이 추가하거나 삭제할 수 있으며, 추가한 순서대로 미리보기 하단에 반영됩니다.',
      '이메일·전화번호·주소·개인정보책임자·대표이사·사업자번호 등 푸터 6개 항목을 각각 입력하면 미리보기 하단에 즉시 반영됩니다.',
      '초기화 버튼을 클릭하면 모든 입력값과 추가한 블록이 기본값으로 되돌아갑니다.',
    ],
    fixed: [
      '상단 GNB의 HOME 외 메뉴(환경설정·상품관리·파트너·주문관리·매출관리·정산)는 시각적으로만 존재하며 클릭 동작이 없습니다.',
      '좌측 LNB의 홈·매뉴얼·판매사 메인 등록·배너 관리 메뉴는 클릭 동작이 없습니다.',
      '미리보기의 로고 스택, 판매사/관리자 탭, 아이디·비밀번호 입력 로직 등은 고정값으로 이 화면에서 변경할 수 없습니다.',
      '기본 타입 탭은 이번 화면 범위에서 제외되며 "준비 중" 상태로 표시됩니다.',
      '저장 버튼은 화면상에만 존재하며 실제 저장·DB 연동은 구현되지 않습니다.',
    ],
  },
];

export default function ScreenIndex() {
  const [selectedId, setSelectedId] = useState<string>(SCREENS[0].id);
  const selected = SCREENS.find((s) => s.id === selectedId)!;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f8]">
      {/* ── 좌측: 화면 목록 ── */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-100 px-4 py-4">
          <h1 className="text-xs font-black uppercase tracking-widest text-gray-800">화면 목록</h1>
          <p className="mt-0.5 text-[10px] text-gray-400">화면을 선택하면 가운데에서 확인합니다.</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#2F6FED]">
            파트너스 셀러 로그인
          </p>
          <ul>
            {SCREENS.map((screen) => {
              const isActive = screen.id === selectedId;
              return (
                <li key={screen.id}>
                  <button
                    onClick={() => setSelectedId(screen.id)}
                    className={`relative w-full px-4 py-2.5 text-left text-sm transition-all ${
                      isActive
                        ? 'bg-[#eef4ff] font-semibold text-[#1d4fbf]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-[#2F6FED]" />
                    )}
                    <span className="leading-snug text-[13px]">{screen.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ── 중앙: 선택된 화면 목업 (iframe) ── */}
      <div className="flex flex-1 flex-col overflow-hidden border-r border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F6FED]">
              파트너스 셀러 로그인
            </span>
            <span className="text-gray-300">·</span>
            <h2 className="text-sm font-bold text-gray-900 leading-snug">{selected.name}</h2>
          </div>
          <a
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-[#2F6FED] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1d4fbf] active:scale-95 transition-all"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z" />
              <path d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z" />
            </svg>
            새 탭에서 열기
          </a>
        </div>
        <iframe
          key={selected.href}
          src={selected.href}
          className="flex-1 w-full border-none"
          title={selected.name}
        />
      </div>

      {/* ── 우측: 화면설명 ── */}
      <aside className="w-80 shrink-0 bg-white flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">화면 설명</h3>
          <p className="mt-0.5 text-[10px] text-gray-400">선택한 화면의 커스텀 정책 안내</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <p className="text-sm leading-relaxed text-gray-600">{selected.description}</p>

          <div>
            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8B5CF6]">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border-2 border-dashed border-[#8B5CF6]" />
              커스텀 가능 항목
            </p>
            <ul className="divide-y divide-gray-100">
              {selected.customizable.map((item, i) => (
                <li key={i} className="py-3 text-sm leading-relaxed text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              고정 유지 항목
            </p>
            <ul className="divide-y divide-gray-100">
              {selected.fixed.map((item, i) => (
                <li key={i} className="py-3 text-sm leading-relaxed text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
