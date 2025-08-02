import React from 'react';
import { Header } from './components/Header';
import { QuoteCard } from './components/QuoteCard';
import { ActionButtons } from './components/ActionButtons';
import { useBibleVerses } from './hooks/useBibleVerses';

function App() {
  const {
    currentVerse,
    favorites,
    showFavorites,
    isLoading,
    getNewVerse,
    toggleFavorite,
    toggleShowFavorites,
    favoritesCount
  } = useBibleVerses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <Header />
        
        <main className="flex flex-col items-center">
          <QuoteCard
            verse={currentVerse}
            onFavorite={toggleFavorite}
            isFavorite={favorites.includes(currentVerse.id)}
          />
          
          <ActionButtons
            onNewQuote={getNewVerse}
            onShowFavorites={toggleShowFavorites}
            favoritesCount={favoritesCount}
            showFavorites={showFavorites}
            isLoading={isLoading}
          />
          
          {showFavorites && favoritesCount === 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-lg">No favorite verses yet.</p>
              <p className="text-gray-400 text-sm mt-1">Click the heart icon to save verses you love!</p>
            </div>
          )}
        </main>
        
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>May God's Word bring you peace, strength, and joy today</p>
        </footer>
      </div>
    </div>
  );
}

export default App;