import React from 'react';
import { PlayCircle, CheckCircle2, Tv, Sparkles, ChevronRight, Check } from 'lucide-react';
import { TMDBItem } from '../types/tmdb';
import { useLibrary } from '../context/LibraryContext';
import { getImageUrl } from '../services/tmdb';

interface NextUpViewProps {
  onSelect: (item: TMDBItem) => void;
  onExplore: () => void;
}

export const NextUpView: React.FC<NextUpViewProps> = ({ onSelect, onExplore }) => {
  const { library, episodes, toggleEpisodeWatched, getShowWatchedCount } = useLibrary();

  // Find all TV shows in user library that are active or in watchlist
  const activeShows = library.filter((item) => item.mediaType === 'tv');

  const handleNextEpWatched = (showId: number, currentWatchedCount: number, totalEps: number) => {
    // Target next episode
    const nextEpNumber = currentWatchedCount + 1;
    toggleEpisodeWatched(showId, 1, nextEpNumber, `Episode ${nextEpNumber}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <PlayCircle className="w-7 h-7 text-[#ff2a85]" />
          <span>Next Up to Watch</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Pick up right where you left off. Track upcoming episodes and mark them as watched with a single click.
        </p>
      </div>

      {activeShows.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-[#0c0c12] border border-zinc-900 rounded-2xl p-8">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-[#ff2a85]">
            <Tv className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No active TV shows yet</h3>
          <p className="text-xs text-zinc-400 max-w-sm mb-6">
            Add your favorite television series to your watchlist or "Watching" status to start tracking your next episodes.
          </p>
          <button
            onClick={onExplore}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.4)] hover:scale-105 transition-transform cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Top TV Series</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {activeShows.map((show) => {
            const watchedCount = getShowWatchedCount(show.tmdbId);
            const totalCount = show.totalEpisodes || 10;
            const isCompleted = watchedCount >= totalCount;
            const nextEp = watchedCount + 1;
            const progressPercent = Math.min(100, Math.round((watchedCount / totalCount) * 100));
            const backdrop = getImageUrl(show.backdropPath, 'w780') || getImageUrl(show.posterPath, 'w500');

            const tmdbObj: TMDBItem = {
              id: show.tmdbId,
              name: show.title,
              poster_path: show.posterPath,
              backdrop_path: show.backdropPath,
              first_air_date: show.releaseDate,
              vote_average: show.voteAverage,
              vote_count: 0,
              overview: '',
              media_type: 'tv',
              number_of_seasons: show.totalSeasons || 1,
              number_of_episodes: totalCount,
            };

            return (
              <div
                key={show.id}
                className="group relative bg-[#0d0d14] border border-zinc-900 hover:border-[#ff2a85]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,42,133,0.15)] flex flex-col justify-between"
              >
                {/* Backdrop Banner Header */}
                <div className="relative h-36 w-full bg-zinc-950 overflow-hidden">
                  {backdrop ? (
                    <img
                      src={backdrop}
                      alt={show.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/60 to-transparent" />

                  {/* Top Status */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/75 border border-zinc-800 text-zinc-300">
                      {isCompleted ? 'Series Completed' : `Up Next: Episode ${nextEp}`}
                    </span>
                    <button
                      onClick={() => onSelect(tmdbObj)}
                      className="flex items-center gap-1 text-[11px] text-[#ff2a85] hover:text-white font-medium cursor-pointer"
                    >
                      <span>Show Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Stats */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ff2a85] transition-colors truncate">
                      {show.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      <span className="font-mono text-zinc-300">
                        {watchedCount} of {totalCount} watched
                      </span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span className="font-mono text-[#ff2a85] font-semibold">{progressPercent}%</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-zinc-900">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] transition-all duration-300 shadow-[0_0_8px_rgba(255,42,133,0.8)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Next Episode Action Card */}
                <div className="p-4 flex items-center justify-between gap-3 bg-[#0a0a0f]">
                  <div>
                    {isCompleted ? (
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-medium">All caught up! Excellent job.</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-semibold text-white">
                          Season 1 · Episode {nextEp}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Ready to watch next on your list
                        </p>
                      </>
                    )}
                  </div>

                  {!isCompleted && (
                    <button
                      onClick={() => handleNextEpWatched(show.tmdbId, watchedCount, totalCount)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ff2a85] hover:bg-[#ff3a95] text-white text-xs font-semibold shadow-[0_0_12px_rgba(255,42,133,0.4)] transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-105"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Ep {nextEp} Watched</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
