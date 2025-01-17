// src/App.tsx
import { useState, useEffect } from 'react';
import { TestimonyGrid } from './components/TestimonyGrid';
import { AdminPanel } from './components/AdminPanel';
import './styles/globals.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdmin ? (
        <div className="relative">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-center">
            Admin Mode - Press Ctrl + Shift + A to exit
          </div>
          <AdminPanel />
        </div>
      ) : (
        <TestimonyGrid />
      )}
    </div>
  );
}

export default App;