import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, Film, Tv, ArrowRight, Loader2 } from 'lucide-react';
import { TMDBItem } from '../types/tmdb';
import { searchMulti, getImageUrl } from '../services/tmdb';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: TMDBItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TMDBItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const res = await searchMulti(query);
        setResults(res);
      } catch (err) {
        console.warn('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#0d0d14] border border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-[#09090e]">
          <Search className="w-5 h-5 text-[#ff2a85] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV series, anime..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {loading ? (
            <Loader2 className="w-4 h-4 text-[#ff2a85] animate-spin shrink-0" />
          ) : query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-500 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline text-[10px] bg-zinc-900 px-2 py-0.5 rounded text-zinc-500 border border-zinc-800 font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              <Film className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
              <span>Search across millions of movies and TV shows</span>
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No titles found matching "{query}"
            </div>
          ) : (
            results.map((item) => {
              const title = item.title || item.name || 'Untitled';
              const date = item.release_date || item.first_air_date || '';
              const year = date ? date.substring(0, 4) : '';
              const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
              const rating = item.vote_average ? item.vote_average.toFixed(1) : null;
              const poster = getImageUrl(item.poster_path, 'w300');

              return (
                <button
                  key={`${mediaType}_${item.id}`}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-zinc-900/80 border border-transparent hover:border-[#ff2a85]/30 transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-14 rounded-md overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                      {poster ? (
                        <img
                          src={poster}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                          {mediaType === 'tv' ? <Tv className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white group-hover:text-[#ff2a85] transition-colors truncate">
                        {title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                        <span className="uppercase text-[10px] tracking-wider text-zinc-500 font-mono">
                          {mediaType === 'tv' ? 'Series' : 'Movie'}
                        </span>
                        {year && (
                          <>
                            <span aria-hidden="true" className="text-zinc-600">·</span>
                            <span>{year}</span>
                          </>
                        )}
                        {rating && (
                          <>
                            <span aria-hidden="true" className="text-zinc-600">·</span>
                            <span className="flex items-center gap-1 text-white font-mono text-[11px]">
                              <Star className="w-3 h-3 text-[#ff2a85] fill-[#ff2a85]" />
                              {rating}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#ff2a85] transition-colors shrink-0 mr-2" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
