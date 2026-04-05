import { create } from "zustand";
import type { AdItem } from "../types/AdItem.ts";
import { getAds } from "../api/adsApi.ts";

type AdsStore = {
  ads: AdItem[];
  total: number;
  loading: boolean;
  searchQuery: string;
  selectedCategories: string[];
  needsRevisionOnly: boolean;
  sortOption: string;
  currentPage: number;
  gridView: boolean;
  pageSize: number;
  fetchAds: () => Promise<void>;
  setSearchQuery: (q: string) => void;
  setSelectedCategories: (cats: string[]) => void;
  setNeedsRevisionOnly: (val: boolean) => void;
  setSortOption: (val: string) => void;
  setCurrentPage: (val: number) => void;
  setGridView: (val: boolean) => void;
};

export const useAdsStore = create<AdsStore>((set, get) => ({
  ads: [],
  total: 0,
  loading: false,
  searchQuery: "",
  selectedCategories: [],
  needsRevisionOnly: false,
  sortOption: "nameAsc",
  currentPage: 1,
  gridView: true,
  pageSize: 10,

  fetchAds: async () => {
    set({ loading: true });
    const state = get();

    try {
      const sortColumn =
        state.sortOption === "nameAsc" || state.sortOption === "nameDesc"
          ? "title"
          : "createdAt";
      const sortDirection =
        state.sortOption === "nameAsc" ||
        state.sortOption === "dateNew" ||
        state.sortOption === "priceAsc"
          ? "asc"
          : "desc";

      const res = await getAds({
        q: state.searchQuery || undefined,
        limit: state.pageSize,
        skip: (state.currentPage - 1) * state.pageSize,
        needsRevision: state.needsRevisionOnly ? true : undefined,
        categories: state.selectedCategories.length
          ? state.selectedCategories.join(",")
          : undefined,
        sortColumn,
        sortDirection,
      });

      set({
        ads: res.data.items,
        total: res.data.total,
      });
    } finally {
      set({ loading: false });
    }
  },

  setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
  setSelectedCategories: (cats) =>
    set({ selectedCategories: cats, currentPage: 1 }),
  setNeedsRevisionOnly: (val) =>
    set({ needsRevisionOnly: val, currentPage: 1 }),
  setSortOption: (val) => set({ sortOption: val }),
  setCurrentPage: (val) => set({ currentPage: val }),
  setGridView: (val) => set({ gridView: val, pageSize: val ? 10 : 5 }),
}));
