export type UserRole = 'student' | 'lecturer';

export type QuadrantType = 
  | 'ready'          // High Independence, High Accuracy (Independent Master)
  | 'ai_dependent'   // Low Independence, High Accuracy (The AI-Dependent / "Ilusi Paham")
  | 'struggling'     // Low Independence, Low Accuracy (Struggling Novice)
  | 'slow_pacer';    // High Independence, Low/Medium Accuracy (Reflective Deliberate Pacer)

export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  isHidden?: boolean;
  executionTimeMs?: number;
}

export interface SocraticHint {
  level: 1 | 2 | 3;
  title: string;
  question: string;
  explanation: string;
}

export interface MicroComprehensionQuestion {
  id: string;
  codeSnippet: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface Exercise {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  constraints: string[];
  starterCode: string;
  sampleCodeSolution: string;
  testCases: TestCase[];
  socraticHints: SocraticHint[];
  microQuestion: MicroComprehensionQuestion;
}

export interface SessionTelemetry {
  exerciseId: string;
  startTime: number;
  keystrokesCount: number;
  pasteEventsCount: number;
  pastedCharsTotal: number;
  organicCharsTyped: number;
  thinkingPausesCount: number;
  runCount: number;
  compileErrorsCount: number;
  hintsUsedCount: number;
  timeSpentSeconds: number;
  microComprehensionPassed: boolean;
  organicTypingRatio: number; // 0 to 1
  liveReadinessScore: number; // 0 to 100
}

export interface ProcessEvent {
  id: string;
  timestamp: string;
  eventType: 
    | 'MATERIAL_OPEN' 
    | 'KEYSTROKE_BURST' 
    | 'PASTE_CHUNK' 
    | 'TEST_RUN' 
    | 'COMPILE_ERROR' 
    | 'SOCRATIC_HINT' 
    | 'MICRO_QUIZ' 
    | 'SUBMISSION';
  description: string;
  severity?: 'normal' | 'warning' | 'alert' | 'success';
  payload?: Record<string, any>;
}

export interface StudentAnalytics {
  id: string;
  nim: string;
  name: string;
  avatar: string;
  liveReadinessScore: number; // 0 - 100
  quadrant: QuadrantType;
  pasteChunkRatio: number; // %
  organicTypingRatio: number; // %
  microComprehensionScore: number; // %
  hintsUsedAverage: number;
  totalAttempts: number;
  lastActive: string;
  flaggedRisk: boolean;
  riskReason?: string;
  eventTimeline: ProcessEvent[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'socrates';
  text: string;
  timestamp: string;
  hintLevel?: number;
}
