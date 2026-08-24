export interface LoginScreenFooterFields {
  email: string;
  phone: string;
  address: string;
  privacyOfficer: string;
  ceo: string;
  bizNumber: string;
}

export interface LoginScreenSettingsState {
  logoDataUrl: string | null;
  logoFileName: string | null;
  buttonColor: string;
  bgColor: string;
  footer: LoginScreenFooterFields;
}

export const DEFAULT_LOGIN_SCREEN_SETTINGS: LoginScreenSettingsState = {
  logoDataUrl: null,
  logoFileName: null,
  buttonColor: '#1a8f5a',
  bgColor: '#f7f7f7',
  footer: {
    email: 'help@company.com',
    phone: '02-000-0000',
    address: '서울 OO구 OO로 00',
    privacyOfficer: '홍길동',
    ceo: '김대표',
    bizNumber: '000-00-00000',
  },
};

export const FOOTER_FIELD_DEFS: { key: keyof LoginScreenFooterFields; label: string }[] = [
  { key: 'email', label: '이메일' },
  { key: 'phone', label: '전화번호' },
  { key: 'address', label: '주소' },
  { key: 'privacyOfficer', label: '개인정보책임자' },
  { key: 'ceo', label: '대표이사' },
  { key: 'bizNumber', label: '사업자번호' },
];
