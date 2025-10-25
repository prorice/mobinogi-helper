export interface Exchange {
  region: string;
  npc: string;
  need: string;
  needQty: number;
  get: string;
  getQty: number;
  limit: string;
  maxCount: number;
  note?: string;
}
