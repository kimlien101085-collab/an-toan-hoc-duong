export type UserRole = 'student' | 'teacher' | 'admin';

export type LessonCategory = 'all' | 'bullying' | 'cyber' | 'skills';

export interface LessonMaterial {
  type: 'file' | 'drive' | 'link';
  name: string;
  url: string;
  uploadDate?: string;
  size?: string;
}

export type QuizQuestionType = 'single_choice' | 'true_false' | 'matching' | 'fill_blank';

export interface BaseQuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  explanation: string;
  hint?: string;
}

export interface SingleChoiceQuestion extends BaseQuizQuestion {
  type: 'single_choice';
  options: string[];
  correct: number;
}

export interface TrueFalseQuestion extends BaseQuizQuestion {
  type: 'true_false';
  statement: string;
  isTrue: boolean;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingQuestion extends BaseQuizQuestion {
  type: 'matching';
  pairs: MatchingPair[];
}

export interface FillBlankQuestion extends BaseQuizQuestion {
  type: 'fill_blank';
  sentenceBefore: string;
  sentenceAfter: string;
  correctWord: string;
  wordBank: string[];
}

export type QuizQuestion =
  | SingleChoiceQuestion
  | TrueFalseQuestion
  | MatchingQuestion
  | FillBlankQuestion;

export interface LessonGame {
  question?: string;
  options?: string[];
  correct?: number;
  explanation?: string;
  questions?: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  category: 'bullying' | 'cyber' | 'skills';
  duration: string;
  desc: string;
  objectives: string[];
  content: string[];
  game: LessonGame;
  summary: string[];
  message: string;
  material: LessonMaterial | null;
  completed?: boolean;
}

export type ReportSeverity = 'sos' | 'high' | 'medium' | 'low';

export type ReportStatus = 'pending' | 'processing' | 'resolved';

export interface EvidenceItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'file';
  name: string;
  url: string;
  size?: string;
}

export interface IncidentReport {
  id: string;
  isAnonymous: boolean;
  authorName: string;
  authorClass: string;
  location: string;
  severity: ReportSeverity;
  severityLabel: string;
  desc: string;
  evidences: EvidenceItem[];
  timestamp: string;
  status: ReportStatus;
  adminNotes?: string;
  resolvedAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
  source?: string;
}
