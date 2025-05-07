export interface Zikr {
  id: number;
  category: string;
  arabic: string;
  translation: string;
  transliteration?: string;
  repetitions: number;
  source?: string;
  benefit?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

const BASE_URL = 'https://www.hisnmuslim.com/api/ar/27.json';

export const azkarApi = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await fetch(`${BASE_URL}/husn_categories.json`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      return data.map((item: any) => ({
        id: item.id,
        name: item.title,
        description: item.description
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getAzkarByCategory: async (categoryId: number): Promise<Zikr[]> => {
    try {
      const response = await fetch(`${BASE_URL}/${categoryId}.json`);
      if (!response.ok) throw new Error('Failed to fetch azkar');
      const data = await response.json();
      return data.content.map((item: any) => ({
        id: item.ID,
        category: item.CATEGORY,
        arabic: item.ARABIC_TEXT,
        translation: item.TRANSLATED_TEXT,
        transliteration: item.TRANSLITERATION,
        repetitions: item.REPEAT || 1,
        source: item.REFERENCE,
        benefit: item.BENEFIT
      }));
    } catch (error) {
      console.error('Error fetching azkar:', error);
      return [];
    }
  }
};
