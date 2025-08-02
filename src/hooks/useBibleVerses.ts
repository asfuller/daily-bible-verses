import { useState, useEffect, useCallback } from 'react';
import { BibleVerse, bibleVerses } from '../data/verses';

export const useBibleVerses = () => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse>(bibleVerses[0]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('bible-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Set daily verse based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const verseIndex = dayOfYear % bibleVerses.length;
    setCurrentVerse(bibleVerses[verseIndex]);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bible-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getNewVerse = useCallback(() => {
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      let availableVerses = showFavorites 
        ? bibleVerses.filter(verse => favorites.includes(verse.id))
        : bibleVerses;
      
      if (availableVerses.length === 0) {
        availableVerses = bibleVerses;
      }
      
      // Get a different verse than the current one
      const otherVerses = availableVerses.filter(verse => verse.id !== currentVerse.id);
      if (otherVerses.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherVerses.length);
        setCurrentVerse(otherVerses[randomIndex]);
      }
      
      setIsLoading(false);
    }, 500);
  }, [currentVerse.id, favorites, showFavorites]);

  const toggleFavorite = useCallback((verseId: number) => {
    setFavorites(prev => 
      prev.includes(verseId)
        ? prev.filter(id => id !== verseId)
        : [...prev, verseId]
    );
  }, []);

  const toggleShowFavorites = useCallback(() => {
    setShowFavorites(prev => {
      const newShowFavorites = !prev;
      
      // If switching to favorites view and current verse is not a favorite,
      // show the first favorite verse
      if (newShowFavorites && favorites.length > 0 && !favorites.includes(currentVerse.id)) {
        const firstFavorite = bibleVerses.find(verse => favorites.includes(verse.id));
        if (firstFavorite) {
          setCurrentVerse(firstFavorite);
        }
      }
      
      return newShowFavorites;
    });
  }, [favorites, currentVerse.id]);

  return {
    currentVerse,
    favorites,
    showFavorites,
    isLoading,
    getNewVerse,
    toggleFavorite,
    toggleShowFavorites,
    favoritesCount: favorites.length
  };
};