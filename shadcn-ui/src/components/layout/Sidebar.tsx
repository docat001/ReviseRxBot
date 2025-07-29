import React from 'react';
import { useReviseRx } from '@/context/ReviseRxContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  BrainCircuit, 
  HeartPulse, 
  Pill, 
  Microscope, 
  Stethoscope, 
  Scissors, 
  Baby,
  Brain,
  UsersRound
} from 'lucide-react';

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'Anatomy': <HeartPulse className="h-4 w-4 mr-2" />,
  'Physiology': <BrainCircuit className="h-4 w-4 mr-2" />,
  'Biochemistry': <Microscope className="h-4 w-4 mr-2" />,
  'Pathology': <Microscope className="h-4 w-4 mr-2" />,
  'Pharmacology': <Pill className="h-4 w-4 mr-2" />,
  'Microbiology': <Microscope className="h-4 w-4 mr-2" />,
  'Medicine': <Stethoscope className="h-4 w-4 mr-2" />,
  'Surgery': <Scissors className="h-4 w-4 mr-2" />,
  'Obstetrics & Gynecology': <Baby className="h-4 w-4 mr-2" />,
  'Pediatrics': <Baby className="h-4 w-4 mr-2" />,
  'Psychiatry': <Brain className="h-4 w-4 mr-2" />,
  'Community Medicine': <UsersRound className="h-4 w-4 mr-2" />
};

const Sidebar: React.FC = () => {
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    topics,
    selectedTopic,
    setSelectedTopic
  } = useReviseRx();

  return (
    <div className="w-64 border-r border-border h-[calc(100vh-4rem)] bg-background flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          Categories
        </h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {categoryIcons[category] || <BookOpen className="h-4 w-4 mr-2" />}
              {category}
            </Button>
          ))}
        </div>

        {selectedCategory && (
          <>
            <div className="p-4 border-t border-border">
              <h2 className="font-semibold">Topics</h2>
            </div>
            <div className="p-4 space-y-1">
              {topics.map(topic => (
                <Button
                  key={topic.id}
                  variant={selectedTopic?.id === topic.id ? "default" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic.name}
                </Button>
              ))}
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default Sidebar;