import { MockProduct } from './mockProducts';

export type BannerPosition = 'top' | 'middle' | 'bottom';
export type BlockType = 'text' | 'image' | 'link';

export interface TextBlock {
  id: string;
  type: 'text';
  text: string;
}

export interface ImageBlock {
  id: string;
  type: 'image';
  imageDataUrl: string | null;
  imageFileName: string | null;
}

export interface LinkBlock {
  id: string;
  type: 'link';
  label: string;
  url: string;
}

export type FreeBlock = TextBlock | ImageBlock | LinkBlock;

export interface CustomFooterFields {
  email: string;
  phone: string;
  address: string;
  privacyOfficer: string;
  ceo: string;
  bizNumber: string;
}

export interface CustomLoginScreenSettingsState {
  logoDataUrl: string | null;
  logoFileName: string | null;
  bannerEnabled: boolean;
  bannerPosition: BannerPosition;
  bannerImageDataUrl: string | null;
  bannerImageFileName: string | null;
  bannerLinkUrl: string;
  subtitle: string;
  bgColor: string;
  showRecommended: boolean;
  selectedProducts: MockProduct[];
  blocks: FreeBlock[];
  footer: CustomFooterFields;
}

export const DEFAULT_CUSTOM_LOGIN_SCREEN_SETTINGS: CustomLoginScreenSettingsState = {
  logoDataUrl: null,
  logoFileName: null,
  bannerEnabled: true,
  bannerPosition: 'top',
  bannerImageDataUrl: null,
  bannerImageFileName: null,
  bannerLinkUrl: '',
  subtitle: 'My Shop 판매자센터',
  bgColor: '#ffffff',
  showRecommended: true,
  selectedProducts: [],
  blocks: [],
  footer: {
    email: 'help@company.com',
    phone: '02-000-0000',
    address: '서울 OO구 OO로 00',
    privacyOfficer: '홍길동',
    ceo: '김대표',
    bizNumber: '000-00-00000',
  },
};

export const CUSTOM_FOOTER_FIELD_DEFS: { key: keyof CustomFooterFields; label: string }[] = [
  { key: 'email', label: '이메일' },
  { key: 'phone', label: '전화번호' },
  { key: 'address', label: '주소' },
  { key: 'privacyOfficer', label: '개인정보책임자' },
  { key: 'ceo', label: '대표이사' },
  { key: 'bizNumber', label: '사업자번호' },
];

export const BANNER_POSITIONS: { key: BannerPosition; label: string }[] = [
  { key: 'top', label: '상단' },
  { key: 'middle', label: '중단' },
  { key: 'bottom', label: '하단' },
];

export const BLOCK_TYPE_DEFS: { key: BlockType; label: string }[] = [
  { key: 'text', label: '텍스트 블록' },
  { key: 'image', label: '이미지·배너 블록' },
  { key: 'link', label: '링크 버튼 블록' },
];

let blockIdCounter = 0;
export function nextBlockId(): string {
  blockIdCounter += 1;
  return `block-${Date.now().toString(36)}-${blockIdCounter}`;
}
