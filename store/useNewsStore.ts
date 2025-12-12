import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NewsItem } from '@/types';

interface PaidCategoryData {
  items: NewsItem[];
  timestamp: number;
}

interface NewsState {
  paidNews: Record<string, PaidCategoryData>;
  setPaidNews: (categoryId: string, items: NewsItem[]) => void;
  getPaidNews: (categoryId: string) => NewsItem[] | null;
}

const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      paidNews: {},
      setPaidNews: (categoryId, items) => {
        set((state) => ({
          paidNews: {
            ...state.paidNews,
            [categoryId]: {
              items,
              timestamp: Date.now(),
            },
          },
        }));
      },
      getPaidNews: (categoryId) => {
        const data = get().paidNews[categoryId];
        if (!data) return null;

        const isExpired = Date.now() - data.timestamp > FIVE_HOURS_MS;
        if (isExpired) return null;

        return data.items;
      },
    }),
    {
      name: 'news-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
