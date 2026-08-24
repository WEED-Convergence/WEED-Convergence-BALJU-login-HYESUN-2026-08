export interface MockProduct {
  id: string;
  name: string;
  code: string;
  supplier: string;
  price: number;
}

export const MOCK_PRODUCTS: MockProduct[] = [
  { id: 'p1', name: '유기농 원두커피 1kg', code: 'PB-00123', supplier: '그린빈상사', price: 18900 },
  { id: 'p2', name: '수제 딸기잼 300g', code: 'PB-00124', supplier: '푸드마루', price: 8900 },
  { id: 'p3', name: '프리미엄 올리브오일 500ml', code: 'PB-00125', supplier: '지중해상사', price: 15900 },
  { id: 'p4', name: '통밀 그래놀라 400g', code: 'PB-00126', supplier: '헬시푸드', price: 9900 },
  { id: 'p5', name: '견과류 모음 선물세트', code: 'PB-00127', supplier: '넛츠팜', price: 32900 },
  { id: 'p6', name: '전통 된장 1kg', code: 'PB-00128', supplier: '농협식품', price: 12900 },
  { id: 'p7', name: '유자차 500g', code: 'PB-00129', supplier: '남해특산', price: 11900 },
  { id: 'p8', name: '수제 그릭요거트 4개입', code: 'PB-00130', supplier: '푸드마루', price: 13900 },
];
