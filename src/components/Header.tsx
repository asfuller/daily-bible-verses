import React from 'react';
import { BookOpen, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full text-white shadow-lg">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
          Daily Bible Verses
        </h1>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-gray-600">
        <Calendar size={16} />
        <p className="text-lg">{today}</p>
      </div>
      
      <p className="text-gray-500 mt-2 max-w-md mx-auto">
        Find peace, strength, and inspiration through God's Word every day
      </p>
    </header>
  );
};