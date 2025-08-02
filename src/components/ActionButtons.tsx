import React from 'react';
import { RefreshCw, Heart, Sparkles } from 'lucide-react';

interface ActionButtonsProps {
  onNewQuote: () => void;
  onShowFavorites: () => void;
  favoritesCount: number;
  showFavorites: boolean;
  isLoading: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onNewQuote, 
  onShowFavorites, 
  favoritesCount, 
  showFavorites,
  isLoading 
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={onNewQuote}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
        {isLoading ? 'Loading...' : 'New Verse'}
      </button>
      
      <button
        onClick={onShowFavorites}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
          showFavorites
            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
            : 'bg-white/80 text-gray-700 hover:bg-white'
        }`}
      >
        <Heart size={18} fill={showFavorites ? 'currentColor' : 'none'} />
        {showFavorites ? 'All Verses' : `Favorites ${favoritesCount > 0 ? `(${favoritesCount})` : ''}`}
      </button>
      
      <button
        onClick={() => window.open('https://www.bible.com/verse-of-the-day', '_blank')}
        className="flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white"
      >
        <Sparkles size={18} />
        More Verses
      </button>
    </div>
  );
};