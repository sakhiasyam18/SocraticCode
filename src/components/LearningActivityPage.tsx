import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Cpu, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Keyboard,
  ClipboardPaste,
  Timer,
  Terminal as TerminalIcon,
  MessageSquare
} from 'lucide-react';
import { Exercise, SessionTelemetry, ChatMessage, SocraticHint } from '../types';

interface LearningActivityPageProps {
  exercise: Exercise;
  onFinishExercise: (telemetry: SessionTelemetry) => void;
  onBackToDashboard: () => void;
}

export const LearningActivityPage: React.FC<LearningActivityPageProps> = ({
  exercise,
  onFinishExercise,
  onBackToDashboard
}) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [activeTab, setActiveTab] = useState<'problem' | 'testcases'>('problem');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ id: number; passed: boolean; actual: string; timeMs: number }>>([]);
  const [allTestsPassed, setAllTestsPassed] = useState(false);

  // Telemetry sensor state (Simulated & Real Tracking)
  const [keystrokes, setKeystrokes] = useState(0);
  const [pasteEvents, setPasteEvents] = useState(0);
  const [pastedChars, setPastedChars] = useState(0);
  const [thinkingPauses, setThinkingPauses] = useState(1);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [lastPasteAlert, setLastPasteAlert] = useState<string | null>(null);
  const [socraticLevel, setSocraticLevel] = useState<number>(0);

  // Chat with Socrates
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'socrates',
      text: `Halo! Saya Socrates AI, pendamping belajarmu. Saya tidak akan memberi kode jadi, melainkan menuntunmu memahami struktur logikanya secara mandiri. Ada yang ingin kamu diskusikan tentang soal "${exercise.title}"?`,
      timestamp: 'Baru saja'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Keystroke listener on editor
  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift') {
      setKeystrokes(prev => prev + 1);
    }
  };

  // Paste detector on editor (Captures the AI Illusion attempt!)
  const handleEditorPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const length = pastedText.length;
    
    setPasteEvents(prev => prev + 1);
    setPastedChars(prev => prev + length);

    if (length > 100) {
      setLastPasteAlert(`⚠️ Deteksi Paste Masif: ${length} karakter ditempel sekaligus! Log sensor mencatat potensi penggunaan AI eksternal.`);
    }
  };

  // Demo simulator button for the presentation: Simulates typical AI copy-paste
  const handleSimulateAiPaste = () => {
    setCode(exercise.sampleCodeSolution);
    setPasteEvents(prev => prev + 1);
    setPastedChars(prev => prev + exercise.sampleCodeSolution.length);
    setLastPasteAlert(`🚨 DEMO PRESTASI: Terdeteksi penempelan 1 file kode utuh (${exercise.sampleCodeSolution.length} karakter)! Flag "Ilusi Paham AI" aktif.`);
  };

  // Run Test Cases
  const handleRunTests = () => {
    setIsRunningTests(true);
    setTestResults([]);

    setTimeout(() => {
      // Evaluate mock test cases
      const results = exercise.testCases.map((tc, idx) => ({
        id: tc.id,
        passed: true,
        actual: tc.expectedOutput,
        timeMs: Math.floor(Math.random() * 15) + 8
      }));

      setTestResults(results);
      setIsRunningTests(false);
      setAllTestsPassed(true);
    }, 1200);
  };

  // Request Socratic Hint
  const handleRequestHint = (hint: SocraticHint) => {
    setSocraticLevel(hint.level);
    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: `Minta petunjuk ${hint.title}`,
      timestamp: 'Baru saja'
    };

    const socratesMsg: ChatMessage = {
      id: `msg-s-${Date.now()}`,
      sender: 'socrates',
      text: `[${hint.title}]\n\n❓ Pertanyaan Pemandu: "${hint.question}"\n\n💡 Petunjuk Konsep: ${hint.explanation}`,
      timestamp: 'Baru saja',
      hintLevel: hint.level
    };

    setMessages(prev => [...prev, userMsg, socratesMsg]);
  };

  // Send custom message to Socrates
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Baru saja'
    };

    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();
      if (lower.includes('error') || lower.includes('salah')) {
        reply = 'Mari periksa baris demi baris: Nilai variabel apa yang berubah saat eksekusi mencapai baris tersebut? Coba telusuri (trace) di kertas sebelum kamu mengubah kode.';
      } else if (lower.includes('buntu') || lower.includes('bingung')) {
        reply = 'Wajar sekali jika buntu! Jangan panik. Coba sederhanakan masalahnya: jika input n = 2 saja, keluaran baris 1 apa? Baris 2 apa? Bisakah kamu tuliskan polanya dulu?';
      } else {
        reply = 'Menarik! Menurutmu, bagaimana pengaruh modifikasi tersebut terhadap efisiensi memori dan batasan perulangan (loop condition)?';
      }

      setMessages(prev => [...prev, {
        id: `msg-s-${Date.now()}`,
        sender: 'socrates',
        text: reply,
        timestamp: 'Baru saja'
      }]);
    }, 800);
  };

  // Proceed to Micro-Comprehension Gate
  const handleProceedToVerification = () => {
    const totalChars = keystrokes + pastedChars;
    const organicRatio = totalChars > 0 ? (keystrokes / totalChars) : 1;
    
    // Calculate synthetic readiness score
    let readiness = 80;
    if (pasteEvents > 0 && pastedChars > 200) readiness -= 35;
    if (socraticLevel > 0) readiness += 10;
    if (readiness < 25) readiness = 25;
    if (readiness > 98) readiness = 98;

    const telemetry: SessionTelemetry = {
      exerciseId: exercise.id,
      startTime: Date.now() - (secondsSpent * 1000),
      keystrokesCount: keystrokes,
      pasteEventsCount: pasteEvents,
      pastedCharsTotal: pastedChars,
      organicCharsTyped: keystrokes,
      thinkingPausesCount: thinkingPauses,
      runCount: 1,
      compileErrorsCount: 0,
      hintsUsedCount: socraticLevel,
      timeSpentSeconds: secondsSpent,
      microComprehensionPassed: false,
      organicTypingRatio: organicRatio,
      liveReadinessScore: Math.round(readiness)
    };

    onFinishExercise(telemetry);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-6 space-y-4">
      
      {/* Top Bar: Problem Title & Telemetry Sensor Ribbon */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToDashboard}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            ← Kembali
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">{exercise.title}</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {exercise.topic}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Modul Praktikum Berbasis Learning Analytics
            </p>
          </div>
        </div>

        {/* Live Process Telemetry Sensors */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Timer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Durasi: <strong className="text-white">{formatTime(secondsSpent)}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ketik: <strong className="text-white">{keystrokes}</strong></span>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border ${
            pasteEvents > 0 
              ? 'bg-rose-950/40 border-rose-600/50 text-rose-300 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}>
            <ClipboardPaste className="w-3.5 h-3.5 text-amber-400" />
            <span>Paste Chunk: <strong className="text-white">{pastedChars} char ({pasteEvents}x)</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Socrates Hint: <strong className="text-white">{socraticLevel}/3</strong></span>
          </div>
        </div>

      </div>

      {/* Paste Alert Banner if detected */}
      {lastPasteAlert && (
        <div className="bg-amber-950/40 border border-amber-600/40 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{lastPasteAlert}</span>
          </div>
          <button 
            onClick={() => setLastPasteAlert(null)}
            className="text-amber-400 hover:text-white font-bold ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Workspace: 3 Columns Grid (Problem, Code Editor, Socratic Assistant) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[640px]">
        
        {/* Column 1: Problem Description & Constraints (4 Cols) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          
          <div className="flex items-center border-b border-slate-800 bg-slate-900/60 p-2 gap-2">
            <button
              onClick={() => setActiveTab('problem')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'problem'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Deskripsi Soal
            </button>
            <button
              onClick={() => setActiveTab('testcases')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'testcases'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kasus Uji ({exercise.testCases.length})
            </button>
          </div>

          <div className="p-5 flex-1 overflow-y-auto space-y-5 text-slate-300 text-xs leading-relaxed">
            {activeTab === 'problem' ? (
              <>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-sm text-white">Petunjuk Pengerjaan:</h3>
                  <p>{exercise.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-slate-200">Batasan (Constraints):</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                    {exercise.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Educational Goal Note */}
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 text-[11px] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    Tujuan Pembelajaran:
                  </div>
                  <p>
                    Melatih abstraksi loop invariant. Jangan gunakan fungsi instan agar proses berpikirmu terekam oleh analitik asdos.
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <h4 className="font-bold text-slate-200">Test Cases Validation:</h4>
                {exercise.testCases.map((tc) => (
                  <div key={tc.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 font-mono">
                    <div className="flex justify-between text-[11px] text-slate-400 font-sans">
                      <span>Test Case #{tc.id}</span>
                      {tc.isHidden && <span className="text-amber-400 font-semibold">[Hidden]</span>}
                    </div>
                    <div className="text-[11px]">
                      <span className="text-slate-400 font-sans">Input: </span>
                      <span className="text-cyan-300">{tc.input}</span>
                    </div>
                    <div className="text-[11px]">
                      <span className="text-slate-400 font-sans">Expected: </span>
                      <span className="text-emerald-300 whitespace-pre-wrap">{tc.expectedOutput}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Demo Assist Button (Presentation Feature) */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/50">
            <button
              onClick={handleSimulateAiPaste}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
              title="Klik ini untuk mensimulasikan mahasiswa yang menempel kode AI jadi saat presentasi"
            >
              <ClipboardPaste className="w-3.5 h-3.5" />
              <span>Simulasikan Paste Kode AI (Demo Asdos)</span>
            </button>
          </div>

        </div>

        {/* Column 2: Code Editor & Test Runner (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-200 font-mono">solution.js</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCode(exercise.starterCode);
                  setTestResults([]);
                  setAllTestsPassed(false);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                title="Reset Kode"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={handleRunTests}
                disabled={isRunningTests}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-emerald transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunningTests ? 'Menguji...' : 'Jalankan Kode'}</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with Real Keystroke & Paste Event Listeners */}
          <div className="relative flex-1 bg-[#090D14] flex">
            {/* Line numbers dummy */}
            <div className="w-10 py-4 bg-[#070A10] border-r border-slate-800 text-slate-600 font-mono text-xs select-none text-right pr-2 space-y-1">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleEditorKeyDown}
              onPaste={handleEditorPaste}
              spellCheck={false}
              className="flex-1 w-full h-full p-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-indigo-600/40"
              placeholder="// Tuliskan solusi logikamu di sini..."
            />
          </div>

          {/* Test Runner Output Area */}
          <div className="border-t border-slate-800 bg-slate-950/90 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                Hasil Uji Coba Unit Test:
              </span>
              {testResults.length > 0 && (
                <span className="text-[11px] font-mono text-slate-400">
                  {testResults.filter(r => r.passed).length}/{testResults.length} Berhasil
                </span>
              )}
            </div>

            {isRunningTests && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 py-2">
                <span className="w-3 h-3 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin"></span>
                <span>Menjalankan unit test dan menganalisis pola eksekusi...</span>
              </div>
            )}

            {!isRunningTests && testResults.length > 0 && (
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {testResults.map(res => (
                  <div key={res.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Test Case #{res.id}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span>Runtime: {res.timeMs}ms</span>
                      <span className="text-emerald-400 font-bold font-sans">PASSED</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isRunningTests && testResults.length === 0 && (
              <p className="text-[11px] text-slate-500 italic">
                Klik tombol "Jalankan Kode" untuk memverifikasi logika algoritmamu terhadap test cases.
              </p>
            )}

            {/* If all passed -> Button to go to Micro-Comprehension Gate */}
            {allTestsPassed && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Semua Unit Test Lolos! 🎉</span>
                </div>
                <button
                  onClick={handleProceedToVerification}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-indigo transition-all transform hover:scale-105"
                >
                  <span>Verifikasi Pemahaman Logika</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Column 3: Socratic AI Assistant & Cognitive Scaffolding (4 Cols) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          
          {/* Socratic Assistant Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Socrates AI Tutor</h3>
                <p className="text-[10px] text-slate-400">Scaffolded Socratic Assistance</p>
              </div>
            </div>

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
              Pedagogical Sensor
            </span>
          </div>

          {/* Socratic Scaffolding Escalation Buttons */}
          <div className="p-3 bg-slate-950/60 border-b border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
              <span>Minta Bantuan Bertingkat:</span>
              <span className="text-[10px] text-indigo-400">Level {socraticLevel}/3 Digunakan</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5">
              {exercise.socraticHints.map((hint) => (
                <button
                  key={hint.level}
                  onClick={() => handleRequestHint(hint)}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-center leading-tight ${
                    socraticLevel >= hint.level
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lv {hint.level}: {hint.level === 1 ? 'Konsep' : hint.level === 2 ? 'Logika' : 'Edge'}
                </button>
              ))}
            </div>
          </div>

          {/* Dialogue Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[88%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.sender === 'user' ? 'Kamu' : 'Socrates AI'} • {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Chat Chips & Input */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/80 space-y-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
              <button 
                onClick={() => setInputMessage('Bagaimana cara men-debug perulangan yang salah?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-colors"
              >
                🔍 Cara trace loop?
              </button>
              <button 
                onClick={() => setInputMessage('Kenapa program saya menghasilkan baris berlebih?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-colors"
              >
                ⚠️ Baris berlebih?
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanyakan kebingungan logikamu..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
