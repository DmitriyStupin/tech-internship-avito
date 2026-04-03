import type {AdItem} from "./AdItem.ts";

export type GetAdsResponse = {
  items: AdItem[];
  total: number
}