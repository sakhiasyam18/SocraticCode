import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  CheckCircle2, 
  Clock, 
  FileText, 
  X, 
  ExternalLink, 
  ArrowRight, 
  Code2, 
  Sparkles,
  ShieldCheck,
  Check,
  Layers,
  FileCheck
} from 'lucide-react';
import { LearningMaterial } from '../types';

interface MaterialReaderModalProps {
  material: LearningMaterial;
  isOpen: boolean;
  onClose: () => void;
  onStartCoding?: () => void;
}

export const MaterialReaderModal: React.FC<MaterialReaderModalProps> = ({
  material,
  isOpen,
  onClose,
  onStartCoding
}) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Timer for reading duration telemetry
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setReadingSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    // Generate text/markdown file pretending to be official PDF handout
    const handoutText = `================================================================================
KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
JURUSAN TEKNIK INFORMATIKA - LABORATORIUM PEMROGRAMAN DASAR
================================================================================

MODUL PERKULIAHAN & PRAKTIKUM
Kode Modul: ${material.id}
Judul: ${material.title}
Topik: ${material.topic}
Estimasi Waktu Baca: ${material.readingTimeMinutes} Menit
Status Dokumen: Handout Resmi Asdos (Disiapkan untuk Ujian Lab & Live Coding)

RINGKASAN EKSEKUTIF:
${material.summary}

--------------------------------------------------------------------------------
URAIAN MATERI PEMBELAJARAN
--------------------------------------------------------------------------------
${material.sections.map((sec, idx) => `
[BAB ${idx + 1}] ${sec.title}
${sec.content}

${sec.calloutNote ? `* CATATAN PENTING ASDOS: ${sec.calloutNote}` : ''}
${sec.codeSnippet ? `CONTOH IMPLEMENTASI:\n${sec.codeSnippet}\n` : ''}
`).join('\n--------------------------------------------------------------------------------\n')}

--------------------------------------------------------------------------------
POIN KUNCI YANG DIUJI DALAM LIVE CODING (TAKEAWAYS):
--------------------------------------------------------------------------------
${material.keyTakeaways.map((k, i) => `${i + 1}. ${k}`).join('\n')}

================================================================================
Generated via SocraticCode Learning Support System & Learning Analytics Engine
Data Akses Unduh Tercatat pada Sensor Telemetri Mahasiswa.
================================================================================
`;

    const blob = new Blob([handoutText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = material.pdfFileName.replace('.pdf', '_Handout.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  const formatReadTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="glass-panel-glow rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-indigo-500/40 space-y-5 max-h-[92vh] flex flex-col shadow-2xl animate-fadeIn">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                {material.topic}
              </span>
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                Est. Baca: {material.readingTimeMinutes} Menit
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {material.title}
            </h2>
            <p className="text-xs text-slate-400">
              Pelajari konsep teoretis ini sebelum menguji logika kodingmu di editor.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls & Format Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800">
          
          {/* Format Switcher */}
          <div className="flex items-center gap-1 bg-[#080B12] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'interactive'
                  ? 'bg-indigo-600 text-white shadow-glow-indigo'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Baca Interaktif</span>
            </button>

            <button
              onClick={() => setViewMode('pdf')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'pdf'
                  ? 'bg-indigo-600 text-white shadow-glow-indigo'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Pratinjau PDF Dosen</span>
            </button>
          </div>

          {/* Telemetry Reading Counter & Download PDF Button */}
          <div className="flex items-center gap-2 justify-end">
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 hidden md:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Waktu Baca: <strong className="text-white">{formatReadTime(readingSeconds)}</strong></span>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-glow-cyan transition-all"
              title="Unduh Handout PDF Lengkap"
            >
              {isDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>File Terunduh!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Modul ({material.pdfFileSize})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          
          {viewMode === 'interactive' ? (
            <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
              
              {/* Executive Summary */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200">
                <span className="font-bold text-white block mb-1">📌 Ringkasan Konsep Modul:</span>
                <p>{material.summary}</p>
              </div>

              {/* Sections Breakdown */}
              <div className="space-y-5">
                {material.sections.map((sec, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-600 text-white text-[11px] flex items-center justify-center font-mono">
                        {i + 1}
                      </span>
                      {sec.title}
                    </h3>

                    <p className="text-slate-300 leading-relaxed">{sec.content}</p>

                    {sec.codeSnippet && (
                      <div className="p-3.5 rounded-xl bg-[#080B12] border border-slate-800 font-mono text-cyan-300 text-[11px] whitespace-pre-wrap">
                        {sec.codeSnippet}
                      </div>
                    )}

                    {sec.calloutNote && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{sec.calloutNote}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Poin Kunci yang Wajib Dipahami untuk Ujian Praktikum:
                </h4>
                <ul className="space-y-1.5">
                  {material.keyTakeaways.map((k, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            /* PDF Document Viewer Mode */
            <div className="p-6 sm:p-8 rounded-2xl bg-[#080B12] border border-slate-800 space-y-6 font-mono text-xs text-slate-300 shadow-inner">
              
              <div className="border-b-2 border-slate-700 pb-4 flex justify-between items-start">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-sans">
                    Departemen Teknik Informatika • Modul Praktikum
                  </div>
                  <h3 className="text-sm font-bold text-white font-sans mt-0.5">{material.title}</h3>
                  <div className="text-[10px] text-cyan-400 mt-1">Dokumen Resmi: {material.pdfFileName}</div>
                </div>
                <div className="text-right text-[10px] text-slate-500">
                  <div>Versi: 2.1 (2026)</div>
                  <div>Halaman: 1 dari 4</div>
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs leading-relaxed text-slate-300">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-white block mb-1">Abstrak Pembelajaran:</span>
                  <p>{material.summary}</p>
                </div>

                {material.sections.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-bold text-indigo-300">{sec.title}</h4>
                    <p>{sec.content}</p>
                    {sec.codeSnippet && (
                      <pre className="p-3 rounded-lg bg-slate-950 font-mono text-cyan-300 text-[11px] overflow-x-auto">
                        {sec.codeSnippet}
                      </pre>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Terverifikasi oleh Asisten Dosen IF-2104</span>
                <span>Learning Telemetry Logged: Material Access Verified ✅</span>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Membaca materi dicatat di sensor telemetri untuk evaluasi pemahaman.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              Tutup
            </button>

            {onStartCoding && (
              <button
                onClick={() => {
                  onClose();
                  onStartCoding();
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-indigo transition-all transform hover:scale-105"
              >
                <span>Sudah Paham? Lanjut Koding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
