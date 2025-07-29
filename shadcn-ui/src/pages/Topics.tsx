import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReviseRx } from '@/context/ReviseRxContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, BookOpen, List, Grid3X3 } from 'lucide-react';

const Topics: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const { 
    topics, 
    selectedTopic, 
    setSelectedTopic,
    selectedCategory,
    setSelectedCategory,
    categories,
    questions,
    selectedDifficulty,
    setSelectedDifficulty,
    startStudySession
  } = useReviseRx();

  // Set category from URL parameter if present
  React.useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, categories, setSelectedCategory]);

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  
  // Difficulty levels for filtering
  const difficultyLevels = ['Basic', 'Intermediate', 'Advanced'];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {selectedCategory ? `${selectedCategory} Topics` : 'All Topics'}
        </h1>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!selectedTopic ? (
        // Topics grid/list view
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
          {topics.map(topic => (
            <Card 
              key={topic.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex flex-row items-center' : ''
              }`}
              onClick={() => setSelectedTopic(topic)}
            >
              {viewMode === 'grid' ? (
                <>
                  <CardHeader>
                    <Badge>{topic.category}</Badge>
                    <CardTitle>{topic.name}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="gap-1">
                      Explore <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardContent className="py-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="mb-1">{topic.category}</Badge>
                        <h3 className="font-medium">{topic.name}</h3>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      ) : (
        // Single topic view with questions
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge>{selectedTopic.category}</Badge>
                  <CardTitle className="text-2xl mt-1">{selectedTopic.name}</CardTitle>
                  <CardDescription className="text-base mt-1">{selectedTopic.description}</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTopic(null)}
                >
                  Back to Topics
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <Button 
                  className="gap-2"
                  onClick={() => startStudySession(selectedTopic.id)}
                >
                  <BookOpen className="h-4 w-4" />
                  Start Study Session
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <Select 
                    value={selectedDifficulty || ''} 
                    onValueChange={(value) => setSelectedDifficulty(value || null)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Levels</SelectItem>
                      {difficultyLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="questions">
                <TabsList className="mb-4">
                  <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
                  <TabsTrigger value="subtopics">Subtopics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="questions" className="space-y-4">
                  {questions.length > 0 ? (
                    questions.map((question, index) => (
                      <Card key={question.id}>
                        <CardHeader className="pb-2">
                          <Badge variant="outline" className="w-fit mb-1">{question.difficultyLevel}</Badge>
                          <CardTitle className="text-lg font-medium">
                            Q{index + 1}: {question.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="pl-6 border-l-2 border-muted">
                            <p className="text-muted-foreground">{question.answer}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {question.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No questions available for this topic.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="subtopics">
                  {selectedTopic.subTopics && selectedTopic.subTopics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTopic.subTopics.map(subTopicId => {
                        const subTopic = topics.find(t => t.id === subTopicId);
                        if (!subTopic) return null;
                        
                        return (
                          <Card 
                            key={subTopic.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedTopic(subTopic)}
                          >
                            <CardHeader>
                              <CardTitle className="text-lg">{subTopic.name}</CardTitle>
                              <CardDescription>{subTopic.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                              <Button variant="ghost" size="sm" className="gap-1">
                                Explore <ChevronRight className="h-3 w-3" />
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No subtopics available for this topic.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Topics;