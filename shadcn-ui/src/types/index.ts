export interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  subTopics?: string[];
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  topicId: string;
  difficultyLevel: 'Basic' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTerms?: string[];
}

export interface UserProgress {
  userId: string;
  topicId: string;
  questionsAttempted: number;
  questionsCorrect: number;
  lastStudied: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  topicId: string;
  startTime: Date;
  endTime?: Date;
  questionsAttempted: number;
  questionsCorrect: number;
}