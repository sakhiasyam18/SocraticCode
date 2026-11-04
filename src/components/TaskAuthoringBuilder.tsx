import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Code2, 
  HelpCircle, 
  BrainCircuit, 
  Layers, 
  Send, 
  FileCode, 
  AlertCircle,
  Sliders,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Exercise, TestCase, SocraticHint } from '../types';

interface TaskAuthoringBuilderProps {
  onPublishTask: (newExercise: Exercise) => void;
  onCancel?: () => void;
}

export const TaskAuthoringBuilder: React.FC<TaskAuthoringBuilderProps> = ({ 
  onPublishTask, 
  onCancel 
}) => {
  // Preset Templates for Instant Demo
  const PRESET_TEMPLATES = [
    {
      name: 'Binary Search (Pencarian Biner O(log N))',
      topic: 'Searching & Divide-and-Conquer',
      difficulty: 'Medium' as const,
      description: 'Implementasikan fungsi `binarySearch(arr, target)` yang mencari indeks elemen `target` dalam array bilangan bulat terurut menaik `arr`. Jika elemen ditemukan, kembalikan indeksnya. Jika tidak ditemukan, kembalikan -1. Wajib mengimplementasikan logika pencarian biner dengan kompleksitas O(log N).',
      constraints: [
        '1 <= arr.length <= 10^5',
        'Array selalu terurut secara strictly ascending (tanpa duplikat)',
        'Dilarang menggunakan built-in `.indexOf()` atau `.find()`!'
      ],
      starterCode: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  
  // TODO: Tuliskan logika perulangan pemotongan ruang pencarian (mid)
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  return -1;
}`,
      sampleSolution: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      testCases: [
        { id: 1, input: 'arr = [1, 3, 5, 7, 9], target = 7', expectedOutput: '3', isHidden: false },
        { id: 2, input: 'arr = [2, 4, 6, 8, 10], target = 5', expectedOutput: '-1', isHidden: false },
        { id: 3, input: 'arr = [100], target = 100', expectedOutput: '0', isHidden: true },
      ],
      socraticHints: [
        {
          level: 1 as const,
          title: 'Tingkat 1: Konsep Divide-and-Conquer',
          question: 'Bagaimana cara menentukan titik tengah (`mid`) dan mengapa pencarian biner hanya bekerja pada array yang sudah terurut?',
          explanation: 'Karena array sudah terurut, jika target lebih besar dari elemen tengah, kamu bisa mengabaikan separuh kiri array sekaligus!'
        },
        {
          level: 2 as const,
          title: 'Tingkat 2: Pergeseran Pointer (low & high)',
          question: 'Ketika arr[mid] < target, pointer mana yang harus bergeser dan ke nilai berapa?',
          explanation: 'Karena elemen tengah masih lebih kecil dari target, maka nilai target pasti berada di separuh kanan, sehingga `low` harus maju menjadi `mid + 1`.'
        },
        {
          level: 3 as const,
          title: 'Tingkat 3: Kondisi Berhenti (Termination Condition)',
          question: 'Apa perbedaan mendasar antara `while (low < high)` dengan `while (low <= high)` saat array hanya berisi 1 elemen?',
          explanation: 'Gunakan `low <= high` agar elemen pada posisi saat `low == high` tetap diperiksa sebelum menyimpulkan target tidak ada.'
        }
      ],
      microQuestion: {
        id: 'mq-bs-1',
        codeSnippet: `let mid = Math.floor((low + high) / 2);
if (arr[mid] === target) {
  return mid;
} else if (arr[mid] < target) {
  low = mid + 1;
}`,
        question: 'Mengapa baris `low = mid + 1` menggunakan `mid + 1` dan bukan sekadar `low = mid`?',
        options: [
          {
            id: 'opt-bs-a',
            text: 'Karena arr[mid] sudah dipastikan BUKAN target, dan untuk mencegah terjadinya infinite loop saat low dan high hanya berselisih 1.',
            isCorrect: true,
            explanation: 'Tepat sekali! Menghindari loop tak hingga saat pembagian membulat ke bawah dan memangkas pencarian secara definitif.'
          },
          {
            id: 'opt-bs-b',
            text: 'Hanya konvensi penulisan JavaScript, tidak mempengaruhi logika algoritma.',
            isCorrect: false,
            explanation: 'Miskonsepsi parah! Menulis low = mid akan menyebabkan program mengalami freeze / infinite loop.'
          },
          {
            id: 'opt-bs-c',
            text: 'Untuk menghemat alokasi memori RAM browser.',
            isCorrect: false,
            explanation: 'Salah, ini adalah penanganan invariant batas pencarian, bukan optimasi RAM.'
          }
        ]
      }
    },
    {
      name: 'Valid Parentheses (Verifikasi Tanda Kurung dengan Stack)',
      topic: 'Struktur Data Stack & Parsing',
      difficulty: 'Easy' as const,
      description: 'Buat fungsi `isValidBracket(s)` yang menerima string tanda kurung `()[]{}`. Pastikan setiap tanda kurung buka memiliki pasangan tutup yang sesuai dan dalam urutan yang benar.',
      constraints: ['1 <= s.length <= 10^4', 'Hanya berisi karakter (, ), {, }, [, ]'],
      starterCode: `function isValidBracket(s) {
  const stack = [];
  // TODO: Gunakan prinsip LIFO Stack
  return true;
}`,
      sampleSolution: `function isValidBracket(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      testCases: [
        { id: 1, input: 's = "()"', expectedOutput: 'true', isHidden: false },
        { id: 2, input: 's = "()[]{}"', expectedOutput: 'true', isHidden: false },
        { id: 3, input: 's = "(]"', expectedOutput: 'false', isHidden: false },
        { id: 4, input: 's = "([)]"', expectedOutput: 'false', isHidden: true }
      ],
      socraticHints: [
        {
          level: 1 as const,
          title: 'Tingkat 1: Karakteristik LIFO',
          question: 'Tanda kurung buka mana yang harus ditutup terlebih dahulu ketika terjadi nested brackets seperti `({[]})`?',
          explanation: 'Tanda kurung buka yang paling terakhir masuk adalah yang harus paling pertama ditutup (Last In, First Out).'
        },
        {
          level: 2 as const,
          title: 'Tingkat 2: Operasi Push & Pop',
          question: 'Kapan kamu melakukan `.push()` dan kapan melakukan `.pop()` pada struktur data stack?',
          explanation: 'Lakukan `.push()` saat bertemu kurung buka, dan lakukan `.pop()` saat bertemu kurung tutup untuk dicocokkan.'
        },
        {
          level: 3 as const,
          title: 'Tingkat 3: Pengecekan Akhir (Sisa Elemen)',
          question: 'Jika seluruh string telah diproses, bagaimana kondisi array stack yang valid?',
          explanation: 'Stack harus kosong (`stack.length === 0`). Jika masih ada elemen, berarti ada kurung buka yang tidak memiliki pasangan.'
        }
      ],
      microQuestion: {
        id: 'mq-stack-1',
        codeSnippet: `return stack.length === 0;`,
        question: 'Mengapa pada akhir fungsi kita memeriksa `stack.length === 0` dan tidak langsung mengembalikan `true`?',
        options: [
          {
            id: 'opt-st-a',
            text: 'Untuk menangani kasus input seperti "(((" di mana ada kurung buka yang tidak pernah ditutup hingga akhir string.',
            isCorrect: true,
            explanation: 'Benar! Jika tidak dicek, string "(((" akan salah dianggap valid padahal tanda kurungnya menggantung.'
          },
          {
            id: 'opt-st-b',
            text: 'Untuk menghapus sisa garbage collection memori pada array.',
            isCorrect: false,
            explanation: 'Salah, ekspresi ini adalah perbandingan boolean, bukan pembersihan memori.'
          }
        ]
      }
    }
  ];

  // Form States
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [description, setDescription] = useState('');
  const [constraintsText, setConstraintsText] = useState('1 <= n <= 10^5\nDilarang menggunakan built-in function instan!');
  const [starterCode, setStarterCode] = useState(`function solution(input) {\n  // Tulis kode logikamu di sini\n  return input;\n}`);
  const [sampleSolution, setSampleSolution] = useState('');

  // Test Cases State
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: 'input = 5', expectedOutput: '10', isHidden: false },
    { id: 2, input: 'input = 0', expectedOutput: '0', isHidden: false },
    { id: 3, input: 'input = -1', expectedOutput: '-2', isHidden: true }
  ]);

  // Socratic Scaffolding State
  const [socraticHints, setSocraticHints] = useState<SocraticHint[]>([
    {
      level: 1,
      title: 'Tingkat 1: Pemahaman Konseptual',
      question: 'Apa langkah logika paling awal yang perlu diselesaikan?',
      explanation: 'Uraikan permasalahan menjadi sub-tugas kecil sebelum menyentuh sintaks kode.'
    },
    {
      level: 2,
      title: 'Tingkat 2: Dekomposisi Alur & Kontrol',
      question: 'Bagaimana kamu mengontrol batasan perulangan agar tidak terjadi off-by-one error?',
      explanation: 'Perhatikan kondisi batas awal dan akhir iterasi.'
    },
    {
      level: 3,
      title: 'Tingkat 3: Edge Case & Penanganan Ekstrem',
      question: 'Apa yang terjadi jika input yang diberikan bernilai 0 atau negatif?',
      explanation: 'Pastikan kode memiliki guard clause untuk mengantisipasi nilai ekstrim.'
    }
  ]);

  // Micro-Question State
  const [microSnippet, setMicroSnippet] = useState('let result = calculate(x);');
  const [microPrompt, setMicroPrompt] = useState('Apa fungsi utama dari pemanggilan fungsi pada baris di atas?');
  const [correctOptionText, setCorrectOptionText] = useState('Memproses nilai input menjadi output kuadratik.');
  const [distractorOptionText, setDistractorOptionText] = useState('Menghapus variabel x dari local storage browser.');

  // Telemetry Thresholds
  const [pasteAlertThreshold, setPasteAlertThreshold] = useState(120);
  const [expectedDurationMinutes, setExpectedDurationMinutes] = useState(15);

  // Active Authoring Tab
  const [currentStep, setCurrentStep] = useState<'meta' | 'tests' | 'socratic' | 'sensor'>('meta');

  // Load Preset
  const handleLoadPreset = (index: number) => {
    const p = PRESET_TEMPLATES[index];
    setTitle(p.name);
    setTopic(p.topic);
    setDifficulty(p.difficulty);
    setDescription(p.description);
    setConstraintsText(p.constraints.join('\n'));
    setStarterCode(p.starterCode);
    setSampleSolution(p.sampleSolution);
    setTestCases(p.testCases);
    setSocraticHints(p.socraticHints);
    setMicroSnippet(p.microQuestion.codeSnippet);
    setMicroPrompt(p.microQuestion.question);
    setCorrectOptionText(p.microQuestion.options[0]?.text || '');
    setDistractorOptionText(p.microQuestion.options[1]?.text || '');
  };

  // Add Test Case
  const handleAddTestCase = () => {
    const newId = testCases.length + 1;
    setTestCases(prev => [
      ...prev,
      { id: newId, input: `input = ${newId}`, expectedOutput: `${newId * 2}`, isHidden: false }
    ]);
  };

  // Remove Test Case
  const handleRemoveTestCase = (id: number) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id));
  };

  // Submit & Publish Task
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Mohon isi Judul Soal dan Deskripsi Latihan terlebih dahulu!');
      return;
    }

    const newExercise: Exercise = {
      id: `task-${Date.now().toString(36)}`,
      title: title.trim(),
      topic: topic.trim() || 'Pemrograman Terapan',
      difficulty: difficulty,
      description: description.trim(),
      constraints: constraintsText.split('\n').filter(c => c.trim().length > 0),
      starterCode: starterCode,
      sampleCodeSolution: sampleSolution || starterCode,
      testCases: testCases,
      socraticHints: socraticHints,
      microQuestion: {
        id: `mq-${Date.now()}`,
        codeSnippet: microSnippet,
        question: microPrompt,
        options: [
          {
            id: 'opt-correct',
            text: correctOptionText,
            isCorrect: true,
            explanation: 'Jawaban tepat! Membuktikan penalaran logika mandiri tanpa ilusi copas AI.'
          },
          {
            id: 'opt-distractor',
            text: distractorOptionText,
            isCorrect: false,
            explanation: 'Miskonsepsi! Mahasiswa yang sekadar menempel kode AI biasanya memilih jawaban keliru ini.'
          }
        ]
      }
    };

    onPublishTask(newExercise);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6 animate-fadeIn">
      
      {/* Header with Quick Preset Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Asdos Authoring Studio
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Sensory Task & Scaffolding Creator
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Unggah & Konfigurasi Latihan Praktikum Baru
          </h2>
          <p className="text-xs text-slate-400">
            Setiap latihan dilengkapi <strong className="text-indigo-400">sensor telemetri analitik</strong>, bimbingan Sokrates, dan gerbang anti-copas AI.
          </p>
        </div>

        {/* Quick Demo Presets */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 w-full lg:w-auto">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Preset Demo Asdos:
          </span>
          <div className="flex gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleLoadPreset(0)}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 text-[11px] font-bold transition-all"
            >
              Binary Search
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset(1)}
              className="px-2.5 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-500/40 text-[11px] font-bold transition-all"
            >
              Stack Brackets
            </button>
          </div>
        </div>
      </div>

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setCurrentStep('meta')}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 ${
            currentStep === 'meta'
              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-indigo'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">1</div>
          <div>
            <div className="font-extrabold">Info Soal</div>
            <div className="text-[10px] text-slate-500 font-normal">Deskripsi & Batasan</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep('tests')}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 ${
            currentStep === 'tests'
              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-indigo'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">2</div>
          <div>
            <div className="font-extrabold">Kode & Unit Test</div>
            <div className="text-[10px] text-slate-500 font-normal">{testCases.length} Kasus Uji</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep('socratic')}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 ${
            currentStep === 'socratic'
              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-indigo'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">3</div>
          <div>
            <div className="font-extrabold">Scaffold Sokrates</div>
            <div className="text-[10px] text-slate-500 font-normal">3 Level Hint</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep('sensor')}
          className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 ${
            currentStep === 'sensor'
              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-indigo'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">4</div>
          <div>
            <div className="font-extrabold">Uji Nalar & Sensor</div>
            <div className="text-[10px] text-slate-500 font-normal">Anti-Copas Gate</div>
          </div>
        </button>
      </div>

      <form onSubmit={handlePublish} className="space-y-6 pt-2">
        
        {/* STEP 1: Info Soal & Batasan */}
        {currentStep === 'meta' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Judul Soal Latihan Praktikum:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Implementasi Binary Search Iteratif..."
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Tingkat Kesulitan:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Easy', 'Medium', 'Hard'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDifficulty(lvl)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        difficulty === lvl
                          ? lvl === 'Easy' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' :
                            lvl === 'Medium' ? 'bg-amber-500/20 border-amber-500 text-amber-300' :
                            'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Topik / Submodul Kuliah:</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Misal: Searching & Algoritma Logaritmik"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Batasan Algoritma (Satu per baris):</label>
                <textarea
                  value={constraintsText}
                  onChange={(e) => setConstraintsText(e.target.value)}
                  rows={2}
                  placeholder="1 <= n <= 10^5&#10;Dilarang menggunakan built-in sort!"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Deskripsi Lengkap Masalah & Ekspektasi Solusi:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                placeholder="Jelaskan input, proses yang diharapkan, dan format output yang harus dihasilkan fungsi..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 leading-relaxed placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep('tests')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Lanjut ke Kode & Unit Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Starter Code & Test Cases */}
        {currentStep === 'tests' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  Template Kode Awal Mahasiswa (Starter Code):
                </label>
                <textarea
                  value={starterCode}
                  onChange={(e) => setStarterCode(e.target.value)}
                  rows={9}
                  className="w-full bg-[#080B12] border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  Solusi Kunci Jawaban Asdos (Reference Solution):
                </label>
                <textarea
                  value={sampleSolution}
                  onChange={(e) => setSampleSolution(e.target.value)}
                  rows={9}
                  placeholder="// Solusi referensi untuk verifikasi unit test..."
                  className="w-full bg-[#080B12] border border-slate-800 rounded-xl p-3 text-xs text-emerald-300 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Test Cases Editor */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Daftar Kasus Uji Otomatis (Unit Test Cases):
                </label>
                <button
                  type="button"
                  onClick={handleAddTestCase}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah Kasus Uji</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {testCases.map((tc, index) => (
                  <div key={tc.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-5 space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono">Input Parameter:</span>
                      <input
                        type="text"
                        value={tc.input}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTestCases(prev => prev.map(t => t.id === tc.id ? { ...t, input: val } : t));
                        }}
                        className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono"
                      />
                    </div>

                    <div className="sm:col-span-4 space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono">Expected Output:</span>
                      <input
                        type="text"
                        value={tc.expectedOutput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTestCases(prev => prev.map(t => t.id === tc.id ? { ...t, expectedOutput: val } : t));
                        }}
                        className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-300 font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-2 pt-4 sm:pt-0">
                      <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tc.isHidden}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setTestCases(prev => prev.map(t => t.id === tc.id ? { ...t, isHidden: val } : t));
                          }}
                          className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0"
                        />
                        <span>Hidden Test</span>
                      </label>
                    </div>

                    <div className="sm:col-span-1 text-right pt-2 sm:pt-0">
                      {testCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTestCase(tc.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep('meta')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ← Kembali
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep('socratic')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Lanjut ke Scaffold Sokrates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Socratic Scaffolding Hints (Level 1, 2, 3) */}
        {currentStep === 'socratic' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
              <strong>Prinsip Scaffolding Sokrates:</strong> Bimbingan tidak boleh memberikan potongan sintaks jadi. 
              Asisten Sokrates wajib menggunakan pertanyaan bergradasi untuk meregangkan nalar (*cognitive stretch*) mahasiswa.
            </div>

            <div className="space-y-3">
              {socraticHints.map((hint, idx) => (
                <div key={hint.level} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Petunjuk Level {hint.level}: {hint.title}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                      Sensory Trigger #{hint.level}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-semibold">Pertanyaan Pancingan Reflektif:</span>
                    <input
                      type="text"
                      value={hint.question}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSocraticHints(prev => prev.map(h => h.level === hint.level ? { ...h, question: val } : h));
                      }}
                      className="w-full bg-[#080B12] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-semibold">Penjelasan Konseptual (Tanpa Kode Jadi):</span>
                    <textarea
                      value={hint.explanation}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSocraticHints(prev => prev.map(h => h.level === hint.level ? { ...h, explanation: val } : h));
                      }}
                      rows={2}
                      className="w-full bg-[#080B12] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep('tests')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ← Kembali
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep('sensor')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Lanjut ke Sensor & Kuis Mikro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Micro-Comprehension Gatekeeper & Sensor Thresholds */}
        {currentStep === 'sensor' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                <BrainCircuit className="w-4 h-4 text-rose-400" />
                <span>Micro-Comprehension Gatekeeper (Anti-AI-Illusion Probe)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Sebelum mahasiswa dinyatakan tuntas latihan, sistem akan meng-highlight baris kodenya dan menanyakan pertanyaan logika ini. Jika mahasiswa hanya copy-paste dari ChatGPT tanpa paham alur, mereka akan terjebak memilih distractor di bawah!
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Potongan Baris Kode yang Di-Highlight:</label>
                <textarea
                  value={microSnippet}
                  onChange={(e) => setMicroSnippet(e.target.value)}
                  rows={2}
                  className="w-full bg-[#080B12] border border-slate-800 rounded-xl p-2.5 text-xs text-indigo-300 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Pertanyaan Pemahaman Penalaran Logika:</label>
                <input
                  type="text"
                  value={microPrompt}
                  onChange={(e) => setMicroPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                  <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Opsi Jawaban Benar (Menunjukkan Nalar Mandiri):
                  </label>
                  <textarea
                    value={correctOptionText}
                    onChange={(e) => setCorrectOptionText(e.target.value)}
                    rows={3}
                    className="w-full bg-[#080B12] border border-slate-800 rounded-xl p-2.5 text-xs text-emerald-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                  <label className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Opsi Distractor Miskonsepsi (Jebakan Copas AI):
                  </label>
                  <textarea
                    value={distractorOptionText}
                    onChange={(e) => setDistractorOptionText(e.target.value)}
                    rows={3}
                    className="w-full bg-[#080B12] border border-slate-800 rounded-xl p-2.5 text-xs text-rose-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Telemetry Sensor Configuration */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Kalibrasi Sensor Telemetri Kelas Asdos
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Ambang Batas Deteksi Bulk Paste (Karakter):</span>
                    <span className="font-mono text-cyan-300 font-bold">{pasteAlertThreshold} Chars</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={pasteAlertThreshold}
                    onChange={(e) => setPasteAlertThreshold(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500">Jika mahasiswa mem-paste &gt; {pasteAlertThreshold} karakter dalam 1 detik, analitik asdos otomatis membunyikan flag.</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Estimasi Waktu Pengerjaan Wajar:</span>
                    <span className="font-mono text-cyan-300 font-bold">{expectedDurationMinutes} Menit</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={expectedDurationMinutes}
                    onChange={(e) => setExpectedDurationMinutes(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500">Penyelesaian di bawah 1 menit akan diklasifikasikan sebagai anomali AI.</span>
                </div>
              </div>
            </div>

            {/* Final Publish Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep('socratic')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ← Kembali
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Batal
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-500 hover:from-cyan-500 hover:to-indigo-400 text-white font-extrabold text-xs shadow-glow-cyan transition-all transform hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Publikasikan Latihan ke Seluruh Kelas IF-A 🚀</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </form>

    </div>
  );
};
