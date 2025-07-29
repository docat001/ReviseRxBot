import React, { createContext, useContext, useState, useEffect } from 'react';
import { Topic, Question, GlossaryTerm, ChatMessage, StudySession, UserProgress } from '@/types';
import { topics, questions, glossaryTerms, generateSampleQuestions, categories } from '@/data/medical-data';

interface ReviseRxContextType {
  // Data
  topics: Topic[];
  questions: Question[];
  glossaryTerms: GlossaryTerm[];
  categories: string[];
  chatHistory: ChatMessage[];
  
  // Selected states
  selectedCategory: string | null;
  selectedTopic: Topic | null;
  selectedDifficulty: string | null;
  
  // Study sessions
  currentSession: StudySession | null;
  userProgress: UserProgress[];
  
  // Search
  searchQuery: string;
  searchResults: {
    topics: Topic[];
    questions: Question[];
    glossaryTerms: GlossaryTerm[];
  };
  
  // Actions
  setSelectedCategory: (category: string | null) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  setSelectedDifficulty: (difficulty: string | null) => void;
  setSearchQuery: (query: string) => void;
  sendChatMessage: (content: string) => void;
  startStudySession: (topicId: string) => void;
  endStudySession: (questionsAttempted: number, questionsCorrect: number) => void;
}

const ReviseRxContext = createContext<ReviseRxContextType | undefined>(undefined);

export const useReviseRx = () => {
  const context = useContext(ReviseRxContext);
  if (context === undefined) {
    throw new Error('useReviseRx must be used within a ReviseRxProvider');
  }
  return context;
};

export const ReviseRxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for all the main data
  const [allTopics, setAllTopics] = useState<Topic[]>(topics);
  const [allQuestions, setAllQuestions] = useState<Question[]>(questions);
  const [allGlossaryTerms] = useState<GlossaryTerm[]>(glossaryTerms);
  
  // Selected states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  // Chat history
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  // Study session
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  
  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    topics: Topic[];
    questions: Question[];
    glossaryTerms: GlossaryTerm[];
  }>({
    topics: [],
    questions: [],
    glossaryTerms: []
  });
  
  // Generate more questions for topics if needed
  useEffect(() => {
    const additionalQuestions: Question[] = [];
    allTopics.forEach(topic => {
      // Check if the topic has fewer than 10 questions
      const topicQuestions = allQuestions.filter(q => q.topicId === topic.id);
      if (topicQuestions.length < 10) {
        additionalQuestions.push(...generateSampleQuestions(topic.id, 10 - topicQuestions.length));
      }
    });
    if (additionalQuestions.length > 0) {
      setAllQuestions(prev => [...prev, ...additionalQuestions]);
    }
  }, [allTopics]);
  
  // Filter topics based on selected category
  const filteredTopics = selectedCategory 
    ? allTopics.filter(topic => topic.category === selectedCategory)
    : allTopics;
    
  // Filter questions based on selected topic and difficulty
  const filteredQuestions = selectedTopic
    ? allQuestions.filter(
        q => q.topicId === selectedTopic.id && 
        (selectedDifficulty ? q.difficultyLevel === selectedDifficulty : true)
      )
    : [];
  
  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      const lowerQuery = searchQuery.toLowerCase();
      const topicResults = allTopics.filter(
        topic => 
          topic.name.toLowerCase().includes(lowerQuery) ||
          topic.description.toLowerCase().includes(lowerQuery)
      );
      
      const questionResults = allQuestions.filter(
        question =>
          question.question.toLowerCase().includes(lowerQuery) ||
          question.answer.toLowerCase().includes(lowerQuery) ||
          question.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
      
      const glossaryResults = allGlossaryTerms.filter(
        term =>
          term.term.toLowerCase().includes(lowerQuery) ||
          term.definition.toLowerCase().includes(lowerQuery)
      );
      
      setSearchResults({
        topics: topicResults,
        questions: questionResults,
        glossaryTerms: glossaryResults
      });
    } else {
      setSearchResults({
        topics: [],
        questions: [],
        glossaryTerms: []
      });
    }
  }, [searchQuery, allTopics, allQuestions, allGlossaryTerms]);
  
  // Chat functionality
  const sendChatMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    // Simple response logic - in a real app this would connect to an AI backend
    setTimeout(() => {
      // Find potential answers from the questions database
      const lowerContent = content.toLowerCase();
      const relatedQuestions = allQuestions.filter(
        q => q.question.toLowerCase().includes(lowerContent) ||
             q.tags.some(tag => lowerContent.includes(tag.toLowerCase()))
      );
      
      let responseContent = '';
      
      if (relatedQuestions.length > 0) {
        const bestMatch = relatedQuestions[0];
        responseContent = `${bestMatch.answer}\n\nThis information relates to the topic: ${
          allTopics.find(t => t.id === bestMatch.topicId)?.name || bestMatch.topicId
        }`;
      } else {
        responseContent = "I don't have specific information about that. Could you try rephrasing your question or explore our topics library?";
      }
      
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, assistantMessage]);
    }, 500);
  };
  
  // Study session functionality
  const startStudySession = (topicId: string) => {
    const topic = allTopics.find(t => t.id === topicId);
    if (!topic) return;
    
    const newSession: StudySession = {
      id: Date.now().toString(),
      userId: 'user1', // In a real app this would come from authentication
      topicId,
      startTime: new Date(),
      questionsAttempted: 0,
      questionsCorrect: 0
    };
    
    setCurrentSession(newSession);
    setSelectedTopic(topic);
  };
  
  const endStudySession = (questionsAttempted: number, questionsCorrect: number) => {
    if (!currentSession) return;
    
    const endedSession: StudySession = {
      ...currentSession,
      endTime: new Date(),
      questionsAttempted,
      questionsCorrect
    };
    
    // Update user progress
    const existingProgress = userProgress.find(p => p.topicId === currentSession.topicId);
    
    if (existingProgress) {
      setUserProgress(prev => prev.map(p => 
        p.topicId === currentSession.topicId ? {
          ...p,
          questionsAttempted: p.questionsAttempted + questionsAttempted,
          questionsCorrect: p.questionsCorrect + questionsCorrect,
          lastStudied: new Date()
        } : p
      ));
    } else {
      setUserProgress(prev => [...prev, {
        userId: 'user1',
        topicId: currentSession.topicId,
        questionsAttempted,
        questionsCorrect,
        lastStudied: new Date()
      }]);
    }
    
    // Reset current session
    setCurrentSession(null);
  };
  
  const value = {
    // Data
    topics: filteredTopics,
    questions: filteredQuestions,
    glossaryTerms: allGlossaryTerms,
    categories,
    chatHistory,
    
    // Selected states
    selectedCategory,
    selectedTopic,
    selectedDifficulty,
    
    // Study sessions
    currentSession,
    userProgress,
    
    // Search
    searchQuery,
    searchResults,
    
    // Actions
    setSelectedCategory,
    setSelectedTopic,
    setSelectedDifficulty,
    setSearchQuery,
    sendChatMessage,
    startStudySession,
    endStudySession
  };
  
  return (
    <ReviseRxContext.Provider value={value}>
      {children}
    </ReviseRxContext.Provider>
  );
};