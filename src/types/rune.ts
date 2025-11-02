export interface Rune {
  name: string;
  equipment: '무기' | '방어구' | '악세사리' | '엠블럼';
  grade: '전설' | '신화';
  job?: string; // 직업 전용 룬인 경우
  effect: string;
  description?: string;
  season?: number; // 1~5 시즌
}
