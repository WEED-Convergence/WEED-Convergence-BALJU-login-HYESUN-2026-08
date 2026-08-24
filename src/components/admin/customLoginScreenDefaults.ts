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

export interface CustomLoginScreenSettingsState {
  logoDataUrl: string | null;
  logoFileName: string | null;
  buttonColor: string;
  bannerEnabled: boolean;
  bannerPosition: BannerPosition;
  bannerImageDataUrl: string | null;
  bannerImageFileName: string | null;
  bannerLinkUrl: string;
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
  bannerImageDataUrl: null,
  bannerImageFileName: null,
  bannerLinkUrl: '',
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

let blockIdCounter = 0;
export function nextBlockId(): string {
  blockIdCounter += 1;
  return `block-${Date.now().toString(36)}-${blockIdCounter}`;
}
