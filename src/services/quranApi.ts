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
  photoUrl?: string;
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
      fallbackUrls: ['https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/'],
      photoUrl: 'https://static.qurancdn.com/images/reciters/6/mishary-rashid-alafasy-profile.jpeg?v=1'
    },
    { 
      identifier: 'Abdul_Basit_Murattal_64kbps', 
      name: 'Abdul Basit Abdul Samad', 
      style: 'Murattal', 
      quality: '64 kbps MP3', 
      source: 'EveryAyah.com',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Abdelbasset-abdessamad-27.jpg/222px-Abdelbasset-abdessamad-27.jpg'
    },
    { 
      identifier: 'Hudhaify_128kbps', 
      name: 'Ali Al-Hudhaify', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvpQkc0-eHlwI6y3n9yNg9KdW7c9fkzzDkw&s'
    },
    { 
      identifier: 'Husary_128kbps', 
      name: 'Mahmoud Khalil Al-Husary', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com',
      photoUrl: 'https://static.qurancdn.com/images/reciters/5/mahmoud-khalil-al-hussary-profile.png?v=1'
    },
    { 
      identifier: 'MaherAlMuaiqly128kbps', 
      name: 'Maher Al Muaiqly', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Maher_Al_Mueaqly.png/220px-Maher_Al_Mueaqly.png'
    },
    { 
      identifier: 'Menshawi_16kbps', 
      name: 'Mohamed Siddiq Al-Minshawi', 
      style: 'Murattal', 
      quality: '16 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://static.qurancdn.com/images/reciters/7/mohamed-siddiq-el-minshawi-profile.jpeg?v=1'
    },
    { 
      identifier: 'Mohammad_al_Tablaway_128kbps', 
      name: 'Mohammad al Tablaway', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com', 
      photoUrl: 'https://www.egypttoday.com/siteimages/Larg/75265.jpg'
    },
    { 
      identifier: 'Muhammad_Ayyoub_128kbps', 
      name: 'Muhammad Ayyoub', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Muhammad_Ayyub.jpeg/220px-Muhammad_Ayyub.jpeg'
    },
    { 
      identifier: 'Muhammad_Jibreel_128kbps', 
      name: 'Muhammad Jibreel', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com',
      photoUrl: 'https://tvquran.com/uploads/authors/images/%D9%85%D8%AD%D9%85%D8%AF%20%D8%AC%D8%A8%D8%B1%D9%8A%D9%84.jpg' 
    },
    { 
      identifier: 'Saood_ash-Shuraym_128kbps', 
      name: 'Saud Al-Shuraim', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Saud_Shuraim_doing_the_Khutbah.png'
    },
    { 
      identifier: 'Abdullah_Basfar_32kbps', 
      name: 'Abdullah Basfar', 
      style: 'Murattal', 
      quality: '32 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://storage.googleapis.com/way2quran_storage/imgs/abdullah-basfar.jpg'
    },
    { 
      identifier: 'ahmed_ibn_ali_al_ajamy_128kbps', 
      name: 'Ahmed ibn Ali al-Ajamy', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://www.assabile.com/media/photo/full_size/ahmed-al-ajmi-979.jpg'
    },
    { 
      identifier: 'Hani_Rifai_192kbps', 
      name: 'Hani Ar-Rifai', 
      style: 'Murattal', 
      quality: '192 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBfPkhbErm-jh4tZGAQxht5o3Eb2zZ0dwe1A&s'
    },
    { 
      identifier: 'Abu_Bakr_Ash-Shaatree_128kbps', 
      name: 'Abu Bakr Ash-Shaatree', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://static.qurancdn.com/images/reciters/3/abu-bakr-al-shatri-pofile.jpeg?v=1'
    },
    { 
      identifier: 'Abdurrahmaan_As-Sudais_192kbps', 
      name: 'Abdurrahman As-Sudais', 
      style: 'Murattal', 
      quality: '192 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Abdul-Rahman_Al-Sudais_%28Cropped%2C_2011%29.jpg'
    },
    { 
      identifier: 'Ibrahim_Akhdar_32kbps', 
      name: 'Ibrahim Akhdar', 
      style: 'Murattal', 
      quality: '32 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://www.assabile.com/media/person/200x256/ibrahim-al-akhdar.png'
    },
    { 
      identifier: 'Mostafa_Ismaeel_128kbps', 
      name: 'Mostafa Ismaeel', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Mostafa_Ismaeel.jpg'
    },
    { 
      identifier: 'Yasser_Ad-Dussary_128kbps', 
      name: 'Yasser Ad-Dussary', 
      style: 'Murattal', 
      quality: '128 kbps MP3', 
      source: 'EveryAyah.com' ,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Yasser_Al-Dosari.png'
    },
  ],
  Mujawwad: [
    {
      identifier: 'Abdul_Basit_Mujawwad_128kbps',
      name: 'Abdul Basit Abdul Samad',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      fallbackUrls: ['https://download.quranicaudio.com/quran/abdul_basit_mujawwad/'],
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Abdelbasset-abdessamad-27.jpg/222px-Abdelbasset-abdessamad-27.jpg'
    },
    { 
      identifier: 'Husary_Mujawwad_64kbps',
      name: 'Mahmoud Khalil Al-Husary',
      style: 'Mujawwad',
      quality: '64 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://static.qurancdn.com/images/reciters/5/mahmoud-khalil-al-hussary-profile.png?v=1'
    },
    { 
      identifier: 'Maher_AlMuaiqly_64kbps',
      name: 'Maher Al Muaiqly',
      style: 'Mujawwad',
      quality: '64 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Maher_Al_Mueaqly.png/220px-Maher_Al_Mueaqly.png'
    },
    { 
      identifier: 'Muhammad_Ayyoub_128kbps',
      name: 'Muhammad Ayyoub',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Muhammad_Ayyub.jpeg/220px-Muhammad_Ayyub.jpeg'
    },
    { 
      identifier: 'Muhammad_Jibreel_128kbps',
      name: 'Muhammad Jibreel',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://tvquran.com/uploads/authors/images/%D9%85%D8%AD%D9%85%D8%AF%20%D8%AC%D8%A8%D8%B1%D9%8A%D9%84.jpg'
    },
    { 
      identifier: 'Saood_ash-Shuraym_128kbps',
      name: 'Saud Al-Shuraim',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Saud_Shuraim_doing_the_Khutbah.png'
    },
    { 
      identifier: 'Abdullah_Basfar_64kbps',
      name: 'Abdullah Basfar',
      style: 'Mujawwad',
      quality: '64 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://storage.googleapis.com/way2quran_storage/imgs/abdullah-basfar.jpg'
    },
    { 
      identifier: 'Minshawy_Mujawwad_192kbps',
      name: 'Mohamed Siddiq Al-Minshawi',
      style: 'Mujawwad',
      quality: '192 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://static.qurancdn.com/images/reciters/7/mohamed-siddiq-el-minshawi-profile.jpeg?v=1'
    },
    { 
      identifier: 'Abdurrahmaan_As-Sudais_192kbps',
      name: 'Abdurrahman As-Sudais',
      style: 'Mujawwad',
      quality: '192 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Abdul-Rahman_Al-Sudais_%28Cropped%2C_2011%29.jpg'
    },
    { 
      identifier: 'Abu_Bakr_Ash-Shaatree_128kbps',
      name: 'Abu Bakr Ash-Shaatree',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      photoUrl: 'https://static.qurancdn.com/images/reciters/3/abu-bakr-al-shatri-pofile.jpeg?v=1'
    },
    { 
      identifier: 'Yasser_Ad-Dussary_128kbps',
      name: 'Yasser Ad-Dussary',
      style: 'Mujawwad',
      quality: '128 kbps MP3',
      source: 'EveryAyah.com',
      fallbackUrls: ['https://download.quranicaudio.com/quran/yasser_ad-dossary/'],
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Yasser_Al-Dosari.png'
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
