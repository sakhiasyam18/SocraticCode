import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { LearningActivityPage } from './components/LearningActivityPage';
import { FeedbackComprehensionPage } from './components/FeedbackComprehensionPage';
import { LecturerDashboard } from './components/LecturerDashboard';
import { ReportExportModal } from './components/ReportExportModal';
import { EXERCISES } from './data/mockData';
import { UserRole, SessionTelemetry, Exercise } from './types';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<'student-dashboard' | 'learning-activity' | 'feedback' | 'lecturer-dashboard'>('student-dashboard');
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(EXERCISES[0].id);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Active session telemetry
  const [currentTelemetry, setCurrentTelemetry] = useState<SessionTelemetry>({
    exerciseId: EXERCISES[0].id,
    startTime: Date.now() - 320000,
    keystrokesCount: 142,
    pasteEventsCount: 0,
    pastedCharsTotal: 0,
    organicCharsTyped: 142,
    thinkingPausesCount: 3,
    runCount: 2,
    compileErrorsCount: 1,
    hintsUsedCount: 1,
    timeSpentSeconds: 320,
    microComprehensionPassed: false,
    organicTypingRatio: 0.92,
    liveReadinessScore: 84
  });

  const activeExercise = exercises.find(e => e.id === selectedExerciseId) || exercises[0] || EXERCISES[0];

  const handleStartExercise = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    setActiveTab('learning-activity');
  };

  const handleFinishExercise = (telemetry: SessionTelemetry) => {
    setCurrentTelemetry(telemetry);
    setActiveTab('feedback');
  };

  const handleBackToDashboard = () => {
    setActiveTab('student-dashboard');
  };

  const handleGoToLecturerDashboard = () => {
    setCurrentRole('lecturer');
    setActiveTab('lecturer-dashboard');
  };

  const handleAddNewExercise = (newEx: Exercise) => {
    setExercises(prev => [newEx, ...prev]);
    setSelectedExerciseId(newEx.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D14] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Gen Z Ambient Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Main Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Page Content View Router */}
      <main className="flex-1 pb-16">
        {currentRole === 'student' ? (
          <>
            {activeTab === 'student-dashboard' && (
              <StudentDashboard 
                onStartExercise={handleStartExercise} 
                exercises={exercises}
              />
            )}

            {activeTab === 'learning-activity' && (
              <LearningActivityPage
                exercise={activeExercise}
                onFinishExercise={handleFinishExercise}
                onBackToDashboard={handleBackToDashboard}
              />
            )}

            {activeTab === 'feedback' && (
              <FeedbackComprehensionPage
                exercise={activeExercise}
                telemetry={currentTelemetry}
                onBackToDashboard={handleBackToDashboard}
                onGoToLecturerDashboard={handleGoToLecturerDashboard}
              />
            )}
          </>
        ) : (
          <LecturerDashboard 
            exercises={exercises}
            onAddNewExercise={handleAddNewExercise}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <p>SocraticCode • Educational Data Science & Learning Analytics Design Project • 2026</p>
      </footer>

      {/* Full Assignment Report Modal */}
      <ReportExportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}

export default App;

