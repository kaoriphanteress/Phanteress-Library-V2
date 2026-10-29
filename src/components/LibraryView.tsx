import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  Play,
  Check,
  Heart,
  Star,
  Trash2,
  Filter,
  Search,
  Sparkles,
  SlidersHorizontal,
  Film,
  Tv
} from 'lucide-react';
import { LibraryItem, MediaType, TMDBItem, WatchStatus } from '../types/tmdb';
import { useLibrary } from '../context/LibraryContext';
import { getImageUrl } from '../services/tmdb';
import { getShowTotalEpisodes } from '../utils/showMetadata';

interface LibraryViewProps {
  onSelect: (item: TMDBItem) => void;
  onExplore: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onSelect, onExplore }) => {
  const { library, updateStatus, toggleFavorite, removeFromLibrary } = useLibrary();

  const [activeTab, setActiveTab] = useState<'all' | WatchStatus | 'favorites'>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | MediaType>('all');
  const [sortBy, setSortBy] = useState<'added' | 'rating' | 'release' | 'title'>('added');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering and sorting
  const filteredItems = useMemo(() => {
    return library.filter((item) => {
      // Tab filter
      if (activeTab === 'favorites' && !item.favorite) return false;
      if (activeTab !== 'all' && activeTab !== 'favorites' && item.status !== activeTab) return false;

      // Media type filter
      if (mediaTypeFilter !== 'all' && item.mediaType !== mediaTypeFilter) return false;

      // Search query
      if (searchQuery.trim() && !item.title.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'added') {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
      if (sortBy === 'rating') {
        const ratingA = a.userRating || a.voteAverage || 0;
        const ratingB = b.userRating || b.voteAverage || 0;
        return ratingB - ratingA;
      }
      if (sortBy === 'release') {
        return (b.releaseDate || '').localeCompare(a.releaseDate || '');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [library, activeTab, mediaTypeFilter, sortBy, searchQuery]);

  const tabs = [
    { id: 'all', label: 'All', count: library.length },
    { id: 'watchlist', label: 'Watchlist', count: library.filter((i) => i.status === 'watchlist').length },
    { id: 'watching', label: 'Watching', count: library.filter((i) => i.status === 'watching').length },
    { id: 'watched', label: 'Watched', count: library.filter((i) => i.status === 'watched').length },
    { id: 'favorites', label: 'Favorites', count: library.filter((i) => i.favorite).length },
  ];

  const handleCardClick = (item: LibraryItem) => {
    // Convert to TMDBItem representation for modal
    const tmdbObj: TMDBItem = {
      id: item.tmdbId,
      title: item.mediaType === 'movie' ? item.title : undefined,
      name: item.mediaType === 'tv' ? item.title : undefined,
      poster_path: item.posterPath,
      backdrop_path: item.backdropPath,
      release_date: item.mediaType === 'movie' ? item.releaseDate : undefined,
      first_air_date: item.mediaType === 'tv' ? item.releaseDate : undefined,
      vote_average: item.voteAverage,
      vote_count: 0,
      overview: '',
      media_type: item.mediaType,
      number_of_episodes: getShowTotalEpisodes(item),
      number_of_seasons: item.totalSeasons,
    };
    onSelect(tmdbObj);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Stats Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Library
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Tracking {library.length} titles across your watchlist, progress, and favorites
          </p>
        </div>

        {/* Search inside Library */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#ff2a85] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within your library..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2a85]"
          />
        </div>
      </div>

      {/* Primary Category Filter Tabs (Interactive Segmented Controls) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#0b0b10] border border-zinc-900 rounded-xl overflow-x-auto no-scrollbar mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#181824] text-white border border-[#ff2a85]/50 shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-[#ff2a85] text-white' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-Filters: Media Type & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-900 mb-6">
        {/* Media Type Filter */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-900">
          <button
            onClick={() => setMediaTypeFilter('all')}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              mediaTypeFilter === 'all'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setMediaTypeFilter('movie')}
            className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              mediaTypeFilter === 'movie'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-3 h-3 text-[#ff2a85]" />
            <span>Movies</span>
          </button>
          <button
            onClick={() => setMediaTypeFilter('tv')}
            className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              mediaTypeFilter === 'tv'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tv className="w-3 h-3 text-[#ff2a85]" />
            <span>TV Series</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-[#ff2a85] cursor-pointer"
          >
            <option value="added">Recently Added</option>
            <option value="rating">Highest Rating</option>
            <option value="release">Release Date</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center mb-4 text-[#ff2a85]">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No items in this section</h3>
          <p className="text-xs text-zinc-400 max-w-sm mb-6">
            Add movies and TV series to your watchlist, track your watching progress, and organize your favorite titles.
          </p>
          <button
            onClick={onExplore}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.4)] hover:scale-105 transition-transform cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Trending Titles</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {filteredItems.map((item) => {
            const year = item.releaseDate ? item.releaseDate.substring(0, 4) : '';
            const poster = getImageUrl(item.posterPath, 'w500');
            const totalEps = getShowTotalEpisodes(item);
            const progressPercent =
              totalEps > 0
                ? Math.min(100, Math.round(((item.watchedEpisodesCount || 0) / totalEps) * 100))
                : 0;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="group relative flex flex-col bg-[#0c0c12] border border-zinc-900 hover:border-[#ff2a85]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,42,133,0.2)]"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] w-full bg-zinc-950 overflow-hidden">
                  {poster ? (
                    <img
                      src={poster}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-zinc-600 bg-zinc-900">
                      <Film className="w-8 h-8 mb-2" />
                      <span className="text-xs line-clamp-2 text-center text-zinc-400">{item.title}</span>
                    </div>
                  )}

                  {/* Top Status & Type */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span
                      className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded backdrop-blur-md border ${
                        item.status === 'watched'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                          : item.status === 'watching'
                          ? 'bg-pink-950/80 text-[#ff2a85] border-[#ff2a85]/50'
                          : 'bg-black/75 text-zinc-300 border-zinc-800'
                      }`}
                    >
                      {item.status}
                    </span>

                    {item.favorite && (
                      <div className="p-1 rounded-full bg-rose-600/90 text-white shadow-[0_0_8px_rgba(225,29,72,0.8)]">
                        <Heart className="w-3 h-3 fill-white" />
                      </div>
                    )}
                  </div>

                  {/* TV Episode Progress bar */}
                  {item.mediaType === 'tv' && (item.watchedEpisodesCount || 0) > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-900">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e]"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Card Info (Zero-Pill Discipline) */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#ff2a85] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-1">
                      <span>{year || 'TBA'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase text-[10px] text-zinc-500 font-mono">
                        {item.mediaType}
                      </span>
                      {item.userRating ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#ff2a85] font-mono">★ {item.userRating}</span>
                        </>
                      ) : (
                        item.voteAverage > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-zinc-400 font-mono">★ {item.voteAverage.toFixed(1)}</span>
                          </>
                        )
                      )}
                    </div>
                  </div>

                  {/* Quick Card Status Bar */}
                  <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-zinc-900/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        item.favorite ? 'text-rose-500' : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                      title="Favorite"
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.favorite ? 'fill-rose-500' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromLibrary(item.id);
                      }}
                      className="p-1 rounded text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove from library"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
