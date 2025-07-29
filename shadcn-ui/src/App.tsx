import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Topics from './pages/Topics';
import Chat from './pages/Chat';
import Glossary from './pages/Glossary';
import Progress from './pages/Progress';
import NotFound from './pages/NotFound';
import { ReviseRxProvider } from './context/ReviseRxContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReviseRxProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="topics" element={<Topics />} />
              <Route path="chat" element={<Chat />} />
              <Route path="glossary" element={<Glossary />} />
              <Route path="progress" element={<Progress />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ReviseRxProvider>
  </QueryClientProvider>
);

export default App;
