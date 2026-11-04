import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Zap, 
  BookOpen, 
  HelpCircle, 
  TrendingUp, 
  BrainCircuit, 
  AlertTriangle,
  Download,
  FileText,
  FileCode,
  Sparkles
} from 'lucide-react';
import { EXERCISES, LEARNING_MATERIALS } from '../data/mockData';
import { Exercise, LearningMaterial } from '../types';
import { MaterialReaderModal } from './MaterialReaderModal';

interface StudentDashboardProps {
  onStartExercise: (exerciseId: string) => void;
  exercises?: Exercise[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  onStartExercise, 
  exercises = EXERCISES 
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(null);
  const [activeExerciseForMaterial, setActiveExerciseForMaterial] = useState<string | null>(null);
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Gen Z Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -bottom-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                Socratic Scaffolding Active
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Streak: 7 Hari
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Siap Asah Logika Kodingmu, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Raditya</span>? 🚀
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Di SocraticCode, kamu tidak dibiarkan sekadar copy-paste dari ChatGPT. 
              Sistem akan melatih dekomposisi logika dan kesiapan mentalmu menghadapi 
              <span className="text-indigo-300 font-semibold"> Ujian Live Coding di Lab</span>!
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onStartExercise(exercises[0]?.id || EXERCISES[0].id)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-indigo transition-all transform hover:-translate-y-0.5"
            >
              <Code2 className="w-4 h-4" />
              <span>Mulai Latihan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Live-Coding Readiness Score (LCRS) */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Metrik Kesiapan Asdos
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Siap Ujian Lab
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl font-black tracking-tight text-white">88%</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +14% minggu ini
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-200 mb-1">
            Live-Coding Readiness Score (LCRS)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Dihitung dari rasio pengetikan organik (92%) dan akurasi menjawab kuis pemahaman konsep (95%).
          </p>

          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-2.5 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>

        {/* Card 2: Cognitive Scaffolding Trace */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Jejak Berpikir (Cognitive Trace)
            </span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Pengetikan Organik vs Paste</span>
                <span className="text-indigo-400 font-mono">92% Organik</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Micro-Comprehension Check</span>
                <span className="text-emerald-400 font-mono">95% Lolos</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Tingkat Kemandirian Debugging</span>
                <span className="text-cyan-400 font-mono">Tinggi (Level 1 Hint)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Anti-AI-Illusion Protection Alert */}
        <div className="glass-panel rounded-3xl p-6 border border-indigo-500/20 bg-indigo-950/20 relative">
          <div className="flex items-center gap-2 mb-3 text-indigo-300">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            <h4 className="text-sm font-bold">Mengapa SocraticCode Berbeda?</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            "Kodingan yang tiba-tiba jadi lewat AI eksternal tidak membuatmu paham. Di sini, setiap baris kode yang kamu submit akan diverifikasi melalui <strong className="text-indigo-200">Uji Logika Reflektif</strong> sebelum tercatat tuntas."
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Sensor telemetry aktif merekam dinamika ketukan & jeda berpikir</span>
          </div>
        </div>

      </div>

      {/* Learning Materials & Lecture Notes Section (Combination of Interactive Reader & PDF Handouts) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Materi Kuliah & Modul Bacaan (Handout Resmi Dosen/Asdos)
            </h2>
            <p className="text-xs text-slate-400">
              Kombinasi materi dijabarkan secara interaktif di platform & modul PDF resmi yang dapat diunduh
            </p>
          </div>
          <div className="text-[11px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Aktivitas Membaca Direkam untuk Skor Kesiapan (LA #1)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LEARNING_MATERIALS.map((mat) => (
            <div 
              key={mat.id}
              className="glass-panel rounded-3xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {mat.topic}
                </span>
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {mat.readingTimeMinutes} Menit Baca
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {mat.summary}
                </p>
              </div>

              {/* Key topics badges */}
              <div className="flex flex-wrap gap-1.5">
                {mat.sections.map((sec, i) => (
                  <span key={i} className="text-[10px] text-slate-400 bg-[#080B12] px-2.5 py-1 rounded-lg border border-slate-800">
                    {sec.title}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Interactive Reading vs Download PDF */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setSelectedMaterial(mat);
                    // Match corresponding exercise if available
                    const matchedEx = exercises.find(e => e.topic.toLowerCase().includes(mat.topic.toLowerCase()) || e.title.toLowerCase().includes('pola'));
                    setActiveExerciseForMaterial(matchedEx?.id || exercises[0]?.id);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-indigo transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pelajari Konsep Interaktif</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedMaterial(mat);
                  }}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
                  title="Pratinjau & Unduh File PDF"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PDF ({mat.pdfFileSize})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercises Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Latihan Pemrograman Terstruktur (Modul Minggu ke-7)
            </h2>
            <p className="text-xs text-slate-400">
              Pilih tantangan untuk menguji kemampuan dekomposisi logikamu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exercises.map((ex, idx) => (
            <div 
              key={ex.id}
              className="glass-card-interactive rounded-3xl p-6 border border-slate-800 flex flex-col justify-between relative overflow-hidden"
            >
              {idx === 0 && exercises.length > 2 && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-cyan-400 text-[#090D14] font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current" />
                  Baru Ditugaskan Asdos
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {ex.topic}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    ex.difficulty === 'Easy' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {ex.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {ex.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {ex.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {ex.testCases.length} Unit Tests
                  </span>
                  <span className="text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-indigo-400" />
                    3 Level Petunjuk Socrates
                  </span>
                  <span className="text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <BrainCircuit className="w-3 h-3 text-cyan-400" />
                    Micro-Comprehension Gate
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                {ex.material && (
                  <button
                    onClick={() => {
                      setSelectedMaterial(ex.material || null);
                      setActiveExerciseForMaterial(ex.id);
                    }}
                    className="py-3 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
                    title="Baca Penjelasan Konsep & Unduh PDF Materi"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Materi & PDF</span>
                  </button>
                )}

                <button
                  onClick={() => onStartExercise(ex.id)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-indigo group"
                >
                  <span>Buka Editor & Koding</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Material & PDF Reader Modal */}
      {selectedMaterial && (
        <MaterialReaderModal
          material={selectedMaterial}
          isOpen={!!selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          onStartCoding={() => {
            if (activeExerciseForMaterial) {
              onStartExercise(activeExerciseForMaterial);
            }
          }}
        />
      )}

    </div>
  );
};

