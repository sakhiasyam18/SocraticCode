import { Exercise, StudentAnalytics, ProcessEvent } from '../types';

export const EXERCISES: Exercise[] = [
  {
    id: 'nested-star-pattern',
    title: 'Pola Segitiga Siku-Siku Terbalik',
    topic: 'Struktur Kontrol & Nested Loop',
    difficulty: 'Easy',
    description: 
      'Buatlah fungsi `generatePattern(n)` yang mencetak pola bintang segitiga siku-siku terbalik berukuran `n`. ' +
      'Baris pertama memiliki `n` bintang, baris kedua `n-1` bintang, hingga baris terakhir hanya memiliki 1 bintang. ' +
      'Setiap baris diakhiri dengan newline `\\n`.',
    constraints: [
      '1 <= n <= 50',
      'Hindari penggunaan fungsi string repeat bawaan (`"*".repeat(n)`), gunakan nested loop untuk melatih dekomposisi logika!',
      'Gunakan karakter bintang `*` dan tanpa spasi di antara bintang.'
    ],
    starterCode: `// Tuliskan implementasi logika kamu di sini
function generatePattern(n) {
  let result = "";
  
  // TODO: Rancang perulangan luar (baris) dan perulangan dalam (kolom)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      result += "*";
    }
    result += "\\n";
  }
  
  return result;
}
`,
    sampleCodeSolution: `function generatePattern(n) {
  let result = "";
  for (let i = n; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      result += "*";
    }
    result += "\\n";
  }
  return result;
}`,
    testCases: [
      { id: 1, input: 'n = 3', expectedOutput: '***\\n**\\n*\\n', isHidden: false },
      { id: 2, input: 'n = 5', expectedOutput: '*****\\n****\\n***\\n**\\n*\\n', isHidden: false },
      { id: 3, input: 'n = 1', expectedOutput: '*\\n', isHidden: false },
      { id: 4, input: 'n = 4', expectedOutput: '****\\n***\\n**\\n*\\n', isHidden: true },
    ],
    socraticHints: [
      {
        level: 1,
        title: 'Tingkat 1: Pemahaman Konseptual (Dekomposisi Masalah)',
        question: 'Berapa banyak baris total yang harus dicetak jika n = 5? Dan berapa banyak bintang pada baris ke-i?',
        explanation: 'Pikirkan perulangan luar untuk mengontrol nomor baris, dan perulangan dalam untuk mengontrol jumlah karakter bintang pada baris tersebut.'
      },
      {
        level: 2,
        title: 'Tingkat 2: Logika Alur Perulangan (Loop Invariant)',
        question: 'Bagaimana hubungan antara variabel indeks luar `i` dengan batas perulangan dalam `j`?',
        explanation: 'Jika `i` berjalan dari `0` hingga `n-1`, maka jumlah bintang di baris ke-`i` adalah `n - i`. Atau alternatifnya, kamu bisa membuat loop luar mundur dari `n` ke `1`!'
      },
      {
        level: 3,
        title: 'Tingkat 3: Edge Case & Penanganan Karakter',
        question: 'Apakah karakter newline `\\n` ditaruh di dalam loop dalam atau setelah loop dalam selesai?',
        explanation: 'Newline menandakan pergantian baris, sehingga harus ditaruh setelah seluruh bintang di baris tersebut selesai dicetak oleh loop dalam.'
      }
    ],
    microQuestion: {
      id: 'mq-nested-1',
      codeSnippet: `for (let i = 0; i < n; i++) {
  for (let j = 0; j < n - i; j++) {
    result += "*";
  }
  result += "\\n";
}`,
      question: 'Berdasarkan potongan baris kode di atas, apa peran ekspresi `n - i` pada kondisi batas loop kedua?',
      options: [
        {
          id: 'opt-a',
          text: 'Mengurangi jumlah bintang sebanyak 1 buah setiap kali berpindah ke baris berikutnya.',
          isCorrect: true,
          explanation: 'Tepat! Saat i bertambah dari 0 ke 1, nilai (n - i) berkurang 1, sehingga baris berikutnya mencetak 1 bintang lebih sedikit.'
        },
        {
          id: 'opt-b',
          text: 'Membuat segitiga menjadi rata kanan dengan menambahkan spasi otomatis.',
          isCorrect: false,
          explanation: 'Miskonsepsi! Ekspresi ini hanya menentukan iterasi pencetakan bintang, bukan spasi atau alignment rata kanan.'
        },
        {
          id: 'opt-c',
          text: 'Mencegah terjadinya infinite loop pada compiler JavaScript.',
          isCorrect: false,
          explanation: 'Kurang tepat. Kontrol infinite loop ditentukan oleh terminasi `i < n` dan `j < n - i`, bukan formula khususnya.'
        },
        {
          id: 'opt-d',
          text: 'Mengalikan nilai n dengan jumlah total karakter bintang.',
          isCorrect: false,
          explanation: 'Salah. Ini operasi pengurangan matematika untuk batas atas iterasi, bukan perkalian.'
        }
      ]
    }
  },
  {
    id: 'reverse-string-inplace',
    title: 'Two-Pointer In-Place Array Reversal',
    topic: 'Array, Pointer & Mutasi Memori',
    difficulty: 'Medium',
    description: 
      'Diberikan sebuah array karakter `chars`. Baliklah urutan elemen array tersebut secara *in-place* ' +
      'menggunakan konsep two-pointer dengan kompleksitas memori O(1). Kembalikan array yang telah dibalik.',
    constraints: [
      '1 <= chars.length <= 10^5',
      'Wajib menggunakan pendekatan Two-Pointer (left & right pointer)',
      'Dilarang menggunakan method bawaan `.reverse()`!'
    ],
    starterCode: `function reverseInPlace(chars) {
  let left = 0;
  let right = chars.length - 1;
  
  // TODO: Buat loop pertukaran elemen hingga kedua pointer bertemu
  while (left < right) {
    let temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    
    left++;
    right--;
  }
  
  return chars;
}
`,
    sampleCodeSolution: `function reverseInPlace(chars) {
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    let temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    left++;
    right--;
  }
  return chars;
}`,
    testCases: [
      { id: 1, input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', isHidden: false },
      { id: 2, input: '["a","b"]', expectedOutput: '["b","a"]', isHidden: false },
      { id: 3, input: '["x"]', expectedOutput: '["x"]', isHidden: false },
      { id: 4, input: '["k","o","d","i","n","g"]', expectedOutput: '["g","n","i","d","o","k"]', isHidden: true },
    ],
    socraticHints: [
      {
        level: 1,
        title: 'Tingkat 1: Konsep Two-Pointer',
        question: 'Di mana posisi awal kedua pointer (left dan right), dan kapan pergerakan mereka harus berhenti?',
        explanation: 'Pointer `left` mulai dari index 0, sedangkan `right` mulai dari index terakhir (length - 1). Keduanya harus terus bertukar hingga berpapasan.'
      },
      {
        level: 2,
        title: 'Tingkat 2: Mekanisme Swapping (Pertukaran Nilai)',
        question: 'Mengapa kita membutuhkan variabel penampung sementara (`temp`) saat menukar dua elemen array?',
        explanation: 'Jika kamu langsung menulis `chars[left] = chars[right]`, nilai asli di `chars[left]` akan tertimpa dan hilang selamanya sebelum sempat disalin ke `right`!'
      },
      {
        level: 3,
        title: 'Tingkat 3: Kondisi Terminasi Loop',
        question: 'Apa perbedaan antara kondisi `while (left < right)` dengan `while (left <= right)`?',
        explanation: 'Saat panjang array ganjil, elemen tepat di tengah tidak perlu ditukar dengan dirinya sendiri. Jadi `left < right` lebih efisien dan tepat.'
      }
    ],
    microQuestion: {
      id: 'mq-swap-2',
      codeSnippet: `let temp = chars[left];
chars[left] = chars[right];
chars[right] = temp;`,
      question: 'Apa yang akan terjadi secara fatal jika baris pertama `let temp = chars[left];` dihilangkan dan langsung ditulis `chars[left] = chars[right]; chars[right] = chars[left];`?',
      options: [
        {
          id: 'opt-a',
          text: 'Kedua elemen pada index left dan right akan bernilai sama dengan nilai asli chars[right] (data chars[left] lenyap).',
          isCorrect: true,
          explanation: 'Benar! Karena chars[left] sudah ditimpa duluan oleh chars[right], maka saat chars[right] membaca chars[left], nilainya sudah duplikat.'
        },
        {
          id: 'opt-b',
          text: 'Akan muncul error syntax ReferenceError pada interpreter JavaScript.',
          isCorrect: false,
          explanation: 'Salah, sintaksnya valid secara bahasa pemrograman, namun terjadi bug logika semantik parah.'
        },
        {
          id: 'opt-c',
          text: 'Array otomatis terbalik dengan memori dua kali lebih hemat.',
          isCorrect: false,
          explanation: 'Miskonsepsi berbahaya! Ini justru merusak data array.'
        }
      ]
    }
  }
];

export const MOCK_STUDENTS: StudentAnalytics[] = [
  {
    id: 'std-01',
    nim: '240501001',
    name: 'Raditya Ardiansyah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 92,
    quadrant: 'ready',
    pasteChunkRatio: 8,
    organicTypingRatio: 92,
    microComprehensionScore: 95,
    hintsUsedAverage: 0.8,
    totalAttempts: 3,
    lastActive: '5 menit lalu',
    flaggedRisk: false,
    eventTimeline: [
      { id: 'ev-1', timestamp: '10:00:12', eventType: 'MATERIAL_OPEN', description: 'Membuka latihan Pola Bintang', severity: 'normal' },
      { id: 'ev-2', timestamp: '10:01:40', eventType: 'KEYSTROKE_BURST', description: 'Mengetik deklarasi fungsi & loop (120 ketukan organik)', severity: 'normal' },
      { id: 'ev-3', timestamp: '10:03:15', eventType: 'TEST_RUN', description: 'Uji coba pertama: 2/4 Passed (Failed on newline)', severity: 'warning' },
      { id: 'ev-4', timestamp: '10:04:20', eventType: 'KEYSTROKE_BURST', description: 'Memperbaiki penempatan result += "\\n"', severity: 'normal' },
      { id: 'ev-5', timestamp: '10:05:00', eventType: 'TEST_RUN', description: 'Uji coba kedua: 4/4 Passed (100% Lolos)', severity: 'success' },
      { id: 'ev-6', timestamp: '10:05:45', eventType: 'MICRO_QUIZ', description: 'Lolos uji pemahaman logika loop (Skor: 100%)', severity: 'success' },
      { id: 'ev-7', timestamp: '10:06:10', eventType: 'SUBMISSION', description: 'Submit akhir terverifikasi mandiri', severity: 'success' },
    ]
  },
  {
    id: 'std-02',
    nim: '240501014',
    name: 'Dimas Setiawan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 34,
    quadrant: 'ai_dependent',
    pasteChunkRatio: 88,
    organicTypingRatio: 12,
    microComprehensionScore: 25,
    hintsUsedAverage: 0,
    totalAttempts: 1,
    lastActive: '12 menit lalu',
    flaggedRisk: true,
    riskReason: 'Tinggi Copas AI (88% Paste), 0 Jeda Berpikir, Gagal di Uji Logika Loop',
    eventTimeline: [
      { id: 'ev-11', timestamp: '10:14:00', eventType: 'MATERIAL_OPEN', description: 'Membuka latihan Pola Bintang', severity: 'normal' },
      { id: 'ev-12', timestamp: '10:14:18', eventType: 'PASTE_CHUNK', description: 'DETEKSI COPAS BESAR: 38 baris kode ditempel dalam 1 detik (520 karakter)', severity: 'alert' },
      { id: 'ev-13', timestamp: '10:14:35', eventType: 'TEST_RUN', description: 'Uji coba langsung lolos 4/4 dalam waktu 35 detik sejak buka soal', severity: 'warning' },
      { id: 'ev-14', timestamp: '10:15:20', eventType: 'MICRO_QUIZ', description: 'GAGAL uji pemahaman konsep (Memilih distractor miskonsepsi syntax)', severity: 'alert' },
      { id: 'ev-15', timestamp: '10:15:30', eventType: 'SUBMISSION', description: 'Submit dengan flag: Ilusi Kompetensi AI Terdeteksi', severity: 'alert' },
    ]
  },
  {
    id: 'std-03',
    nim: '240501022',
    name: 'Sarah Maulida',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 58,
    quadrant: 'struggling',
    pasteChunkRatio: 15,
    organicTypingRatio: 85,
    microComprehensionScore: 60,
    hintsUsedAverage: 3.2,
    totalAttempts: 7,
    lastActive: '2 menit lalu',
    flaggedRisk: true,
    riskReason: 'Buntu di Nested Loop (7 kali error berulang), aktif meminta petunjuk Socrates',
    eventTimeline: [
      { id: 'ev-21', timestamp: '09:40:00', eventType: 'MATERIAL_OPEN', description: 'Membuka soal', severity: 'normal' },
      { id: 'ev-22', timestamp: '09:43:10', eventType: 'COMPILE_ERROR', description: 'ReferenceError: j is not defined', severity: 'warning' },
      { id: 'ev-23', timestamp: '09:45:00', eventType: 'SOCRATIC_HINT', description: 'Meminta Petunjuk Socrates Level 1: Dekomposisi', severity: 'normal' },
      { id: 'ev-24', timestamp: '09:48:30', eventType: 'SOCRATIC_HINT', description: 'Meminta Petunjuk Socrates Level 2: Loop Invariant', severity: 'normal' },
      { id: 'ev-25', timestamp: '09:54:12', eventType: 'TEST_RUN', description: 'Percobaan ke-5: 3/4 Lolos (Bintang terbalik masih offset)', severity: 'warning' },
      { id: 'ev-26', timestamp: '09:59:00', eventType: 'TEST_RUN', description: 'Percobaan ke-7: Berhasil lolos semua test case', severity: 'success' },
      { id: 'ev-27', timestamp: '10:00:20', eventType: 'MICRO_QUIZ', description: 'Menjawab benar setelah membaca ulang penjelasan', severity: 'normal' },
    ]
  },
  {
    id: 'std-04',
    nim: '240501035',
    name: 'Farhan Hadi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 78,
    quadrant: 'slow_pacer',
    pasteChunkRatio: 4,
    organicTypingRatio: 96,
    microComprehensionScore: 90,
    hintsUsedAverage: 1.0,
    totalAttempts: 4,
    lastActive: '18 menit lalu',
    flaggedRisk: false,
    eventTimeline: [
      { id: 'ev-31', timestamp: '09:15:00', eventType: 'MATERIAL_OPEN', description: 'Membuka soal', severity: 'normal' },
      { id: 'ev-32', timestamp: '09:20:00', eventType: 'KEYSTROKE_BURST', description: 'Mengetik perlahan dengan jeda berpikir 2 menit di baris nested loop', severity: 'normal' },
      { id: 'ev-33', timestamp: '09:26:00', eventType: 'TEST_RUN', description: 'Uji coba pertama langsung 4/4 Passed', severity: 'success' },
      { id: 'ev-34', timestamp: '09:27:30', eventType: 'MICRO_QUIZ', description: 'Menjawab kuis mikro dengan analisis akurat', severity: 'success' },
    ]
  },
  {
    id: 'std-05',
    nim: '240501041',
    name: 'Bima Arya Nugraha',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 31,
    quadrant: 'ai_dependent',
    pasteChunkRatio: 92,
    organicTypingRatio: 8,
    microComprehensionScore: 20,
    hintsUsedAverage: 0,
    totalAttempts: 1,
    lastActive: '25 menit lalu',
    flaggedRisk: true,
    riskReason: 'Pola Copas Eksternal: 92% kode dari clipboard, gagal kuis mikro 3x berturut-turut',
    eventTimeline: [
      { id: 'ev-41', timestamp: '08:50:00', eventType: 'MATERIAL_OPEN', description: 'Buka modul Two-Pointer', severity: 'normal' },
      { id: 'ev-42', timestamp: '08:50:22', eventType: 'PASTE_CHUNK', description: 'PASTE MASSIVE: Menempelkan 45 baris kode instan', severity: 'alert' },
      { id: 'ev-43', timestamp: '08:50:40', eventType: 'TEST_RUN', description: 'Lolos semua unit test', severity: 'warning' },
      { id: 'ev-44', timestamp: '08:51:15', eventType: 'MICRO_QUIZ', description: 'Gagal menjelaskan fungsi variabel `temp` dalam swap', severity: 'alert' },
    ]
  },
  {
    id: 'std-06',
    nim: '240501053',
    name: 'Nabila Putri Cahyani',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 89,
    quadrant: 'ready',
    pasteChunkRatio: 10,
    organicTypingRatio: 90,
    microComprehensionScore: 92,
    hintsUsedAverage: 1.2,
    totalAttempts: 2,
    lastActive: '8 menit lalu',
    flaggedRisk: false,
    eventTimeline: [
      { id: 'ev-51', timestamp: '10:02:00', eventType: 'MATERIAL_OPEN', description: 'Membuka latihan Two-Pointer', severity: 'normal' },
      { id: 'ev-52', timestamp: '10:06:00', eventType: 'KEYSTROKE_BURST', description: 'Mengetik mandiri algoritma in-place reverse', severity: 'normal' },
      { id: 'ev-53', timestamp: '10:07:30', eventType: 'TEST_RUN', description: 'Test Case lolos 100%', severity: 'success' },
      { id: 'ev-54', timestamp: '10:08:40', eventType: 'MICRO_QUIZ', description: 'Skor pemahaman 100%', severity: 'success' },
    ]
  },
  {
    id: 'std-07',
    nim: '240501067',
    name: 'Kevin Ananda',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 39,
    quadrant: 'ai_dependent',
    pasteChunkRatio: 82,
    organicTypingRatio: 18,
    microComprehensionScore: 35,
    hintsUsedAverage: 0,
    totalAttempts: 1,
    lastActive: '30 menit lalu',
    flaggedRisk: true,
    riskReason: 'Anomali Waktu Pengerjaan (< 45 detik) dengan 0 ketukan bertahap',
    eventTimeline: [
      { id: 'ev-61', timestamp: '08:30:00', eventType: 'MATERIAL_OPEN', description: 'Buka latihan', severity: 'normal' },
      { id: 'ev-62', timestamp: '08:30:19', eventType: 'PASTE_CHUNK', description: 'Paste blok kode utuh', severity: 'alert' },
      { id: 'ev-63', timestamp: '08:31:00', eventType: 'MICRO_QUIZ', description: 'Gagal kuis pemahaman', severity: 'alert' },
    ]
  },
  {
    id: 'std-08',
    nim: '240501072',
    name: 'Fauzan Hakim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    liveReadinessScore: 86,
    quadrant: 'ready',
    pasteChunkRatio: 12,
    organicTypingRatio: 88,
    microComprehensionScore: 88,
    hintsUsedAverage: 0.5,
    totalAttempts: 3,
    lastActive: '3 menit lalu',
    flaggedRisk: false,
    eventTimeline: [
      { id: 'ev-71', timestamp: '09:50:00', eventType: 'MATERIAL_OPEN', description: 'Buka latihan', severity: 'normal' },
      { id: 'ev-72', timestamp: '09:55:00', eventType: 'TEST_RUN', description: 'Lolos dengan revisi manual', severity: 'success' },
    ]
  }
];

// Tabel Spesifikasi Data Pembelajaran (Sesuai Komponen 5.5 Tugas)
export const LEARNING_DATA_SPECIFICATION = [
  {
    no: 1,
    activity: 'Membuka Halaman Latihan Koding',
    category: 'Contextual & Temporal Data',
    recordedData: 'student_id, exercise_id, timestamp_open, session_id',
    exampleValue: 'std-02, nested-star-pattern, 2026-11-04 10:14:00, SES-9921',
    analyticsPurpose: 'Menghitung waktu respons awal dan durasi orientasi soal sebelum mahasiswa mulai menulis kode.'
  },
  {
    no: 2,
    activity: 'Mengetik Kode Secara Organik (Keystroke Event)',
    category: 'Interaction & Temporal Data',
    recordedData: 'keystroke_count, chars_added, typing_speed_cpm, pause_intervals',
    exampleValue: '142 keys, +142 chars, 160 cpm, [1.2s, 4.5s, 0.8s]',
    analyticsPurpose: 'Mendeteksi dinamika kognitif; jeda berpikir yang wajar menunjukkan proses penalaran algoritma.'
  },
  {
    no: 3,
    activity: 'Menempelkan Kode dalam Jumlah Besar (Paste Event)',
    category: 'Behavioral & Interaction Data',
    recordedData: 'pasted_chars_length, lines_pasted, paste_timestamp, paste_ratio',
    exampleValue: '520 chars, 38 lines, 10:14:18, 0.88 (88%)',
    analyticsPurpose: 'Indikator utama ketergantungan AI eksternal (ChatGPT/Copilot). Pemicu alert asdos.'
  },
  {
    no: 4,
    activity: 'Menjalankan Kode pada Unit Test (Run Test Attempt)',
    category: 'Performance & Temporal Data',
    recordedData: 'attempt_number, test_passed_ratio, compile_status, execution_time_ms',
    exampleValue: 'Attempt #2, 4/4 Passed (100%), STATUS_OK, 24ms',
    analyticsPurpose: 'Mengukur akurasi fungsional kode mahasiswa terhadap berbagai edge-cases.'
  },
  {
    no: 5,
    activity: 'Mengalami Kesalahan Program (Compiler/Runtime Error)',
    category: 'Performance & Interaction Data',
    recordedData: 'error_type, error_line, error_message, time_to_fix_seconds',
    exampleValue: 'ReferenceError, Line 12, "j is not defined", 145s',
    analyticsPurpose: 'Mendeteksi titik miskonsepsi sintaksis atau logika yang paling sering menghambat mahasiswa.'
  },
  {
    no: 6,
    activity: 'Meminta Petunjuk Pemandu Bertingkat (Socratic Hint Request)',
    category: 'Feedback & Interaction Data',
    recordedData: 'hint_level_requested (1|2|3), time_since_last_edit, hint_id',
    exampleValue: 'Level 2, 180 seconds, HINT-NESTED-02',
    analyticsPurpose: 'Mengukur kemandirian belajar (Self-Regulated Learning) dan level bantuan yang dibutuhkan.'
  },
  {
    no: 7,
    activity: 'Menjawab Kuis Mikro Pemahaman Kode (Micro-Comprehension Check)',
    category: 'Performance & Cognitive Data',
    recordedData: 'question_id, selected_option, is_correct, response_latency_ms',
    exampleValue: 'mq-nested-1, opt-b (Distractor), FALSE, 8400ms',
    analyticsPurpose: 'Membedakan mahasiswa yang benar-benar paham alur kode vs yang hanya copy-paste solusi AI.'
  },
  {
    no: 8,
    activity: 'Finalisasi dan Submit Tugas (Final Submission)',
    category: 'Performance & Synthetic Score Data',
    recordedData: 'live_readiness_score, quadrant_classification, total_duration_min',
    exampleValue: 'Score: 34/100, Quadrant: "AI_DEPENDENT", 8.5 min',
    analyticsPurpose: 'Menyajikan kuadran kesiapan kelas untuk keputusan intervensi dosen/asdos sebelum ujian lab.'
  }
];

// Pertanyaan Learning Analytics (Sesuai Komponen 5.6 Tugas)
export const LEARNING_ANALYTICS_OPPORTUNITIES = [
  {
    no: 1,
    question: 'Mahasiswa mana yang mengalami "Ilusi Kompetensi AI" (kode lolos test case, namun tidak memiliki pemahaman konseptual untuk live coding)?',
    requiredData: 'Paste chunk length, organic typing ratio, time-to-first-pass, micro-comprehension quiz score.',
    method: 'Clustering & Discrepancy Analysis (K-Means / Decision Rules) mengukur deviasi antara Functional Success vs Cognitive Understanding.',
    educationalValue: 'Dosen dan asdos dapat mendeteksi sedini mungkin mahasiswa yang berisiko tinggi gagal pada ujian live-coding tatap muka di lab, sehingga intervensi bimbingan logika bisa segera dijadwalkan.'
  },
  {
    no: 2,
    question: 'Pada materi atau baris algoritma manakah mahasiswa paling sering mengalami hambatan kognitif (*wheel-spinning* / error berulang)?',
    requiredData: 'Error taxonomy (syntax vs logic vs edge-case), attempt counts per exercise, time-to-fix error, socratic hint escalation rate.',
    method: 'Sequential Pattern Mining & Error Frequency Distribution untuk melacak transisi state mahasiswa dari error menuju solusi.',
    educationalValue: 'Dosen dapat mengevaluasi efektivitas materi kuliah dan modul praktikum, lalu menjelaskan ulang subtopik spesifik (misal: loop termination atau pointer swapping) pada sesi review kelas berikutnya.'
  },
  {
    no: 3,
    question: 'Apakah intervensi Socratic Scaffolding berhasil menumbuhkan kemandirian pemecahan masalah dibandingkan pemberian jawaban langsung?',
    requiredData: 'Hint request level (1, 2, atau 3), post-hint code modification patterns, success rate on subsequent exercises without hints.',
    method: 'Comparative Time-Series & Pre/Post Scaffolding Cohort Analysis.',
    educationalValue: 'Membuktikan secara empiris bahwa bimbingan berbasis pertanyaan sokratik mempertahankan proses dekomposisi kognitif mahasiswa di era GenAI tanpa membuat mereka pasif.'
  }
];

// Pertimbangan Etika dan Privasi (Sesuai Komponen 5.7 Tugas)
export const PRIVACY_ETHICAL_CONSIDERATIONS = [
  {
    topic: 'Kebutuhan Data (Data Minimization)',
    explanation: 'Sistem hanya merekam data yang relevan dengan proses kognitif pemrograman (ketukan keyboard di dalam editor, teks yang dipaste di editor, waktu pengerjaan, dan respons kuis). Sistem TIDAK merekam riwayat tab browser luar, kamera, mikrofon, atau aktivitas di luar canvas pembelajaran.'
  },
  {
    topic: 'Perlindungan Identitas & Pseudonim',
    explanation: 'Pada tampilan analitik publik atau riset kelas, identitas mahasiswa dapat disamarkan menggunakan kode pseudonim (misal: Learner-042). Hanya dosen pengampu dan asdos penanggung jawab praktikum yang memiliki hak akses membuka mapping identitas untuk kebutuhan intervensi pendidikan.'
  },
  {
    topic: 'Transparansi Pengumpulan Data (Consent & Awareness)',
    explanation: 'Mahasiswa diberi tahu secara eksplisit melalui sensor telemetry bar di antarmuka bahwa editor merekam dinamika pengetikan dan permintaan petunjuk sebagai bagian dari evaluasi kesiapan live coding, bukan sebagai hukuman.'
  },
  {
    topic: 'Mencegah Pelabelan Negatif (Non-Discriminatory Labeling)',
    explanation: 'Kategori seperti "AI-Dependent" atau "Struggling Novice" bersifat sementara (dinamis per sesi latihan) dan digunakan strictly sebagai sinyal pedagogis untuk memberikan bimbingan tambahan, BUKAN sebagai predikat nilai permanen yang merugikan mahasiswa.'
  }
];
