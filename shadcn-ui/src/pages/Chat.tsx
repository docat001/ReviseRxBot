import React, { useRef, useState, useEffect } from 'react';
import { useReviseRx } from '@/context/ReviseRxContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Chat: React.FC = () => {
  const { chatHistory, sendChatMessage, searchResults } = useReviseRx();
  const [inputValue, setInputValue] = useState<string>('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendChatMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Sample suggested questions
  const suggestedQuestions = [
    "What are the chambers of the heart?",
    "Explain the cardiac cycle",
    "What is the difference between arteries and veins?",
    "How does the respiratory system work?",
    "What are the stages of labor?",
    "Explain the glycolysis pathway"
  ];

  // Check if there are existing messages
  const hasMessages = chatHistory.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Medical Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about any medical topic in the MBBS curriculum
        </p>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 mb-4 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <CardContent className="p-4 space-y-4">
            {!hasMessages && (
              <div className="text-center py-8 space-y-4">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto" />
                <h2 className="text-xl font-medium">ReviseRx Medical Assistant</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Get answers to your medical questions from our comprehensive MBBS database. 
                  Try asking about anatomy, physiology, pathology, and more!
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto mt-6">
                  {suggestedQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="justify-between"
                      onClick={() => {
                        setInputValue(question);
                        setTimeout(() => {
                          if (inputRef.current) {
                            inputRef.current.focus();
                          }
                        }, 100);
                      }}
                    >
                      {question}
                      <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {chatHistory.map((message) => (
              <div 
                key={message.id}
                className={`flex gap-3 ${message.role === 'assistant' ? '' : 'flex-row-reverse'}`}
              >
                <Avatar className={message.role === 'assistant' ? "bg-primary/10" : "bg-muted"}>
                  <AvatarFallback>
                    {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                  <AvatarImage src={message.role === 'assistant' ? "/images/Assistant.jpg" : ""} />
                </Avatar>
                
                <div className={`space-y-1 max-w-[80%] ${message.role === 'assistant' ? '' : 'items-end'}`}>
                  <div className={`rounded-lg p-3 ${
                    message.role === 'assistant' 
                      ? 'bg-muted' 
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground px-2">
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}

            {/* Search Results - Only show when there's an active search but no chat history */}
            {!hasMessages && searchResults.questions.length > 0 && (
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-3">Related Questions</h3>
                <div className="space-y-3">
                  {searchResults.questions.slice(0, 3).map((question) => (
                    <Button
                      key={question.id}
                      variant="outline"
                      className="w-full justify-start h-auto p-3 text-left"
                      onClick={() => {
                        setInputValue(question.question);
                        setTimeout(() => {
                          if (inputRef.current) {
                            inputRef.current.focus();
                          }
                        }, 100);
                      }}
                    >
                      <div>
                        <p>{question.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">From: {question.tags.join(', ')}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Type your medical question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;