export interface Zikr {
  id: number;
  category: string;
  arabic: string;
  translation: string;
  transliteration?: string;
  repetitions: number;
  source?: string;
  audio?: string;
  benefit?: string;
}

export const azkarCategories = [
  'أذكار الصباح والمساء',
  'Morning',
  'Evening',
  'أذكار النوم',
  'أذكار الاستيقاظ',
  'أذكار بعد الصلاة',
  'أذكار المسجد',
  'أدعية قرآنية',
  'تسابيح'
] as const;

export const azkarData: Zikr[] = [
  {
    id: 1,
    category: 'Morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ...',
    translation: 'We have reached the morning and at this very time unto Allah belongs the sovereignty...',
    repetitions: 1,
    source: 'Muslim'
  },
  // Added manual azkar entries:
  {
    id: 2,
    category: 'Morning',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    translation: 'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.',
    repetitions: 1,
    source: 'Hadith'
  },
  {
    id: 3,
    category: 'Evening',
    arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
    translation: 'O Allah, by You we enter the evening, by You we enter the morning, by You we live, by You we die, and to You is our return.',
    repetitions: 1,
    source: 'Hadith'
  },
  // Added manual azkar entries from provided JSON:
  {
    id: 75,
    category: "أذكار الصباح والمساء",
    arabic: "بسم الله الرحمن الرحيم ﴿قُلْ هُوَ اللَّهُ أَحَدٌ* اللَّهُ الصَّمَدُ* لَمْ يَلِدْ وَلَمْ يُولَدْ* وَلَمْ يَكُن لَّهُ كُفُواً أَحَدٌ﴾.  بسم الله الرحمن الرحيم ﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ* مِن شَرِّ مَا خَلَقَ* وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ* وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ* وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾.  بسم الله الرحمن الرحيم ﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ* مَلِكِ النَّاسِ* إِلَهِ النَّاسِ* مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ* الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ* مِنَ الْجِنَّةِ وَ النَّاسِ﴾",
    translation: "",
    repetitions: 3,
    source: "Surah Al-Ikhlas, Surah Al-Falaq, Surah An-Nas",
    audio: "http://www.hisnmuslim.com/audio/ar/76.mp3"
  },
  {
    id: 77,
    category: "أذكار الصباح والمساء",
    arabic: "((أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيرَ مَا بَعْدَهُ ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي  هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكُسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ)). [ وإذا أمسى قال: أمسينا وأمسى الملك للَّه]",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/77.mp3"
  },
  {
    id: 78,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا ، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ)). [وإذا أمسى قال: اللَّهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.]",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/78.mp3"
  },
  {
    id: 79,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنوبَ إِلاَّ أَنْتَ))",
    translation: "",
    repetitions: 1,
    source: "Sayyidul Istighfar",
    audio: "http://www.hisnmuslim.com/audio/ar/79.mp3"
  },
  {
    id: 80,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتِكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ)) (أربعَ مَرَّاتٍ).",
    translation: "",
    repetitions: 4,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/80.mp3"
  },
  {
    id: 81,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ)).",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/81.mp3"
  },
  {
    id: 82,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ  إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ القَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ)) (ثلاثَ مرَّاتٍ).",
    translation: "",
    repetitions: 3,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/82.mp3"
  },
  {
    id: 83,
    category: "أذكار الصباح والمساء",
    arabic: "((حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيهِ تَوَكَّلتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ)) (سَبْعَ مَرّاتٍ).",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/83.mp3"
  },
  {
    id: 84,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ: فِي دِينِي وَدُنْيَايَ وَأَهْلِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَينِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي)).",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/84.mp3"
  },
  {
    id: 85,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطانِ وَشَرَكِهِ، وَأَنْ أَقْتَرِفَ عَلَى  نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ)).",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/85.mp3"
  },
  {
    id: 86,
    category: "أذكار الصباح والمساء",
    arabic: "((بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلاَ فِي السّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ))",
    translation: "",
    repetitions: 3,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/86.mp3"
  },
  {
    id: 87,
    category: "أذكار الصباح والمساء",
    arabic: "((رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلاَمِ دِيناً، وَبِمُحَمَّّدٍ صلى الله عليه وسلم نَبِيّاً))",
    translation: "",
    repetitions: 3,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/87.mp3"
  },
  {
    id: 88,
    category: "أذكار الصباح والمساء",
    arabic: "((يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ أَصْلِحْ لِي شَأْنِيَ كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ))",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/88.mp3"
  },
  {
    id: 89,
    category: "أذكار الصباح والمساء",
    arabic: "((أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُـمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ:فَتْحَهُ، وَنَصْرَهُ، وَنورَهُ، وَبَرَكَتَهُ، وَهُدَاهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ))",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/89.mp3"
  },
  {
    id: 90,
    category: "أذكار الصباح والمساء",
    arabic: "((أَصْبَحْنا عَلَى فِطْرَةِ الْإِسْلاَمِ، وَعَلَى كَلِمَةِ الْإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صلى الله عليه وسلم، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشرِكِينَ))",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/90.mp3"
  },
  {
    id: 91,
    category: "أذكار الصباح والمساء",
    arabic: "((سُبْحَانَ اللَّهِ وَبِحَمْدِهِ))",
    translation: "",
    repetitions: 100,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/91.mp3"
  },
  {
    id: 92,
    category: "أذكار الصباح والمساء",
    arabic: "((لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ))",
    translation: "",
    repetitions: 10,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/92.mp3"
  },
  {
    id: 93,
    category: "أذكار الصباح والمساء",
    arabic: "((لاَ إِلَهَ إِلاَّ اللَّهُ، وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ))",
    translation: "",
    repetitions: 100,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/93.mp3"
  },
  {
    id: 94,
    category: "أذكار الصباح والمساء",
    arabic: "((سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ))",
    translation: "",
    repetitions: 3,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/94.mp3"
  },
  {
    id: 95,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَرِزْقاً طَيِّباً، وَعَمَلاً مُتَقَبَّلاً))",
    translation: "",
    repetitions: 1,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/95.mp3"
  },
  {
    id: 96,
    category: "أذكار الصباح والمساء",
    arabic: "((أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ))",
    translation: "",
    repetitions: 100,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/96.mp3"
  },
  {
    id: 97,
    category: "أذكار الصباح والمساء",
    arabic: "((أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ))",
    translation: "",
    repetitions: 3,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/97.mp3"
  },
  {
    id: 98,
    category: "أذكار الصباح والمساء",
    arabic: "((اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ))",
    translation: "",
    repetitions: 10,
    source: "Hadith",
    audio: "http://www.hisnmuslim.com/audio/ar/98.mp3"
  }
  // ...add additional azkar if needed...
];
