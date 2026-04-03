import type {GetAdsResponse} from "../types/GetAdsResponse.ts";
import {api} from "./api.ts";

export const getAds = (): Promise<{ data: GetAdsResponse }> => {
  return api.get('/items')
}