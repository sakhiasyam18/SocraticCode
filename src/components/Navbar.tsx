import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  BarChart3, 
  UserCheck, 
  GraduationCap, 
  FileText,
  Activity,
  Flame,
  Code2
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: 'student-dashboard' | 'learning-activity' | 'feedback' | 'lecturer-dashboard';
  onNavigate: (tab: 'student-dashboard' | 'learning-activity' | 'feedback' | 'lecturer-dashboard') => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onNavigate,
  onOpenReportModal
}) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onNavigate(currentRole === 'student' ? 'student-dashboard' : 'lecturer-dashboard')}
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-glow-indigo">
              <div className="w-full h-full bg-[#0E131F] rounded-[10px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                <Code2 className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  Socratic<span className="text-indigo-400">Code</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  LA-EdTech
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Process Analytics & Live-Coding Scaffold
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>IF-2104 Pemrograman Dasar (Kelas Asdos A)</span>
          </div>
        </div>

        {/* Navigation Tabs based on Role */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {currentRole === 'student' ? (
            <>
              <button
                onClick={() => onNavigate('student-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'student-dashboard'
                    ? 'bg-indigo-600 text-white shadow-glow-indigo'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => onNavigate('learning-activity')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'learning-activity'
                    ? 'bg-indigo-600 text-white shadow-glow-indigo'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Latihan & Socrates</span>
              </button>
              <button
                onClick={() => onNavigate('feedback')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'feedback'
                    ? 'bg-indigo-600 text-white shadow-glow-indigo'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Feedback & Kuis</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('lecturer-dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 text-white shadow-glow-cyan"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Learning Analytics & Asdos Command</span>
            </button>
          )}
        </div>

        {/* Right Action: Report Export & Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Copy Report Button for Group mates */}
          <button
            onClick={onOpenReportModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 hover:border-indigo-500 transition-all shadow-sm"
            title="Buka Dokumen Laporan Tugas EDS untuk Teman Kelompok"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dokumen Tugas Kelompok</span>
          </button>

          {/* Role Toggle Switcher */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                onRoleChange('student');
                if (activeTab === 'lecturer-dashboard') onNavigate('student-dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.2 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'student'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mahasiswa</span>
            </button>
            <button
              onClick={() => {
                onRoleChange('lecturer');
                onNavigate('lecturer-dashboard');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.2 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'lecturer'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Asdos / Dosen</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

