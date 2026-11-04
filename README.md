# 🚀 SocraticCode: Learning Support System UI/UX for Learning Analytics

> **Mata Kuliah:** Educational Data Science (EDS)  
> **Tema Penugasan:** Learning Support System UI/UX Design for Learning Analytics  
> **Domain:** Pembelajaran Pemrograman & Analisis Proses Kognitif (*Computer Science Education*)  
> **Target Pengguna:** Mahasiswa Pemrograman Dasar & Asisten Dosen (Asdos) / Dosen Pengampu  

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Learning Analytics](https://img.shields.io/badge/Learning_Analytics-Educational_Data_Science-8B5CF6)](https://solaresearch.org/)

---

## 🌟 1. Latar Belakang & Identifikasi Masalah (Problem Identification)

### Fenomena: *"The Illusion of Competence" (Ilusi Paham Akibat GenAI)*
Dalam pembelajaran pemrograman era Generative AI (seperti ChatGPT, GitHub Copilot), mahasiswa sering kali mampu menghasilkan kode yang langsung berfungsi dan 100% lolos *unit test* hanya dalam hitungan detik (*prompt-and-paste*). 

Namun, terjadi **kesenjangan kognitif yang fatal**:
* **Bypass Proses Kognitif:** Mahasiswa melewatkan tahapan esensial seperti dekomposisi masalah, pemahaman alur eksekusi loop invariant, manajemen memori/pointer, dan debugging mandiri.
* **Kewalahan Saat *Live Coding*:** Saat diuji langsung di laboratorium tanpa bantuan AI luar, mahasiswa mengalami *blank* dan kesulitan menulis logika dasar secara mandiri.
* **Keterbatasan Asdos/Dosen (*Process-Blind*):** Dosen hanya menerima artefak kode final (*product-oriented*), tanpa memiliki data untuk mengetahui *bagaimana* mahasiswa sampai pada solusi tersebut.

### Solusi SocraticCode:
SocraticCode merancang antarmuka editor dan interaksi belajar sebagai **sensor telemetri kognitif (*Cognitive Trace Sensors*)**:
1. **Keystroke vs. Paste Telemetry:** Merekam dinamika ketukan keyboard organik dan mendeteksi penempelan blok kode masif secara instan.
2. **Socratic AI Scaffolding:** Asisten pedagogis bertingkat (Level 1 Konsep $\rightarrow$ Level 2 Alur Logika $\rightarrow$ Level 3 Edge-Case) yang menolak membocorkan kode jadi dan melatih pemikiran kritis.
3. **Micro-Comprehension Gatekeeper ("Explain-Your-Code"):** Mewajibkan mahasiswa menjawab kuis penalaran logika terkait kode yang baru mereka buat sebelum tugas dinyatakan selesai.
4. **Live-Coding Readiness Score (LCRS) & Matriks 4-Kuadran:** Memetakan kelas ke dalam 4 kuadran analitik untuk mendeteksi sedini mungkin mahasiswa yang mengalami ilusi kompetensi.

---

## 📱 2. Empat Layar Utama Sistem (UI/UX Modules)

1. **Student Dashboard:**
   * **📚 Modul Materi Kuliah (Interactive Reading & PDF Handout):** Kombinasi materi konsep yang dijabarkan langsung di platform dengan visualisasi algoritma & tombol unduh file PDF modul resmi dosen/asdos.
   * Meteran *Live-Coding Readiness Score* (LCRS) personal.
   * Modul latihan terstruktur (*Nested Loops, Two-Pointer, Recursion*).
   * Status transparansi sensor telemetri aktif (merekam durasi orientasi baca & akses materi).
2. **Learning Activity Page (Interactive Code Sensor):**
   * Tab Khusus **"Materi & PDF"** di samping deskripsi soal, memungkinkan mahasiswa membaca kembali teori atau mengunduh handout saat buntu koding.
   * Editor interaktif dengan pemantau ketukan keyboard, detektor *bulk paste*, dan penghitung jeda berpikir (*thinking pauses*).
   * Unit test runner dengan simulasi eksekusi *runtime* (ms).
   * Panel interaktif *Socratic AI Assistant* dengan tombol eskalasi bantuan bertingkat.
3. **Feedback & Micro-Comprehension Page:**
   * Ringkasan kelulusan test cases.
   * **Modul Explain-Your-Code:** Kuis logika berbobot untuk memverifikasi pemahaman alur program.
   * Telemetri kognitif sesi (Rasio ketukan organik, waktu pengerjaan, petunjuk terpakai).
4. **Lecturer / Asdos Dashboard & Task Studio (Learning Analytics Center):**
   * **🛠️ Task Authoring Studio:** Antarmuka khusus Asdos untuk menyusun dan mengunggah soal latihan praktikum baru. Mengonfigurasi batasan algoritma, unit tests (publik/hidden), 3 level scaffolding Sokrates, pertanyaan uji nalar logika anti-copas AI, serta mengkalibrasi ambang batas sensor telemetri.
   * **Matriks 4-Kuadran Interaktif:**
     * 🟢 *Kuadran 1: Independent Thinkers* (Siap Ujian Lab)
     * 🔴 *Kuadran 2: The AI-Dependent ("Ilusi Paham")* — Prioritas Intervensi Asdos!
     * 🟠 *Kuadran 3: Struggling Novices* (Butuh Bimbingan Asistensi)
     * 🟡 *Kuadran 4: Reflective Slow Pacers* (Pemahaman Kuat, Butuh Latihan Kecepatan)
   * Roster Mahasiswa dengan filter risiko.
   * **Event Timeline Replay Modal:** Rekonstruksi kronologis menit ke menit aktivitas mahasiswa.

---

## 📊 3. Spesifikasi Data Pembelajaran (Tabel 5.5 Tugas)

| No | Aktivitas Pengguna | Kategori Data | Data yang Direkam | Contoh Nilai |
|:--|:-------------------|:--------------|:------------------|:-------------|
| 1 | Membuka Halaman Latihan | Contextual & Temporal | `student_id, exercise_id, timestamp_open, session_id` | `std-02, nested-star-pattern, 10:14:00, SES-9921` |
| 2 | Mengetik Kode Organik | Interaction & Temporal | `keystroke_count, chars_added, typing_speed_cpm, pauses` | `142 keys, 160 cpm, [1.2s, 4.5s]` |
| 3 | Menempelkan Kode Masif | Behavioral & Interaction | `pasted_chars_length, lines_pasted, paste_timestamp` | `520 chars, 38 lines, 10:14:18` |
| 4 | Menjalankan Unit Test | Performance & Temporal | `attempt_number, test_passed_ratio, execution_time_ms` | `Attempt #2, 4/4 Passed (100%), 24ms` |
| 5 | Mengalami Compiler Error | Performance & Interaction | `error_type, error_line, time_to_fix_seconds` | `ReferenceError, Line 12, 145s` |
| 6 | Meminta Petunjuk Sokrates | Feedback & Interaction | `hint_level_requested (1,2,3), time_since_last_edit` | `Level 2, 180 seconds` |
| 7 | Menjawab Kuis Mikro | Cognitive & Performance | `question_id, selected_option, is_correct, latency_ms` | `mq-nested-1, opt-b, FALSE, 8400ms` |
| 8 | Submit Akhir Tugas | Performance & Synthetic | `live_readiness_score, quadrant_classification` | `Score: 34/100, Quadrant: "AI_DEPENDENT"` |

---

## 📈 4. Peluang Learning Analytics (Tabel 5.6 Tugas)

1. **Deteksi Ilusi Kompetensi AI:** Menggunakan *Discrepancy Clustering* antara keberhasilan fungsional (*test case pass*) dengan skor *micro-comprehension* dan rasio *paste chunk*.
2. **Identifikasi Hambatan Kognitif (*Wheel-Spinning*):** Menggunakan *Sequential Pattern Mining* pada log *compiler error* untuk menemukan subtopik yang memicu miskonsepsi berulang (*loop invariant, pointer swap*).
3. **Evaluasi Efektivitas Scaffolding Sokrates:** Menggunakan *Time-Series Comparative Cohort Analysis* untuk membuktikan peningkatan kemandirian belajar setelah diberikan pertanyaan pancingan bertingkat.

---

## 🔒 5. Privasi & Etika (Bab 5.7 Tugas)
* **Data Minimization:** Perekaman hanya dilakukan di canvas editor koding, tidak memantau aktivitas di luar browser atau perangkat keras pribadi.
* **Pseudonimisasi:** Data analitik dapat disamarkan menggunakan identifier acak (*Learner-042*) saat ditinjau untuk keperluan riset.
* **Transparansi:** Indikator sensor telemetri terlihat jelas oleh mahasiswa.
* **Non-Punitive Sinyal:** Klasifikasi kuadran digunakan untuk bimbingan edukatif asistensi, bukan vonis nilai permanen.

---

## 💻 6. Panduan Menjalankan Prototipe Secara Lokal

Pastikan Anda telah menginstal **Node.js** (v18+).

```bash
# 1. Clone repository
git clone https://github.com/sakhiasyam18/SocraticCode.git
cd SocraticCode

# 2. Install dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```

Buka peramban di `http://localhost:3000` (atau port yang tertera di terminal).

---

## 👥 Tim Pengembang
* **Asisten Dosen / Lead Developer:** Sakhi Asyam
* **Product & Learning Analytics Team:** EdTech Product Design Group
* **Mata Kuliah:** Educational Data Science (EDS)

