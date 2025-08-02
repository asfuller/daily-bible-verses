import React from 'react';
import { Quote, Heart, Share2 } from 'lucide-react';
import { BibleVerse } from '../data/verses';

interface QuoteCardProps {
  verse: BibleVerse;
  onFavorite: (id: number) => void;
  isFavorite: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ verse, onFavorite, isFavorite }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Bible Verse',
          text: `"${verse.text}" - ${verse.reference}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-auto border border-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white shadow-lg">
          <Quote size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Daily Verse</h2>
          <p className="text-sm text-gray-600">Today's inspiration from God's Word</p>
        </div>
      </div>
      
      <blockquote className="text-gray-800 text-lg leading-relaxed mb-6 italic font-medium">
        "{verse.text}"
      </blockquote>
      
      <div className="flex items-center justify-between">
        <div className="text-right">
          <p className="text-blue-600 font-semibold text-base">{verse.reference}</p>
          <p className="text-gray-500 text-sm mt-1">{verse.book} {verse.chapter}:{verse.verse}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => onFavorite(verse.id)}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isFavorite 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-500 hover:scale-110"
            title="Share this verse"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};