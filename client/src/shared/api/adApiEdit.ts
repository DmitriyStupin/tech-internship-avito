import type {ItemUpdateIn} from "../types/ItemUpdateIn.ts";
import type {ItemDetails} from "../types/ItemDetails.ts";
import {api} from "./api.ts";

export const updateAdById = (id: number, data: ItemUpdateIn): Promise<{ data: ItemDetails }> => {
  return api.put(`/items/${id}`, data)
}