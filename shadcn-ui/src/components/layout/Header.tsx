import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useReviseRx } from '@/context/ReviseRxContext';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useReviseRx();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="border-b border-border sticky top-0 bg-background z-40">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mr-2">ReviseRx</span>
          <span className="text-sm text-muted-foreground hidden md:inline">Medical Education Platform</span>
        </Link>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics, questions, terms..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/topics">
                <Button variant="ghost">Topics</Button>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <Button variant="ghost">Chat</Button>
              </Link>
            </li>
            <li>
              <Link to="/glossary">
                <Button variant="ghost">Glossary</Button>
              </Link>
            </li>
            <li>
              <Link to="/progress">
                <Button variant="ghost" className="hidden md:inline-flex">Progress</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;