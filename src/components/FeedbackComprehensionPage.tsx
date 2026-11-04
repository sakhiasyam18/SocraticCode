import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  BrainCircuit, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  BarChart3, 
  Clock, 
  Keyboard, 
  ClipboardPaste,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { Exercise, SessionTelemetry } from '../types';

interface FeedbackComprehensionPageProps {
  exercise: Exercise;
  telemetry: SessionTelemetry;
  onBackToDashboard: () => void;
  onGoToLecturerDashboard: () => void;
}

export const FeedbackComprehensionPage: React.FC<FeedbackComprehensionPageProps> = ({
  exercise,
  telemetry,
  onBackToDashboard,
  onGoToLecturerDashboard
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const microQuestion = exercise.microQuestion;

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitVerification = () => {
    if (!selectedOptionId) return;

    const chosenOption = microQuestion.options.find(o => o.id === selectedOptionId);
    const correct = chosenOption?.isCorrect ?? false;
    
    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    if (correct) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Recalculate Live Readiness Score with quiz result
  const calculatedReadinessScore = isAnswerSubmitted
    ? (isCorrect 
        ? Math.min(100, telemetry.liveReadinessScore + 15) 
        : Math.max(20, telemetry.liveReadinessScore - 30))
    : telemetry.liveReadinessScore;

  const isAiDependentPattern = telemetry.pasteEventsCount > 0 && telemetry.pastedCharsTotal > 150 && (!isAnswerSubmitted || !isCorrect);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Celebration Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Semua Unit Test Berhasil Dilewati
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Kodingan Berhasil Berjalan! Tapi, Seberapa Paham Kamu? 🤔
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          Di SocraticCode, kelulusan unit test hanyalah 50% dari penilaian. 
          Selesaikan <strong className="text-indigo-400">Gerbang Uji Pemahaman Mikro</strong> berikut untuk memvalidasi kesiapan *live coding*-mu.
        </p>
      </div>

      {/* Main Verification Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 relative shadow-2xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">
                Micro-Comprehension Gatekeeper (Anti-AI-Illusion)
              </h3>
              <p className="text-[11px] text-slate-400">
                Pemeriksaan Penalaran Logika & Dekomposisi Algoritma
              </p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
            Wajib Dijawab
          </span>
        </div>

        {/* Question Prompt */}
        <div className="my-6 space-y-4">
          <p className="text-sm font-bold text-white">
            {microQuestion.question}
          </p>

          {/* Snippet highlighted */}
          <div className="p-4 rounded-2xl bg-[#090D14] border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
            {microQuestion.codeSnippet}
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3 pt-2">
            {microQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300';

              if (isAnswerSubmitted) {
                if (option.isCorrect) {
                  optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                } else {
                  optionStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-indigo-950/60 border-indigo-500 text-white ring-2 ring-indigo-500/40';
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-4 rounded-2xl border text-xs leading-relaxed cursor-pointer transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected 
                      ? 'border-indigo-400 bg-indigo-600 text-white' 
                      : 'border-slate-700 bg-slate-800'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{option.text}</p>
                    {isAnswerSubmitted && isSelected && (
                      <p className={`mt-2 pt-2 border-t text-[11px] ${
                        option.isCorrect ? 'border-emerald-500/30 text-emerald-300' : 'border-rose-500/30 text-rose-300'
                      }`}>
                        <strong>Analisis: </strong>{option.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitVerification}
            disabled={!selectedOptionId}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-glow-indigo transition-all disabled:opacity-50"
          >
            Kunci & Verifikasi Pemahaman Saya
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">
                    Pemahaman Terverifikasi: Mandiri & Siap Live Coding! 🎉
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-bold text-rose-300">
                    Peringatan: Terdeteksi Kesenjangan Pemahaman Logika!
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-300">
              {isCorrect 
                ? 'Analitik mencatat kamu benar-benar memahami peranan loop invariant pada kode ini. Skor kesiapan ujian lab-mu meningkat pesat.'
                : 'Meskipun kode lolos test case, kamu keliru memahami logika di baliknya. Ini indikator umum ketergantungan pada copas AI eksternal tanpa dekomposisi kognitif.'}
            </p>
          </div>
        )}

      </div>

      {/* Behavioral & Telemetry Summary Card */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-400" />
          Rangkuman Telemetri Kognitif Sesi Ini (Data Learning Analytics)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <div className="text-base font-extrabold text-white">
              {Math.floor(telemetry.timeSpentSeconds / 60)}m {telemetry.timeSpentSeconds % 60}s
            </div>
            <div className="text-[10px] text-slate-400">Waktu Penyelesaian</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <Keyboard className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
            <div className="text-base font-extrabold text-white">
              {telemetry.keystrokesCount}
            </div>
            <div className="text-[10px] text-slate-400">Ketukan Organik</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <ClipboardPaste className={`w-4 h-4 mx-auto mb-1 ${telemetry.pasteEventsCount > 0 ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className={`text-base font-extrabold ${telemetry.pasteEventsCount > 0 ? 'text-amber-300' : 'text-white'}`}>
              {telemetry.pastedCharsTotal} ({telemetry.pasteEventsCount}x)
            </div>
            <div className="text-[10px] text-slate-400">Karakter Paste Chunk</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <Sparkles className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <div className="text-base font-extrabold text-white">
              {telemetry.hintsUsedCount}/3
            </div>
            <div className="text-[10px] text-slate-400">Petunjuk Socrates</div>
          </div>
        </div>

        {/* Live Readiness Result Gauge */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400">Skor Kesiapan Live Coding Akhir:</div>
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              {calculatedReadinessScore}% / 100%
            </div>
          </div>

          <div className="text-xs text-slate-300 max-w-md">
            {isAiDependentPattern ? (
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Status: Kuadran 2 ("The AI-Dependent / Ilusi Paham"). Asdos menerima notifikasi untuk bimbingan logika tatap muka.
              </span>
            ) : (
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Status: Kuadran 1 ("Independent Thinker"). Kesiapan live coding di lab sangat prima!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onBackToDashboard}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
        >
          ← Kembali ke Dashboard Mahasiswa
        </button>

        <button
          onClick={onGoToLecturerDashboard}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-glow-cyan transition-all transform hover:scale-105"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Lihat Data Ini di Dashboard Asdos & Analitik ➔</span>
        </button>
      </div>

    </div>
  );
};

