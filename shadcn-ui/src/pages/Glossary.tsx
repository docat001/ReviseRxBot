import React, { useState } from 'react';
import { useReviseRx } from '@/context/ReviseRxContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search, BookText, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Glossary: React.FC = () => {
  const { glossaryTerms } = useReviseRx();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  
  // Generate alphabet array for filtering
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  // Filter terms based on search query and selected letter
  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = !localSearchQuery || 
      term.term.toLowerCase().includes(localSearchQuery.toLowerCase()) || 
      term.definition.toLowerCase().includes(localSearchQuery.toLowerCase());
      
    const matchesLetter = !selectedLetter || 
      term.term.charAt(0).toUpperCase() === selectedLetter;
      
    return matchesSearch && matchesLetter;
  });
  
  // Group terms by first letter for better display
  const groupedTerms = alphabet.reduce((acc, letter) => {
    const terms = filteredTerms.filter(term => 
      term.term.charAt(0).toUpperCase() === letter
    );
    
    if (terms.length > 0) {
      acc[letter] = terms;
    }
    
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);
  
  // Get details of selected term
  const termDetails = glossaryTerms.find(term => term.term === selectedTerm);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookText className="h-5 w-5" /> 
            Medical Terminology Glossary
          </h1>
          <p className="text-muted-foreground">
            Quick reference for medical terms and definitions
          </p>
        </div>
        
        <div className="relative max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            className="pl-8"
            value={localSearchQuery}
            onChange={(e) => {
              setLocalSearchQuery(e.target.value);
              setSelectedLetter(null);
            }}
          />
        </div>
      </div>
      
      {/* Alphabet filter */}
      <div className="flex flex-wrap gap-1">
        <Button 
          variant={!selectedLetter ? "default" : "outline"} 
          size="sm"
          onClick={() => setSelectedLetter(null)}
        >
          All
        </Button>
        
        {alphabet.map(letter => {
          // Check if there are any terms starting with this letter
          const hasTerms = glossaryTerms.some(term => 
            term.term.charAt(0).toUpperCase() === letter
          );
          
          return (
            <Button 
              key={letter}
              variant={selectedLetter === letter ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedLetter(letter)}
              disabled={!hasTerms}
              className={!hasTerms ? "opacity-40" : ""}
            >
              {letter}
            </Button>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Terms List */}
        <div className="md:col-span-1 order-2 md:order-1">
          <Card className="h-[calc(100vh-16rem)]">
            <CardHeader className="pb-2">
              <CardTitle>Terms</CardTitle>
              <CardDescription>
                {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
              </CardDescription>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <CardContent className="pr-1">
                <div className="space-y-6">
                  {Object.entries(groupedTerms).map(([letter, terms]) => (
                    <div key={letter}>
                      <h3 className="font-semibold text-lg mb-2">{letter}</h3>
                      <div className="space-y-1">
                        {terms.map(term => (
                          <Button 
                            key={term.term}
                            variant={selectedTerm === term.term ? "default" : "ghost"}
                            className="w-full justify-start font-normal h-auto py-2"
                            onClick={() => setSelectedTerm(term.term)}
                          >
                            {term.term}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {filteredTerms.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                      No matching terms found
                    </div>
                  )}
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
        
        {/* Term Details */}
        <div className="md:col-span-3 order-1 md:order-2">
          <Card className="h-[calc(100vh-16rem)]">
            <CardHeader className="pb-4">
              <CardTitle>
                {termDetails ? termDetails.term : "Select a term to view details"}
              </CardTitle>
              {termDetails && (
                <div className="flex items-center gap-2 mt-1">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-3.5 w-3.5" /> 
                    More Info
                  </Button>
                </div>
              )}
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-22rem)]">
              <CardContent>
                {termDetails ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm text-muted-foreground uppercase">Definition</h3>
                      <p className="text-lg">{termDetails.definition}</p>
                    </div>
                    
                    {termDetails.relatedTerms && termDetails.relatedTerms.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase">Related Terms</h3>
                        <div className="flex flex-wrap gap-2">
                          {termDetails.relatedTerms.map((relatedTerm, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="cursor-pointer"
                              onClick={() => {
                                const term = glossaryTerms.find(t => t.term === relatedTerm);
                                if (term) {
                                  setSelectedTerm(term.term);
                                }
                              }}
                            >
                              {relatedTerm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-20 text-muted-foreground">
                    <BookText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Select a term from the list to view its definition</p>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Glossary;