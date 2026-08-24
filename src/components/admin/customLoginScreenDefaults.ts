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
  linkUrl: string;
}

export interface LinkBlock {
  id: string;
  type: 'link';
  label: string;
  url: string;
}

export type FreeBlock = TextBlock | ImageBlock | LinkBlock;

export interface BannerItem {
  id: string;
  imageDataUrl: string | null;
  imageFileName: string | null;
  linkUrl: string;
}

export const MAX_BANNERS = 3;

export interface CustomLoginScreenSettingsState {
  logoDataUrl: string | null;
  logoFileName: string | null;
  buttonColor: string;
  bannerEnabled: boolean;
  bannerPosition: BannerPosition;
  banners: BannerItem[];
  subtitle: string;
  bgColor: string;
  blocks: FreeBlock[];
}

export const DEFAULT_CUSTOM_LOGIN_SCREEN_SETTINGS: CustomLoginScreenSettingsState = {
  logoDataUrl: null,
  logoFileName: null,
  buttonColor: '#1F2937',
  bannerEnabled: false,
  bannerPosition: 'top',
  banners: [],
  subtitle: 'My Shop 판매자센터',
  bgColor: '#ffffff',
  blocks: [],
};

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

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

export function nextBlockId(): string {
  return nextId('block');
}

export function nextBannerId(): string {
  return nextId('banner');
}
