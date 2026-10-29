import React, { useState } from 'react';
import { Play, Bookmark, Check, Star, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { TMDBItem } from '../types/tmdb';
import { getImageUrl } from '../services/tmdb';
import { useLibrary } from '../context/LibraryContext';

interface HeroBannerProps {
  items: TMDBItem[];
  onSelect: (item: TMDBItem) => void;
  onPlayTrailer: (item: TMDBItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ items, onSelect, onPlayTrailer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { library, toggleWatchlist, toggleWatched } = useLibrary();

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];
  const title = currentItem.title || currentItem.name || 'Featured Title';
  const rawDate = currentItem.release_date || currentItem.first_air_date || '';
  const year = rawDate ? rawDate.substring(0, 4) : '';
  const mediaType = currentItem.media_type || (currentItem.title ? 'movie' : 'tv');
  const rating = currentItem.vote_average ? currentItem.vote_average.toFixed(1) : '7.9';

  const backdropUrl =
    getImageUrl(currentItem.backdrop_path, 'original') ||
    getImageUrl(currentItem.poster_path, 'w1280');

  const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const currentTitleNorm = norm(title);

  const libItem = library.find(
    (l) =>
      l.tmdbId === currentItem.id ||
      (l.title && norm(l.title) === currentTitleNorm)
  );

  const isWatched = libItem?.status === 'watched';
  const isWatchlist = libItem?.status === 'watchlist';
  const isWatching = libItem?.status === 'watching';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.min(items.length, 5));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.min(items.length, 5)) % Math.min(items.length, 5));
  };

  return (
    <div className="relative w-full h-[470px] sm:h-[530px] md:h-[580px] bg-zinc-950 overflow-hidden border-b border-zinc-900">
      {/* Background Backdrop - Expands all the way to top behind search button */}
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 sm:opacity-60 transition-all duration-700 scale-100"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-[#180a15] to-zinc-950 opacity-90" />
      )}

      {/* Scrims: Top shadow for search bar legibility, bottom shadow for content transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060609]/90 via-transparent to-[#060609]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-[#060609]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060609]/95 via-[#060609]/50 to-transparent" />

      {/* Carousel Navigation Control - Positioned below floating search capsule */}
      <div className="absolute top-20 right-4 sm:right-6 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-zinc-800 shadow-md">
        <button
          type="button"
          onClick={prevSlide}
          className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
          title="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 px-1">
          {items.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-4 bg-[#ff2a85] shadow-[0_0_8px_rgba(255,42,133,0.8)]'
                  : 'w-1.5 bg-zinc-600'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={nextSlide}
          className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
          title="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Info */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6 sm:pb-9 z-10">
        <div className="max-w-2xl">
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <span className="text-[#ff2a85] font-bold tracking-wider uppercase text-[11px]">
              {mediaType === 'tv' ? 'Featured Series' : 'Featured Movie'}
            </span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-medium">{year}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <div className="flex items-center gap-1 text-white font-semibold">
              <Star className="w-3.5 h-3.5 text-[#ff2a85] fill-[#ff2a85]" />
              <span className="font-mono tabular-nums">{rating}</span>
            </div>
          </div>

          {/* Headline Title */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2 [text-wrap:balance]">
            {title}
          </h2>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mb-4 max-w-xl leading-relaxed">
            {currentItem.overview || 'Track episodes, watch trailers, and manage your watchlist with real-time cloud sync.'}
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onPlayTrailer(currentItem)}
              className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Trailer</span>
            </button>

            <button
              type="button"
              onClick={() => toggleWatchlist(currentItem)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isWatchlist
                  ? 'bg-[#ff2a85] text-white border-[#ff2a85] shadow-[0_0_15px_rgba(255,42,133,0.5)]'
                  : isWatching
                  ? 'bg-[#ff2a85]/20 text-[#ff2a85] border-[#ff2a85]/50'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-200'
              }`}
            >
              <Bookmark className="w-4 h-4 text-inherit" />
              <span>{isWatchlist ? 'In Watchlist' : isWatching ? 'Watching' : 'Watchlist'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleWatched(currentItem)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isWatched
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white'
              }`}
              title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{isWatched ? 'Watched' : 'Mark Watched'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelect(currentItem)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Info className="w-4 h-4" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
