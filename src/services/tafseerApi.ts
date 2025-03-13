export interface Tafseer {
  id: string;
  name: string;
  author: string;
  language: string;
}

export interface TafseerText {
  text: string;
  tafseerName: string;
}

const BASE_URL = 'https://quranenc.com/api/v1/translation/sura';

const TAFSEER = {
  id: "arabic_moyassar",
  name: "التفسير الميسر",
  author: "نخبة من العلماء",
  language: "ar"
} as const;

export const tafseerApi = {
  getTafseerByAyah: async (surahNumber: number, ayahNumber: number): Promise<TafseerText | null> => {
    try {
      const response = await fetch(
        `${BASE_URL}/${TAFSEER.id}/${surahNumber}`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      
      if (!data.result || !Array.isArray(data.result)) {
        return null;
      }

      const ayahTafseer = data.result[ayahNumber - 1];
      if (!ayahTafseer) return null;
      
      return {
        text: ayahTafseer.translation,
        tafseerName: TAFSEER.name
      };
    } catch (error) {
      console.error('Error fetching tafseer:', error);
      return null;
    }
  }
};
