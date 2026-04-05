export type AdItem = {
  id: number,
  category: 'auto' | 'real_estate' | 'electronics';
  title: string;
  price: number;
  needsRevision: boolean
}