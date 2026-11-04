import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  BrainCircuit, 
  Search, 
  Filter, 
  ExternalLink, 
  Clock, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Database, 
  Sparkles, 
  FileText, 
  Lock, 
  ChevronRight,
  ClipboardList,
  AlertCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { 
  MOCK_STUDENTS, 
  LEARNING_DATA_SPECIFICATION, 
  LEARNING_ANALYTICS_OPPORTUNITIES, 
  PRIVACY_ETHICAL_CONSIDERATIONS 
} from '../data/mockData';
import { StudentAnalytics, QuadrantType, ProcessEvent } from '../types';

export const LecturerDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'table-5-5' | 'table-5-6' | 'privacy'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuadrantFilter, setSelectedQuadrantFilter] = useState<QuadrantType | 'all'>('all');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentAnalytics | null>(null);

  // Filter students based on search and quadrant
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.nim.includes(searchQuery);
    const matchesQuadrant = selectedQuadrantFilter === 'all' || student.quadrant === selectedQuadrantFilter;
    return matchesSearch && matchesQuadrant;
  });

  const aiDependentCount = MOCK_STUDENTS.filter(s => s.quadrant === 'ai_dependent').length;
  const readyCount = MOCK_STUDENTS.filter(s => s.quadrant === 'ready').length;
  const strugglingCount = MOCK_STUDENTS.filter(s => s.quadrant === 'struggling').length;
  const slowPacerCount = MOCK_STUDENTS.filter(s => s.quadrant === 'slow_pacer').length;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Lecturer Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Learning Analytics Command Center
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Semester Genap 2026/2027
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Pemantauan & Analitik Asdos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Mendeteksi <span className="text-rose-400 font-semibold">Ilusi Kompetensi AI</span> & Memetakan Kesiapan *Live Coding* Mahasiswa
          </p>
        </div>

        {/* Quick Cohort Stats Badge */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex -space-x-2">
            {MOCK_STUDENTS.slice(0, 4).map(s => (
              <img key={s.id} src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
            ))}
          </div>
          <div className="text-xs font-medium pr-2">
            <span className="font-bold text-white">42 Mahasiswa</span>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              12 sedang koding live
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Mean Live Readiness Score */}
        <div className="glass-panel rounded-3xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Rata-Rata Kesiapan</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">68.4%</div>
          <p className="text-[11px] text-slate-400">
            Berdasarkan skor verifikasi pemahaman dan rasio ketukan mandiri.
          </p>
        </div>

        {/* KPI 2: AI-Dependent Alert (The Core Innovation) */}
        <div 
          onClick={() => setSelectedQuadrantFilter(selectedQuadrantFilter === 'ai_dependent' ? 'all' : 'ai_dependent')}
          className={`glass-panel rounded-3xl p-5 border cursor-pointer transition-all ${
            selectedQuadrantFilter === 'ai_dependent'
              ? 'border-rose-500 bg-rose-950/40 ring-2 ring-rose-500/50'
              : 'border-rose-500/30 bg-rose-950/10 hover:border-rose-500/60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-rose-300 uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
              Ilusi Paham AI
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px]">
              Target Asdos
            </span>
          </div>
          <div className="text-3xl font-extrabold text-rose-300 mb-1">{aiDependentCount} Mhs</div>
          <p className="text-[11px] text-rose-200/80">
            Kode 100% lolos unit test, tapi paste chunk &gt;80% & gagal di kuis logika.
          </p>
        </div>

        {/* KPI 3: Ready for Live Coding */}
        <div 
          onClick={() => setSelectedQuadrantFilter(selectedQuadrantFilter === 'ready' ? 'all' : 'ready')}
          className={`glass-panel rounded-3xl p-5 border cursor-pointer transition-all ${
            selectedQuadrantFilter === 'ready'
              ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/50'
              : 'border-slate-800 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Siap Ujian Lab</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-300 mb-1">{readyCount} Mhs</div>
          <p className="text-[11px] text-slate-400">
            Pengetikan organik &gt;85% dan lolos uji dekomposisi logika.
          </p>
        </div>

        {/* KPI 4: Struggling Novices */}
        <div 
          onClick={() => setSelectedQuadrantFilter(selectedQuadrantFilter === 'struggling' ? 'all' : 'struggling')}
          className={`glass-panel rounded-3xl p-5 border cursor-pointer transition-all ${
            selectedQuadrantFilter === 'struggling'
              ? 'border-amber-500 bg-amber-950/40 ring-2 ring-amber-500/50'
              : 'border-slate-800 hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <span>Perlu Asistensi</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300 mb-1">{strugglingCount} Mhs</div>
          <p className="text-[11px] text-slate-400">
            Banyak error berulang, aktif menggunakan scaffolding Socrates.
          </p>
        </div>

      </div>

      {/* Sub-Tabs: Navigation for Complete Assignment Requirements */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeSubTab === 'matrix'
              ? 'bg-cyan-600 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>Kuadran Kesiapan & Roster Mahasiswa</span>
        </button>

        <button
          onClick={() => setActiveSubTab('table-5-5')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeSubTab === 'table-5-5'
              ? 'bg-indigo-600 text-white shadow-glow-indigo'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Tabel 5.5: Learning Data Specification (25%)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('table-5-6')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeSubTab === 'table-5-6'
              ? 'bg-indigo-600 text-white shadow-glow-indigo'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Tabel 5.6: Learning Analytics Design (20%)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeSubTab === 'privacy'
              ? 'bg-indigo-600 text-white shadow-glow-indigo'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Bab 5.7: Privasi & Etika Data</span>
        </button>
      </div>

      {/* TAB 1: Matriks Kuadran & Roster Mahasiswa */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6">
          
          {/* Visual 4-Quadrant Scatter Map */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  Matriks 4-Kuadran: Kebebasan Kognitif vs Akurasi Fungsional
                </h3>
                <p className="text-xs text-slate-400">
                  Klik salah satu kuadran untuk memfilter daftar mahasiswa di bawah.
                </p>
              </div>

              {selectedQuadrantFilter !== 'all' && (
                <button
                  onClick={() => setSelectedQuadrantFilter('all')}
                  className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Tampilkan Semua Kuadran
                </button>
              )}
            </div>

            {/* The 4-Quadrant Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Top-Right: Ready for Live Coding (Independent Masters) */}
              <div 
                onClick={() => setSelectedQuadrantFilter('ready')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedQuadrantFilter === 'ready' 
                    ? 'bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/40' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    KUADRAN 1: Independent Thinkers
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    {readyCount} Mahasiswa
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Karakteristik: Pengetikan organik tinggi, jeda berpikir wajar, dan skor kuis pemahaman &gt;85%. Siap live coding di lab tanpa bantuan asdos.
                </p>
                <div className="flex -space-x-2">
                  {MOCK_STUDENTS.filter(s => s.quadrant === 'ready').map(s => (
                    <img key={s.id} src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" title={s.name} />
                  ))}
                </div>
              </div>

              {/* Bottom-Right: The AI-Dependent ("Ilusi Paham") -> HIGHLIGHTED IN RED */}
              <div 
                onClick={() => setSelectedQuadrantFilter('ai_dependent')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  selectedQuadrantFilter === 'ai_dependent' 
                    ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/50 shadow-glow-indigo' 
                    : 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    KUADRAN 2: The AI-Dependent ("Ilusi Paham")
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                    {aiDependentCount} Mahasiswa ⚠️
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Karakteristik: Unit test 100% lolos dalam waktu super cepat (&lt;45 detik), rasio paste chunk &gt;80%, namun gagal saat diuji kuis mikro. <strong>Prioritas intervensi 1-on-1 asdos!</strong>
                </p>
                <div className="flex -space-x-2">
                  {MOCK_STUDENTS.filter(s => s.quadrant === 'ai_dependent').map(s => (
                    <img key={s.id} src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover ring-1 ring-rose-500" title={s.name} />
                  ))}
                </div>
              </div>

              {/* Bottom-Left: Struggling Novices */}
              <div 
                onClick={() => setSelectedQuadrantFilter('struggling')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedQuadrantFilter === 'struggling' 
                    ? 'bg-amber-950/50 border-amber-500 ring-2 ring-amber-500/40' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    KUADRAN 3: Struggling Novices
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                    {strugglingCount} Mahasiswa
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Karakteristik: Berulang kali compile error pada topik loop/pointer, meminta Socrates hint Level 2-3. Berusaha keras tapi butuh bimbingan konsep dasar.
                </p>
                <div className="flex -space-x-2">
                  {MOCK_STUDENTS.filter(s => s.quadrant === 'struggling').map(s => (
                    <img key={s.id} src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" title={s.name} />
                  ))}
                </div>
              </div>

              {/* Top-Left: Deliberate Slow Pacers */}
              <div 
                onClick={() => setSelectedQuadrantFilter('slow_pacer')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedQuadrantFilter === 'slow_pacer' 
                    ? 'bg-cyan-950/50 border-cyan-500 ring-2 ring-cyan-500/40' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    KUADRAN 4: Reflective Slow Pacers
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                    {slowPacerCount} Mahasiswa
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Karakteristik: Mengetik perlahan dengan jeda berpikir panjang, tanpa copas. Pemahaman logika tinggi, hanya membutuhkan latihan repetisi kecepatan coding.
                </p>
                <div className="flex -space-x-2">
                  {MOCK_STUDENTS.filter(s => s.quadrant === 'slow_pacer').map(s => (
                    <img key={s.id} src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover" title={s.name} />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Student Roster Table with Process Deep-Dive Button */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Daftar Evaluasi Kesiapan Mahasiswa (Kelas A)
                </h3>
                <p className="text-xs text-slate-400">
                  Menampilkan {filteredStudents.length} dari {MOCK_STUDENTS.length} mahasiswa
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama atau NIM..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Mahasiswa</th>
                    <th className="py-3 px-3">Live Readiness</th>
                    <th className="py-3 px-3">Paste vs Ketik</th>
                    <th className="py-3 px-3">Kuis Pemahaman</th>
                    <th className="py-3 px-3">Socrates Hint</th>
                    <th className="py-3 px-3">Status Analisis</th>
                    <th className="py-3 px-3 text-right">Aksi Asdos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                          <div>
                            <div className="font-bold text-white">{student.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{student.nim}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${
                            student.liveReadinessScore >= 80 ? 'text-emerald-400' :
                            student.liveReadinessScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                          }`}>
                            {student.liveReadinessScore}%
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-slate-400">Paste: {student.pasteChunkRatio}%</span>
                            <span className="text-slate-300">Ketik: {student.organicTypingRatio}%</span>
                          </div>
                          <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-1.5 rounded-full ${student.pasteChunkRatio > 50 ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                              style={{ width: `${student.pasteChunkRatio}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`font-mono font-semibold ${
                          student.microComprehensionScore >= 80 ? 'text-emerald-400' :
                          student.microComprehensionScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {student.microComprehensionScore}%
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-300 font-mono">
                        {student.hintsUsedAverage} hint
                      </td>

                      <td className="py-3.5 px-3">
                        {student.quadrant === 'ai_dependent' && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            Ilusi Paham AI
                          </span>
                        )}
                        {student.quadrant === 'ready' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            Siap Live Coding
                          </span>
                        )}
                        {student.quadrant === 'struggling' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                            <HelpCircle className="w-3 h-3 text-amber-400" />
                            Butuh Asistensi
                          </span>
                        )}
                        {student.quadrant === 'slow_pacer' && (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            Reflektif
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedStudentForModal(student)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white font-bold text-[11px] transition-all flex items-center gap-1.5 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Jejak Proses</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Tabel 5.5 - Learning Data Specification (Bobot 25%) */}
      {activeSubTab === 'table-5-5' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                Komponen 5.5 Tugas (Bobot Nilai: 25%)
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Spesifikasi Data Pembelajaran (Learning Data Identification)
              </h2>
              <p className="text-xs text-slate-400">
                Data proses kognitif yang direkam oleh antarmuka sistem SocraticCode
              </p>
            </div>

            <button
              onClick={() => {
                const text = LEARNING_DATA_SPECIFICATION.map(
                  r => `No ${r.no} | Aktivitas: ${r.activity} | Kategori: ${r.category} | Data: ${r.recordedData} | Contoh: ${r.exampleValue} | Tujuan LA: ${r.analyticsPurpose}`
                ).join('\n\n');
                navigator.clipboard.writeText(text);
                alert('Tabel 5.5 berhasil disalin ke clipboard untuk laporan kelompokmu!');
              }}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Salin Tabel 5.5 untuk Laporan</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3 w-10">No</th>
                  <th className="py-3 px-3">Aktivitas Pengguna (UI Interaction)</th>
                  <th className="py-3 px-3">Kategori Data</th>
                  <th className="py-3 px-3">Data yang Direkam (Sensor Stream)</th>
                  <th className="py-3 px-3">Contoh Nilai</th>
                  <th className="py-3 px-3">Tujuan Learning Analytics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 font-medium">
                {LEARNING_DATA_SPECIFICATION.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 text-slate-500 font-bold">{row.no}</td>
                    <td className="py-3 px-3 font-bold text-white">{row.activity}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-cyan-300 text-[11px]">{row.recordedData}</td>
                    <td className="py-3 px-3 font-mono text-emerald-300 text-[11px]">{row.exampleValue}</td>
                    <td className="py-3 px-3 text-slate-300 text-[11px] leading-relaxed">{row.analyticsPurpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Tabel 5.6 - Learning Analytics Design (Bobot 20%) */}
      {activeSubTab === 'table-5-6' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                Komponen 5.6 Tugas (Bobot Nilai: 20%)
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Peluang dan Desain Learning Analytics (LA Opportunities)
              </h2>
              <p className="text-xs text-slate-400">
                Tiga pertanyaan kunci analitik data edukasi dan dampaknya bagi keputusan pengajaran dosen
              </p>
            </div>

            <button
              onClick={() => {
                const text = LEARNING_ANALYTICS_OPPORTUNITIES.map(
                  r => `LA-${r.no}: ${r.question}\nData: ${r.requiredData}\nMetode: ${r.method}\nManfaat: ${r.educationalValue}`
                ).join('\n\n');
                navigator.clipboard.writeText(text);
                alert('Tabel 5.6 berhasil disalin ke clipboard untuk laporan kelompokmu!');
              }}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Salin Tabel 5.6 untuk Laporan</span>
            </button>
          </div>

          <div className="space-y-4">
            {LEARNING_ANALYTICS_OPPORTUNITIES.map((opp) => (
              <div key={opp.no} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {opp.no}
                  </span>
                  <h3 className="text-sm font-extrabold text-white">{opp.question}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="font-bold text-cyan-300 block mb-1">Data yang Dibutuhkan:</span>
                    <p className="text-slate-300 font-mono text-[11px]">{opp.requiredData}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="font-bold text-purple-300 block mb-1">Metode Analisis yang Mungkin:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{opp.method}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="font-bold text-emerald-300 block mb-1">Potensi Manfaat Pendidikan:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{opp.educationalValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Bab 5.7 - Privasi & Etika Data */}
      {activeSubTab === 'privacy' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Komponen 5.7 & Bab 6 Panduan Tugas
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1">
              Pertimbangan Privasi, Etika & Kebijakan AI (Ethical Considerations)
            </h2>
            <p className="text-xs text-slate-400">
              Menjawab 5 pertanyaan wajib panduan tugas terkait etika dan perlindungan hak mahasiswa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRIVACY_ETHICAL_CONSIDERATIONS.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white">{item.topic}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
            <strong>Prinsip Inti EDS:</strong> "Rancangan tidak boleh mengasumsikan bahwa semua aktivitas digital merupakan bukti langsung kemampuan atau motivasi mahasiswa. Indikator di SocraticCode bertujuan membuka dialog edukatif antara asdos dan mahasiswa, bukan sebagai vonis hukuman sepihak."
          </div>
        </div>
      )}

      {/* Deep-Dive Process Replay Modal for Selected Student */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel-glow rounded-3xl max-w-2xl w-full p-6 border border-cyan-500/40 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedStudentForModal.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-cyan-500" />
                <div>
                  <h3 className="text-base font-extrabold text-white">{selectedStudentForModal.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">NIM: {selectedStudentForModal.nim}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
              >
                ✕
              </button>
            </div>

            {/* Diagnostic Alert Box */}
            {selectedStudentForModal.riskReason && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  Peringatan Deteksi Sistem Asdos:
                </div>
                <p>{selectedStudentForModal.riskReason}</p>
              </div>
            )}

            {/* Chronological Process Timeline Replay */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Jejak Kronologis Aktivitas (Event Timeline Replay)
              </h4>

              <div className="space-y-2.5 border-l-2 border-slate-800 ml-3 pl-4">
                {selectedStudentForModal.eventTimeline.map((ev) => (
                  <div key={ev.id} className="relative group text-xs">
                    <span className={`absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full ${
                      ev.severity === 'alert' ? 'bg-rose-500 ring-4 ring-rose-500/20' :
                      ev.severity === 'warning' ? 'bg-amber-500' :
                      ev.severity === 'success' ? 'bg-emerald-500' : 'bg-slate-600'
                    }`}></span>
                    <div className="font-mono text-[10px] text-slate-500">{ev.timestamp} • {ev.eventType}</div>
                    <div className="text-slate-200 font-medium">{ev.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asdos Action Decision */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  alert(`Jadwal bimbingan live coding 1-on-1 dengan ${selectedStudentForModal.name} telah dikirim ke Google Calendar Asdos.`);
                  setSelectedStudentForModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-sm"
              >
                Jadwalkan Bimbingan 1-on-1 di Ruang Asdos
              </button>
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

