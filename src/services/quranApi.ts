export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

export interface Qari {
  identifier: string;
  name: string;
  style: 'Murattal' | 'Mujawwad';
  quality: string;
  source: string;
  fallbackUrls?: string[];
}

const BASE_URL = 'https://api.alquran.cloud/v1';

// Add this utility function
const testAudioUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const getQariAudioUrl = async (qariIdentifier: string, formattedSurah: string, formattedAyah: string): Promise<string> => {
  const urls = [
    `https://everyayah.com/data/${qariIdentifier}/${formattedSurah}${formattedAyah}.mp3`,
    `https://verses.quran.com/${qariIdentifier}/${formattedSurah}${formattedAyah}.mp3`,
  ];

  for (const url of urls) {
    if (await testAudioUrl(url)) {
      return url;
    }
  }
  return ''; // Return empty string instead of throwing error
};

export const availableQaris: Record<'Murattal' | 'Mujawwad', Qari[]> = {
  Murattal: [
    {
      identifier: 'Alafasy_128kbps',
      name: 'Mishary Rashed Alafasy',
      style: 'Murattal',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      fallbackUrls: ['https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/']
    },
    { identifier: 'Abdul_Basit_Murattal_64kbps', name: 'Abdul Basit Abdul Samad', style: 'Murattal', quality: '64 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Hudhaify_128kbps', name: 'Ali Al-Hudhaify', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Husary_128kbps', name: 'Mahmoud Khalil Al-Husary', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'MaherAlMuaiqly128kbps', name: 'Maher Al Muaiqly', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Menshawi_16kbps', name: 'Mohamed Siddiq Al-Minshawi', style: 'Murattal', quality: '16 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Mohammad_al_Tablaway_128kbps', name: 'Mohammad al Tablaway', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Muhammad_Ayyoub_128kbps', name: 'Muhammad Ayyoub', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Muhammad_Jibreel_128kbps', name: 'Muhammad Jibreel', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Saood_ash-Shuraym_128kbps', name: 'Saud Al-Shuraim', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Abdullah_Basfar_32kbps', name: 'Abdullah Basfar', style: 'Murattal', quality: '32 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'ahmed_ibn_ali_al_ajamy_128kbps', name: 'Ahmed ibn Ali al-Ajamy', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Hani_Rifai_192kbps', name: 'Hani Ar-Rifai', style: 'Murattal', quality: '192 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Abu_Bakr_Ash-Shaatree_128kbps', name: 'Abu Bakr Ash-Shaatree', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Abdurrahmaan_As-Sudais_192kbps', name: 'Abdurrahman As-Sudais', style: 'Murattal', quality: '192 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Ibrahim_Akhdar_32kbps', name: 'Ibrahim Akhdar', style: 'Murattal', quality: '32 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Mostafa_Ismaeel_128kbps', name: 'Mostafa Ismaeel', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Yasser_Ad-Dussary_128kbps', name: 'Yasser Ad-Dussary', style: 'Murattal', quality: '128 kbps MP3', source: 'EveryAyah.com' },
  ],
  Mujawwad: [
    {
      identifier: 'Abdul_Basit_Mujawwad_128kbps',
      name: 'Abdul Basit Abdul Samad',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      fallbackUrls: ['https://download.quranicaudio.com/quran/abdul_basit_mujawwad/']
    },
    { identifier: 'Husary_Mujawwad_64kbps', name: 'Mahmoud Khalil Al-Husary', style: 'Mujawwad', quality: '64 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Maher_AlMuaiqly_64kbps', name: 'Maher Al Muaiqly', style: 'Mujawwad', quality: '64 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Muhammad_Ayyoub_128kbps', name: 'Muhammad Ayyoub', style: 'Mujawwad', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Muhammad_Jibreel_128kbps', name: 'Muhammad Jibreel', style: 'Mujawwad', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Saood_ash-Shuraym_128kbps', name: 'Saud Al-Shuraim', style: 'Mujawwad', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Abdullah_Basfar_64kbps', name: 'Abdullah Basfar', style: 'Mujawwad', quality: '64 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Minshawy_Mujawwad_192kbps', name: 'Mohamed Siddiq Al-Minshawi', style: 'Mujawwad', quality: '192 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Abdurrahmaan_As-Sudais_192kbps', name: 'Abdurrahman As-Sudais', style: 'Mujawwad', quality: '192 kbps MP3', source: 'EveryAyah.com' },
    { identifier: 'Abu_Bakr_Ash-Shaatree_128kbps', name: 'Abu Bakr Ash-Shaatree', style: 'Mujawwad', quality: '128 kbps MP3', source: 'EveryAyah.com' },
    { 
      identifier: 'Yasser_Ad-Dussary_128kbps',
      name: 'Yasser Ad-Dussary',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      fallbackUrls: ['https://download.quranicaudio.com/quran/yasser_ad-dossary/']
    },
  ]
};

export const quranApi = {
  getSurahs: async (): Promise<Surah[]> => {
    const response = await fetch(`${BASE_URL}/surah`);
    const data = await response.json();
    return data.data;
  },

  getSurah: async (surahNumber: number): Promise<{ surah: Surah; ayahs: Ayah[] }> => {
    const response = await fetch(`${BASE_URL}/surah/${surahNumber}/quran-uthmani`);
    const data = await response.json();
    return data.data;
  },

  getPage: async (pageNumber: number): Promise<Ayah[]> => {
    const response = await fetch(`${BASE_URL}/page/${pageNumber}/quran-uthmani`);
    const data = await response.json();
    return data.data.ayahs;
  },

  getAudioByAyah: async (surahNumber: number, ayahNumber: number, qariIdentifier: string): Promise<string> => {
    const formattedSurah = String(surahNumber).padStart(3, '0');
    const formattedAyah = String(ayahNumber).padStart(3, '0');
    return getQariAudioUrl(qariIdentifier, formattedSurah, formattedAyah);
  }
};
