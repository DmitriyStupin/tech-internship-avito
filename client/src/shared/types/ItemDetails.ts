import type {
  AutoItemParams,
  ElectronicsItemParams,
  RealEstateItemParams,
} from "./ItemParams.ts";

export type ItemDetails = {
  id: number;
  category: "auto" | "real_estate" | "electronics";
  title: string;
  description?: string;
  price: number;
  needsRevision: boolean;
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
  createdAt: string; // под вопросом
  updatedAt: string; // под вопросом
};
