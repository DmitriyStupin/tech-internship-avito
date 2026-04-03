import axios from "axios";
import type {GetAdsResponse} from "../types/GetAdsResponse.ts";

const api = axios.create({
  baseURL: 'http://localhost:8080'
})

export const getAds = (): Promise<{ data: GetAdsResponse }> => {
  return api.get('/items')
}