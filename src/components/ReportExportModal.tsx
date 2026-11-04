import React, { useState } from 'react';
import { Copy, Check, FileText, Download, X } from 'lucide-react';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const REPORT_MARKDOWN = `# DOKUMEN PERANCANGAN SISTEM PENDUKUNG PEMBELAJARAN
# SocraticCode: Learning Support System UI/UX Design for Learning Analytics

**Domain:** Sistem Pendukung Pembelajaran Pemrograman & Analisis Kognitif
**Mata Kuliah:** Educational Data Science
**Target Pengguna:** Mahasiswa Pemrograman Dasar & Asisten Dosen (Asdos) / Dosen Pengampu

---

## 1. Problem Identification (Komponen 5.1)
- **Pengguna Utama:** 
  1. Mahasiswa peserta mata kuliah Pemrograman Dasar / Struktur Data.
  2. Asisten Dosen (Asdos) dan Dosen Pengampu praktikum.
- **Permasalahan Pembelajaran:** 
  Di era Generative AI (ChatGPT, GitHub Copilot), mahasiswa sering mengalami fenomena **"The Illusion of Competence" (Ilusi Paham)**. Mereka dapat menyelesaikan tugas pemrograman secara instan dengan *prompt-and-paste*, menghasilkan kode yang 100% lolos unit test. Namun, mereka mem-bypass proses kognitif krusial (dekomposisi masalah, pemahaman alur eksekusi, memori, dan debugging). Akibatnya, saat menghadapi sesi *live coding* tatap muka di lab tanpa akses AI eksternal, mahasiswa mengalami kebingungan (*blank* / *frustration*).
- **Mengapa Masalah Ini Penting:** 
  Asdos dan dosen selama ini hanya menilai artefak kode akhir (*product-oriented evaluation*), bukan proses berpikir mahasiswa (*process-blind*). Dosen tidak memiliki data untuk membedakan mana mahasiswa yang mandiri bernalar dan mana yang sekadar bergantung pada AI luar sebelum ujian praktikum terlambat.
- **Bagaimana SocraticCode Mengatasinya:** 
  SocraticCode menggeser paradigma dari evaluasi hasil akhir menjadi **Learning Analytics berbasis jejak proses kognitif (*Cognitive Trace Analytics*)**. Antarmuka editor dilengkapi sensor ketukan keyboard organik vs paste besar, asisten pedagogis Sokrates yang menolak memberi kode langsung melainkan menuntun logika alur, dan gerbang uji pemahaman mikro (*Micro-Comprehension Gate*) sebelum tugas dinyatakan selesai.

---

## 2. User Identification & User Needs (Komponen 5.2)
- **Student / Learner:**
  - *Kebutuhan:* Membutuhkan bimbingan saat buntu (*wheel-spinning*) tanpa langsung dibocorkan seluruh kodenya; membutuhkan kepastian apakah dirinya sudah benar-benar siap menghadapi ujian lab (*Live-Coding Readiness*).
  - *Fitur:* Socratic AI Assistant (bantuan bertingkat Level 1, 2, 3), sensor deteksi paste anomali, Micro-Comprehension Check ("Explain Your Code"), dan Live Readiness Gauge.
- **Lecturer / Asdos:**
  - *Kebutuhan:* Memerlukan fitur untuk mengunggah dan mengonfigurasi latihan praktikum baru yang dilengkapi sensor telemetri, mengatur kasus uji, menyusun 3 tingkat scaffolding Sokrates, serta merancang gerbang uji nalar logika anti-copas. Selain itu, asdos membutuhkan deteksi dini (*early-warning system*) terhadap mahasiswa yang mengalami ketergantungan AI eksternal sebelum ujian lab dimulai.
  - *Fitur:* **Task Authoring Studio (Sensory Task Builder)**, Matriks 4-Kuadran Kesiapan Mahasiswa, Event Timeline Replay per mahasiswa (jejak menit ke menit), dan tombol penjadwalan bimbingan 1-on-1 tatap muka.

---

## 3. User Flow (Komponen 5.3)

### Alur Mahasiswa (Student Flow):
\`\`\`text
Login → Dashboard Mahasiswa (Cek Status LCRS & Modul yang Ditugaskan Asdos) 
  → Buka Learning Activity Page (Membaca Soal & Constraints) 
  → Menulis Kode di Editor Interaktif (Sistem Merekam Keystroke vs Paste) 
  → Mengalami Keraguan / Error → Meminta Petunjuk Sokrates Bertingkat 
  → Menjalankan Unit Tests (Run Tests) 
  → Semua Test Case Lolos → Menjawab Kuis Mikro Pemahaman Logika (Explain-Your-Code Gate) 
  → Feedback & Update Live-Coding Readiness Score → Selesai.
\`\`\`

### Alur Asdos / Dosen (Lecturer Flow):
\`\`\`text
Login Asdos → Buka Lecturer Command Center 
  → [FITUR AUTHORING] Unggah & Konfigurasi Latihan Praktikum Baru:
      * Input Metadata Soal & Batasan Algoritma
      * Setup Starter Code & Hidden Unit Tests
      * Konfigurasi 3-Level Scaffolding Sokrates (Konsep -> Alur Logika -> Edge-Case)
      * Rancang Micro-Comprehension Gatekeeper (Soal nalar logika + distractor miskonsepsi copas)
      * Kalibrasi Ambang Batas Sensor (Paste threshold & durasi wajar)
  → Publikasikan Latihan ke Kelas Mahasiswa
  → Memantau Distribusi Matriks 4-Kuadran (Fokus pada Kuadran 2: The AI-Dependent) 
  → Membuka Event Timeline Replay Mahasiswa Terindikasi (Analisis rasio paste & kegagalan kuis mikro) 
  → Mengidentifikasi Topik Sulit (Misal: Loop Invariant pada Pola Bersarang) 
  → Mengambil Keputusan Pedagogis: Mengundang Mahasiswa untuk Bimbingan Tatap Muka 1-on-1.
\`\`\`

---

## 4. UI/UX Design Description (Komponen 5.4)
1. **Student Dashboard:** Menampilkan Live-Coding Readiness Score (LCRS) berbentuk meteran progresif, streak belajar, serta modul latihan terstruktur yang baru ditugaskan asdos. Dilengkapi indikator transparansi perekaman telemetri.
2. **Learning Activity Page:** Ruang kerja 3 kolom: Panel soal & batasan (kiri), Code Editor interaktif dengan sensor live keystroke/paste tracker & test runner (tengah), dan Socratic AI Assistant yang mendampingi dengan pertanyaan pancingan (kanan).
3. **Feedback & Micro-Comprehension Page:** Menampilkan hasil kelulusan unit test yang dikunci oleh gerbang kuis mikro: mahasiswa harus memilih penjelasan logika fungsi potongan kodenya sendiri untuk membuktikan pemahaman konseptual.
4. **Lecturer / Asdos Dashboard & Task Studio:** 
   - Pusat komando Learning Analytics berisi KPI kelas, visualisasi interaktif 4-Kuadran (Independent Thinker, The AI-Dependent, Struggling Novice, Slow Pacer), tabel roster mahasiswa dengan indikator risiko, dan modal *Timeline Event Replay*.
   - **Task Authoring Studio:** Antarmuka khusus asdos untuk menyusun latihan baru, mengkalibrasi sensor telemetri, dan mempublikasikannya ke seluruh kelas secara instan.

---

## 5. Learning Data Identification (Komponen 5.5 - Bobot 25%)

| No | Aktivitas Pengguna | Kategori Data | Data yang Direkam | Contoh Nilai |
|:--|:-------------------|:--------------|:------------------|:-------------|
| 1 | Membuka Halaman Latihan | Contextual & Temporal | \`student_id, exercise_id, timestamp_open, session_id\` | \`std-02, nested-star-pattern, 10:14:00, SES-9921\` |
| 2 | Mengetik Kode Organik | Interaction & Temporal | \`keystroke_count, typing_speed_cpm, pause_intervals\` | \`142 keys, 160 cpm, [1.2s, 4.5s, 0.8s]\` |
| 3 | Menempelkan Kode Masif | Behavioral & Interaction | \`pasted_chars_length, lines_pasted, paste_timestamp\` | \`520 chars, 38 lines, 10:14:18\` |
| 4 | Menjalankan Unit Test | Performance & Temporal | \`attempt_number, test_passed_ratio, execution_time_ms\` | \`Attempt #2, 4/4 Passed (100%), 24ms\` |
| 5 | Mengalami Compiler Error | Performance & Interaction | \`error_type, error_line, time_to_fix_seconds\` | \`ReferenceError, Line 12, 145s\` |
| 6 | Meminta Petunjuk Sokrates | Feedback & Interaction | \`hint_level_requested (1,2,3), time_since_last_edit\` | \`Level 2, 180 seconds\` |
| 7 | Menjawab Kuis Mikro | Cognitive & Performance | \`question_id, selected_option, is_correct, latency_ms\` | \`mq-nested-1, opt-b, FALSE, 8400ms\` |
| 8 | Submit Akhir Tugas | Performance & Synthetic | \`live_readiness_score, quadrant_classification\` | \`Score: 34/100, Quadrant: "AI_DEPENDENT"\` |

---

## 6. Learning Analytics Opportunities (Komponen 5.6 - Bobot 20%)

1. **Pertanyaan 1:** *Mahasiswa mana yang mengalami "Ilusi Kompetensi AI" (kode jalan, namun belum siap live coding di lab)?*
   - **Data Dibutuhkan:** \`pasted_chars_length\`, \`organicTypingRatio\`, \`time-to-first-pass\`, \`microComprehensionScore\`.
   - **Metode Analisis:** *Discrepancy Clustering* (memetakan disparitas antara keberhasilan fungsional unit test vs skor pemahaman penalaran logika).
   - **Manfaat Pendidikan:** Asdos dapat melakukan intervensi dini tatap muka sebelum mahasiswa gagal saat ujian lab langsung.

2. **Pertanyaan 2:** *Pada baris logika/materi apa mahasiswa mengalami hambatan kognitif (*wheel-spinning*) tertinggi?*
   - **Data Dibutuhkan:** Taksonomi error (\`syntax\` vs \`logic\`), frekuensi compile per menit, durasi waktu hingga perbaikan berhasil.
   - **Metode Analisis:** *Sequential Pattern Mining* & *Error Frequency Distribution*.
   - **Manfaat Pendidikan:** Dosen dapat mengevaluasi modul praktikum dan menjelaskan kembali konsep *loop invariant* atau *pointer swapping* di awal kelas kuliah berikutnya.

3. **Pertanyaan 3:** *Apakah bimbingan berbasis pertanyaan Sokrates efektif menumbuhkan penalaran mandiri dibanding jawaban instan?*
   - **Data Dibutuhkan:** Tingkat eskalasi petunjuk (Level 1 $\\rightarrow$ 2 $\\rightarrow$ 3) dan pola perubahan kode setelah membaca petunjuk.
   - **Metode Analisis:** *Time-Series Comparative Cohort Analysis*.
   - **Manfaat Pendidikan:** Memvalidasi secara empiris bahwa bimbingan bergradasi melatih resiliensi kognitif mahasiswa di era AI.

---

## 7. Privacy and Ethical Considerations (Komponen 5.7)
- **Data Minimization:** Sistem hanya merekam ketukan dan teks di dalam canvas editor latihan, tidak merekam webcam, mic, atau riwayat tab peramban luar.
- **Perlindungan Identitas:** Identitas mahasiswa disamarkan menggunakan kode pseudonim pada tampilan analisis kelompok publik; hanya asdos dan dosen mata kuliah yang memiliki kunci pemetaan.
- **Transparansi & Edukatif:** Perekaman sensor ditampilkan secara gamblang pada *telemetry ribbon* agar mahasiswa sadar proses belajarnya diamati.
- **Anti-Labeling:** Predikat "AI-Dependent" hanya berfungsi sebagai sinyal pedagogis untuk pendampingan belajar, bukan hukuman akademik permanen.
`;

export const ReportExportModal: React.FC<ReportExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(REPORT_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([REPORT_MARKDOWN], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "Laporan_Tugas_SocraticCode_EDS.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel-glow rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-indigo-500/40 space-y-5 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Dokumen Lengkap Laporan Tugas Kelompok (SocraticCode)
              </h3>
              <p className="text-xs text-slate-400">
                Format Markdown siap pakai untuk disalin teman kelompokmu ke Google Docs / Slides
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-300 font-medium">
            ✅ Mencakup seluruh Komponen 5.1 s.d. 5.7 sesuai rubrik penilaian 100 poin!
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-indigo transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Semua Teks'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Unduh .MD</span>
            </button>
          </div>
        </div>

        {/* Markdown Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-[#080B12] border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-indigo-600 selection:text-white">
          {REPORT_MARKDOWN}
        </div>

      </div>
    </div>
  );
};

