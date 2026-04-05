import type { GetAdsResponse } from "../types/GetAdsResponse.ts";
import { api } from "./api.ts";

type GetAdsParams = {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: boolean;
  categories?: string;
  sortColumn?: "title" | "createdAt";
  sortDirection?: "asc" | "desc";
};

export const getAds = (
  params?: GetAdsParams,
): Promise<{ data: GetAdsResponse }> => {
  const query = new URLSearchParams();

  if (params?.q) query.append("q", params.q);
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.skip) query.append("skip", params.skip.toString());
  if (params?.needsRevision) query.append("needsRevision", "true");
  if (params?.categories) query.append("categories", params.categories);
  if (params?.sortColumn) query.append("sortColumn", params.sortColumn);
  if (params?.sortDirection)
    query.append("sortDirection", params.sortDirection);

  const url = "/items" + (query.toString() ? `?${query.toString()}` : "");

  return api.get(url);
};
