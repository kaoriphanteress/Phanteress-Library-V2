import React from 'react';
import { Star, Bookmark, Check, Heart, Film } from 'lucide-react';
import { TMDBItem } from '../types/tmdb';
import { getImageUrl } from '../services/tmdb';
import { useLibrary } from '../context/LibraryContext';

interface MediaCardProps {
  item: TMDBItem;
  onSelect: (item: TMDBItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect }) => {
  const { library, addToLibrary, toggleFavorite, updateStatus, getShowWatchedCount } = useLibrary();

  const title = item.title || item.name || 'Untitled';
  const rawDate = item.release_date || item.first_air_date || '';
  const year = rawDate ? rawDate.substring(0, 4) : '';
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;
  const posterUrl = getImageUrl(item.poster_path, 'w500');
  const [imgError, setImgError] = React.useState(false);

  const libItem = library.find(
    (l) => l.tmdbId === item.id && (l.mediaType === mediaType || !l.mediaType)
  );

  const isWatchlist = libItem?.status === 'watchlist';
  const isWatched = libItem?.status === 'watched';
  const isFavorite = !!libItem?.favorite;

  // TV Progress
  const watchedEps = mediaType === 'tv' ? getShowWatchedCount(item.id) : 0;
  const totalEps = item.number_of_episodes || libItem?.totalEpisodes || 0;
  const progressPercent = totalEps > 0 ? Math.min(100, Math.round((watchedEps / totalEps) * 100)) : 0;

  const handleQuickWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWatchlist) {
      updateStatus(libItem!.id, 'dropped');
    } else {
      addToLibrary(item, 'watchlist');
    }
  };

  const handleQuickWatched = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWatched) {
      updateStatus(libItem!.id, 'watchlist');
    } else {
      addToLibrary(item, 'watched');
    }
  };

  const handleQuickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (libItem) {
      toggleFavorite(libItem.id);
    } else {
      addToLibrary(item, 'watchlist').then(() => {
        const newlyAdded = `${mediaType}_${item.id}`;
        toggleFavorite(newlyAdded);
      });
    }
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative flex flex-col bg-[#0d0d12] border border-zinc-900 hover:border-[#ff2a85]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,42,133,0.18)]"
    >
      {/* Poster Media Box with 2:3 Aspect Ratio */}
      <div className="relative aspect-[2/3] w-full bg-zinc-950 overflow-hidden">
        {posterUrl && !imgError ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-zinc-900 via-[#180e18] to-zinc-950 text-zinc-500 text-center relative">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-750 flex items-center justify-center mb-2 text-[#ff2a85] group-hover:scale-110 transition-transform">
              <Film className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-zinc-200 line-clamp-2 px-1">{title}</span>
            {year && <span className="text-[10px] text-zinc-500 mt-1">{year}</span>}
          </div>
        )}

        {/* Top Badges overlay: Rating & Media Type */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          {rating ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-[11px] font-semibold text-white border border-zinc-800">
              <Star className="w-3 h-3 text-[#ff2a85] fill-[#ff2a85]" />
              <span className="font-mono tabular-nums">{rating}</span>
            </div>
          ) : <div />}

          <span className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-zinc-300 border border-zinc-800">
            {mediaType === 'tv' ? 'TV' : 'Movie'}
          </span>
        </div>

        {/* TV Series Episode Progress Bar */}
        {mediaType === 'tv' && watchedEps > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-900/80">
            <div
              className="h-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] shadow-[0_0_8px_rgba(255,42,133,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={handleQuickWatchlist}
              title={isWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                isWatchlist
                  ? 'bg-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.5)]'
                  : 'bg-zinc-900/90 hover:bg-[#ff2a85] text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleQuickWatched}
              title={isWatched ? 'Marked as Watched' : 'Mark as Watched'}
              className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                isWatched
                  ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-zinc-900/90 hover:bg-emerald-500 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleQuickFavorite}
              title={isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
              className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.5)]'
                  : 'bg-zinc-900/90 hover:bg-rose-600 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Card Info Box (Zero-Pill Discipline: Unboxed clean metadata with · separators) */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <h3 className="text-sm font-semibold text-white group-hover:text-[#ff2a85] transition-colors line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
          <span>{year || 'TBA'}</span>
          {mediaType === 'tv' && watchedEps > 0 && (
            <>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-[#ff2a85] font-mono text-[11px]">
                {watchedEps}{totalEps > 0 ? `/${totalEps}` : ''} eps
              </span>
            </>
          )}
          {libItem?.userRating && (
            <>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-amber-400 font-mono text-[11px]">★ {libItem.userRating}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
