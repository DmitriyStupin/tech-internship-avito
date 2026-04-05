import { api } from "./api.ts";
import type { GetAdResponse } from "../types/GetAdResponse.ts";

export const getAdById = (id: number): Promise<{ data: GetAdResponse }> => {
  return api.get(`/items/${id}`);
};
