import React, { useState, useMemo, useEffect } from 'react';
import {
  Check,
  RotateCcw,
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
  Film,
  Tv,
  CalendarDays,
  Sparkles,
  ArrowUpDown,
  X,
  Lock,
  Layers
} from 'lucide-react';
import { TMDBItem, WatchStatus, TMDBSeasonDetail, LibraryItem } from '../types/tmdb';
import { useLibrary } from '../context/LibraryContext';
import { getImageUrl, getTVSeasonDetails, searchMulti } from '../services/tmdb';
import { OrderTimeline } from './OrderTimeline';
import {
  getStoredOrderConfig,
  getStoredOrderItems,
  getStoredWatchedIds,
  getStoredSkippedIds,
  getStoredFavoriteIds,
  isOrderSetupDone,
  saveOrderConfig,
  saveOrderItems,
  saveStoredWatchedIds,
  saveStoredSkippedIds,
  saveStoredFavoriteIds
} from '../services/marvelOrderService';
import { MarvelOrderConfig, MarvelItem } from '../data/marvelData';

interface ProgressViewProps {
  onSelect: (item: TMDBItem) => void;
  onExplore: () => void;
  onOpenSearch: () => void;
  onNavigateToOrder?: () => void;
}

export type MediaTabType = 'media' | 'shows' | 'movies' | 'order';

const toTMDBItem = (item: LibraryItem): TMDBItem => ({
  id: item.tmdbId,
  title: item.mediaType === 'movie' ? item.title : undefined,
  name: item.mediaType === 'tv' ? item.title : undefined,
  poster_path: item.posterPath,
  backdrop_path: item.backdropPath,
  release_date: item.mediaType === 'movie' ? item.releaseDate : undefined,
  first_air_date: item.mediaType === 'tv' ? item.releaseDate : undefined,
  vote_average: item.voteAverage,
  vote_count: 0,
  overview: item.overview || '',
  media_type: item.mediaType,
  number_of_episodes: item.totalEpisodes,
  number_of_seasons: item.totalSeasons,
});

export const ProgressView: React.FC<ProgressViewProps> = ({
  onSelect,
  onExplore,
  onOpenSearch,
  onNavigateToOrder,
}) => {
  const {
    library,
    episodes,
    updateStatus,
    toggleEpisodeWatched,
    getShowWatchedCount
  } = useLibrary();

  // Marvel Watchlist State
  const [marvelConfig, setMarvelConfig] = useState<MarvelOrderConfig>(getStoredOrderConfig);
  const [marvelItems, setMarvelItems] = useState<MarvelItem[]>(getStoredOrderItems);
  const [marvelWatched, setMarvelWatched] = useState<string[]>(getStoredWatchedIds);
  const [marvelSkipped, setMarvelSkipped] = useState<string[]>(getStoredSkippedIds);
  const [marvelFavorites, setMarvelFavorites] = useState<string[]>(getStoredFavoriteIds);
  const [marvelSetupDone, setMarvelSetupDone] = useState<boolean>(isOrderSetupDone);

  // Sync Marvel Order state across views
  useEffect(() => {
    const handleOrderSync = (e: any) => {
      if (e?.detail?.watched) {
        setMarvelWatched(e.detail.watched);
      } else {
        setMarvelWatched(getStoredWatchedIds());
      }
      setMarvelSkipped(getStoredSkippedIds());
      setMarvelFavorites(getStoredFavoriteIds());
    };
    window.addEventListener('phanteress_marvel_order_changed', handleOrderSync);
    window.addEventListener('storage', handleOrderSync);
    return () => {
      window.removeEventListener('phanteress_marvel_order_changed', handleOrderSync);
      window.removeEventListener('storage', handleOrderSync);
    };
  }, []);

  // 1. Top 4-Way Typographic Switcher: "Media" "Shows" "Movies" "Marvel"
  const [activeTabType, setActiveTabType] = useState<MediaTabType>('media');

  // 2. Sub-tabs: Progress, Calendar, History (History is available on Shows & Media)
  const [subTab, setSubTab] = useState<'progress' | 'calendar' | 'history'>('progress');

  // 3. Showly Sort Bottom Sheet State
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('recently_watched');
  const [tempSortOption, setTempSortOption] = useState<string>('recently_watched');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [tempSortDirection, setTempSortDirection] = useState<'asc' | 'desc'>('desc');
  const [newEpisodesFirst, setNewEpisodesFirst] = useState(false);
  const [tempNewEpisodesFirst, setTempNewEpisodesFirst] = useState(false);

  // Filter chips
  const [calendarFilter, setCalendarFilter] = useState<'upcoming' | 'premieres'>('upcoming');
  const [historyPeriod, setHistoryPeriod] = useState<'30days' | '7days' | 'all'>('30days');
  const [historyMenuOpen, setHistoryMenuOpen] = useState(false);

  // Accordion sections on Shows Progress
  const [upcomingSectionOpen, setUpcomingSectionOpen] = useState(false);
  const [onHoldSectionOpen, setOnHoldSectionOpen] = useState(false);
  const [filterOnHoldOnly, setFilterOnHoldOnly] = useState(false);
  const [filterUpcomingOnly, setFilterUpcomingOnly] = useState(false);

  // Available Sort Options based on active media tab (matching Showly screenshots)
  const sortOptions = useMemo(() => {
    if (activeTabType === 'shows') {
      return [
        { id: 'title', label: 'Title' },
        { id: 'top_rated', label: 'Top Rated' },
        { id: 'my_rating', label: 'My Rating' },
        { id: 'most_recent', label: 'Most Recent' },
        { id: 'recently_watched', label: 'Recently Watched' },
        { id: 'episodes_left', label: 'Episodes Left' },
        { id: 'random', label: 'Random' },
      ];
    }
    if (activeTabType === 'movies') {
      return [
        { id: 'title', label: 'Title' },
        { id: 'top_rated', label: 'Top Rated' },
        { id: 'my_rating', label: 'My Rating' },
        { id: 'runtime', label: 'Runtime' },
        { id: 'most_recent', label: 'Most Recent' },
        { id: 'recently_added', label: 'Recently Added' },
        { id: 'random', label: 'Random' },
      ];
    }
    // Combined Media
    return [
      { id: 'recently_watched', label: 'Recently Watched / Added' },
      { id: 'title', label: 'Title' },
      { id: 'top_rated', label: 'Top Rated' },
      { id: 'my_rating', label: 'My Rating' },
      { id: 'most_recent', label: 'Most Recent' },
      { id: 'random', label: 'Random' },
    ];
  }, [activeTabType]);

  const activeSortLabel = useMemo(() => {
    const match = sortOptions.find((o) => o.id === selectedSortOption);
    if (match) return match.label;
    return activeTabType === 'movies' ? 'Recently Added' : 'Recently Watched';
  }, [sortOptions, selectedSortOption, activeTabType]);

  // Open sort modal with current values preloaded
  const handleOpenSortModal = () => {
    setTempSortOption(selectedSortOption);
    setTempSortDirection(sortDirection);
    setTempNewEpisodesFirst(newEpisodesFirst);
    setSortModalOpen(true);
  };

  // Apply button inside sort bottom sheet
  const handleApplySort = () => {
    setSelectedSortOption(tempSortOption);
    setSortDirection(tempSortDirection);
    setNewEpisodesFirst(tempNewEpisodesFirst);
    setSortModalOpen(false);
  };

  // Base items filtering according to user rules:
  // - Shows in progress: TV shows where status === 'watching' (Add To Shows)
  // - Watchlist movies: Movies where status === 'watchlist'
  const activeShows = useMemo(() => {
    return library.filter((i) => {
      if (i.mediaType !== 'tv') return false;
      if (filterOnHoldOnly) return i.status === 'on_hold' || i.status === 'dropped';
      return i.status === 'watching';
    });
  }, [library, filterOnHoldOnly]);

  // Movies tab must NEVER include Order titles - only true TMDB user library movies
  const activeMovies = useMemo(() => {
    return library.filter((i) => i.mediaType === 'movie' && i.status === 'watchlist' && !(i as any).isOrderTitle && !(i as any).isMarvelOrder);
  }, [library]);

  // Daily Watch Calendar State for Order tab
  const [dailyPace, setDailyPace] = useState<number>(1);
  const [calendarPacePickerOpen, setCalendarPacePickerOpen] = useState(false);

  const onHoldShows = useMemo(() => {
    return library.filter((i) => i.mediaType === 'tv' && (i.status === 'on_hold' || i.status === 'dropped'));
  }, [library]);

  // Season details cache for accurate episode titles and release air dates
  const [seasonDetailsCache, setSeasonDetailsCache] = useState<Record<string, TMDBSeasonDetail>>({});

  // Pre-load season episodes for shows in progress
  useEffect(() => {
    activeShows.forEach((show) => {
      const watchedCount = getShowWatchedCount(show.tmdbId);
      const currentSeason = Math.max(1, Math.min(show.totalSeasons || 1, Math.floor(watchedCount / 10) + 1));
      const key = `${show.tmdbId}_${currentSeason}`;
      if (!seasonDetailsCache[key]) {
        getTVSeasonDetails(show.tmdbId, currentSeason).then((details) => {
          if (details) {
            setSeasonDetailsCache((prev) => ({ ...prev, [key]: details }));
          }
        });
      }
    });
  }, [activeShows, getShowWatchedCount, seasonDetailsCache]);

  // Compute next episode information & lock status
  const getNextEpisodeInfo = (item: typeof library[0]) => {
    const watchedCount = getShowWatchedCount(item.tmdbId);
    const totalCount = item.totalEpisodes || 10;
    const currentSeason = Math.max(1, Math.min(item.totalSeasons || 1, Math.floor(watchedCount / 10) + 1));
    const nextEpNumber = (watchedCount % 10) + 1;
    const key = `${item.tmdbId}_${currentSeason}`;
    const season = seasonDetailsCache[key];
    const episode = season?.episodes?.find((e) => e.episode_number === nextEpNumber);

    let isUnreleased = false;
    let airDateStr = episode?.air_date || '';
    let episodeTitle = episode?.name || `Episode ${nextEpNumber}`;

    if (airDateStr) {
      const airTime = new Date(`${airDateStr}T23:59:59`).getTime();
      isUnreleased = airTime > Date.now();
    } else if (item.title === 'VisionQuest' && nextEpNumber >= 5) {
      isUnreleased = true;
      airDateStr = nextEpNumber === 5 || nextEpNumber === 6 ? '2026-10-27' : nextEpNumber === 7 ? '2026-11-03' : '2026-11-10';
      if (nextEpNumber === 5) episodeTitle = 'Firewall';
      if (nextEpNumber === 6) episodeTitle = 'Deadlock';
      if (nextEpNumber === 7) episodeTitle = 'Ghost in the Shell';
      if (nextEpNumber === 8) episodeTitle = 'Reboot';
    }

    return {
      currentSeason,
      nextEpNumber,
      episodeTitle,
      airDateStr,
      isUnreleased,
      isCompleted: watchedCount >= totalCount,
    };
  };

  // Combined Media or tab-specific list
  const displayItems = useMemo(() => {
    if (activeTabType === 'order') return [];

    let list: typeof library = [];
    if (activeTabType === 'shows') {
      list = [...activeShows];
    } else if (activeTabType === 'movies') {
      list = [...activeMovies];
    } else {
      // Combined 'media' tab: Shows in progress + Movies on Watchlist
      list = [...activeShows, ...activeMovies];
    }

    // Filter by upcoming unreleased episodes if chip is selected
    if (filterUpcomingOnly) {
      list = list.filter((item) => {
        if (item.mediaType === 'tv') {
          const nextInfo = getNextEpisodeInfo(item);
          return nextInfo.isUnreleased;
        }
        if (item.mediaType === 'movie' && item.releaseDate) {
          return new Date(item.releaseDate).getTime() > Date.now();
        }
        return false;
      });
    }

    // Sort items
    list.sort((a, b) => {
      let comparison = 0;
      if (selectedSortOption === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (selectedSortOption === 'top_rated') {
        comparison = (b.voteAverage || 0) - (a.voteAverage || 0);
      } else if (selectedSortOption === 'my_rating') {
        comparison = (b.userRating || 0) - (a.userRating || 0);
      } else if (selectedSortOption === 'most_recent') {
        comparison = (b.releaseDate || '').localeCompare(a.releaseDate || '');
      } else if (selectedSortOption === 'episodes_left') {
        const leftA = (a.totalEpisodes || 10) - getShowWatchedCount(a.tmdbId);
        const leftB = (b.totalEpisodes || 10) - getShowWatchedCount(b.tmdbId);
        comparison = leftB - leftA;
      } else if (selectedSortOption === 'random') {
        comparison = 0.5 - Math.random();
      } else {
        // Default: Recently Watched / Recently Added / Updated
        comparison = new Date(b.updatedAt || b.addedAt).getTime() - new Date(a.updatedAt || a.addedAt).getTime();
      }

      return sortDirection === 'asc' ? -comparison : comparison;
    });

    return list;
  }, [activeTabType, activeShows, activeMovies, selectedSortOption, sortDirection, filterUpcomingOnly, getShowWatchedCount, seasonDetailsCache]);

  // History tab data
  const historyWatchedEpisodes = useMemo(() => {
    const watched = episodes.filter((e) => e.watched);
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    let filtered = watched.filter((e) => {
      if (historyPeriod === '7days') return now - new Date(e.watchedAt).getTime() <= 7 * dayMs;
      if (historyPeriod === '30days') return now - new Date(e.watchedAt).getTime() <= 30 * dayMs;
      return true;
    });

    return filtered.sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime());
  }, [episodes, historyPeriod]);

  // Calendar tab: scheduled upcoming episodes of tracked series & upcoming movies
  const calendarUpcomingEpisodes = useMemo(() => {
    interface UpcomingItem {
      id: string;
      showTitle: string;
      posterPath: string | null;
      backdropPath: string | null;
      seasonNumber: number;
      episodeNumber: number;
      episodeTitle: string;
      airDate: string;
      airDateFormatted: string;
      group: 'Next Week' | 'Upcoming';
      tmdbObj: TMDBItem;
    }

    const items: UpcomingItem[] = [];
    const now = Date.now();

    activeShows.forEach((show) => {
      const watchedCount = getShowWatchedCount(show.tmdbId);
      const currentSeason = Math.max(1, Math.min(show.totalSeasons || 1, Math.floor(watchedCount / 10) + 1));
      const key = `${show.tmdbId}_${currentSeason}`;
      const season = seasonDetailsCache[key];

      if (season?.episodes) {
        season.episodes.forEach((ep) => {
          if (ep.air_date) {
            const epAirTime = new Date(`${ep.air_date}T23:59:59`).getTime();
            if (epAirTime >= now) {
              const diffDays = Math.ceil((epAirTime - now) / (1000 * 60 * 60 * 24));
              const group = diffDays <= 7 ? 'Next Week' : 'Upcoming';
              items.push({
                id: `${show.tmdbId}_s${ep.season_number}_e${ep.episode_number}`,
                showTitle: show.title,
                posterPath: show.posterPath,
                backdropPath: show.backdropPath,
                seasonNumber: ep.season_number,
                episodeNumber: ep.episode_number,
                episodeTitle: ep.name || `Episode ${ep.episode_number}`,
                airDate: ep.air_date,
                airDateFormatted: new Date(ep.air_date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }),
                group,
                tmdbObj: toTMDBItem(show),
              });
            }
          }
        });
      } else if (show.title === 'VisionQuest') {
        const vqUpcoming = [
          { epNum: 5, title: 'Firewall', date: '2026-10-27', time: 'Wednesday, 28 Oct 2026, 09:00', group: 'Next Week' as const },
          { epNum: 6, title: 'Deadlock', date: '2026-10-27', time: 'Wednesday, 28 Oct 2026, 09:00', group: 'Next Week' as const },
          { epNum: 7, title: 'Ghost in the Shell', date: '2026-11-03', time: 'Tuesday, 03 Nov 2026, 09:00', group: 'Upcoming' as const },
          { epNum: 8, title: 'Reboot', date: '2026-11-10', time: 'Tuesday, 10 Nov 2026, 09:00', group: 'Upcoming' as const },
        ];

        vqUpcoming.forEach((vq) => {
          if (watchedCount < vq.epNum) {
            items.push({
              id: `${show.tmdbId}_s1_e${vq.epNum}`,
              showTitle: show.title,
              posterPath: show.posterPath,
              backdropPath: show.backdropPath,
              seasonNumber: 1,
              episodeNumber: vq.epNum,
              episodeTitle: vq.title,
              airDate: vq.date,
              airDateFormatted: vq.time,
              group: vq.group,
              tmdbObj: toTMDBItem(show),
            });
          }
        });
      }
    });

    if (activeTabType === 'movies' || activeTabType === 'media') {
      activeMovies.forEach((movie) => {
        if (movie.releaseDate) {
          const relTime = new Date(`${movie.releaseDate}T23:59:59`).getTime();
          if (relTime >= now) {
            const diffDays = Math.ceil((relTime - now) / (1000 * 60 * 60 * 24));
            items.push({
              id: `movie_${movie.tmdbId}`,
              showTitle: movie.title,
              posterPath: movie.posterPath,
              backdropPath: movie.backdropPath,
              seasonNumber: 0,
              episodeNumber: 0,
              episodeTitle: 'Theatrical Release',
              airDate: movie.releaseDate,
              airDateFormatted: new Date(movie.releaseDate).toLocaleDateString(undefined, {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }),
              group: diffDays <= 7 ? 'Next Week' : 'Upcoming',
              tmdbObj: toTMDBItem(movie),
            });
          }
        }
      });
    }

    return items.sort((a, b) => a.airDate.localeCompare(b.airDate));
  }, [activeShows, activeMovies, seasonDetailsCache, activeTabType, getShowWatchedCount]);

  // Action handlers
  const handleMarkShowEpisodeWatched = (e: React.MouseEvent, item: typeof library[0]) => {
    e.stopPropagation();
    const info = getNextEpisodeInfo(item);
    if (info.isCompleted) return;

    if (info.isUnreleased) {
      alert(`"${item.title} - ${info.episodeTitle}" has not aired yet. Scheduled for release on ${info.airDateStr || 'upcoming broadcast'}.`);
      return;
    }

    toggleEpisodeWatched(item.tmdbId, info.currentSeason, info.nextEpNumber, info.episodeTitle);
  };

  const handleToggleMovieWatched = (e: React.MouseEvent, item: typeof library[0]) => {
    e.stopPropagation();
    const nextStatus: WatchStatus = item.status === 'watched' ? 'watchlist' : 'watched';
    updateStatus(item.id, nextStatus);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-12 space-y-5">
      {/* 1. Top 4 Switcher: "Media" "Shows" "Movies" "Order" - Fits in one single frame without scrolling */}
      <div className="grid grid-cols-4 items-center justify-between gap-1 select-none pt-1 pb-1">
        {(['media', 'shows', 'movies', 'order'] as MediaTabType[]).map((tabKey) => {
          const label = tabKey === 'media' ? 'Media' : tabKey === 'shows' ? 'Shows' : tabKey === 'movies' ? 'Movies' : 'Order';
          const isActive = activeTabType === tabKey;
          return (
            <button
              key={tabKey}
              type="button"
              onClick={() => setActiveTabType(tabKey)}
              className={`text-center py-1 text-xl sm:text-2xl md:text-3xl font-serif font-bold transition-colors cursor-pointer truncate ${
                isActive ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 2. Sub-Tabs Bar: Progress, Calendar, History + Search Icon */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-medium">
          <button
            onClick={() => setSubTab('progress')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              subTab === 'progress' ? 'text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>Progress</span>
            {subTab === 'progress' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff2a85] rounded-full shadow-[0_0_8px_rgba(255,42,133,0.8)]" />
            )}
          </button>

          <button
            onClick={() => setSubTab('calendar')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              subTab === 'calendar' ? 'text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>Calendar</span>
            {subTab === 'calendar' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff2a85] rounded-full shadow-[0_0_8px_rgba(255,42,133,0.8)]" />
            )}
          </button>

          <button
            onClick={() => setSubTab('history')}
              className={`pb-2 relative transition-colors cursor-pointer ${
                subTab === 'history' ? 'text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span>History</span>
              {subTab === 'history' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff2a85] rounded-full shadow-[0_0_8px_rgba(255,42,133,0.8)]" />
              )}
          </button>
        </div>

        <button
          onClick={onOpenSearch}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Search titles"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB: PROGRESS                                                             */}
      {/* ========================================================================= */}
      {subTab === 'progress' && (
        <div className="space-y-4">
          {/* Filter Pills Row with Authentic Showly Sort Button (hidden on Order tab) */}
          {activeTabType !== 'order' && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {/* Showly Sort Pill Button: Opens SORT BY: bottom sheet */}
              <button
                type="button"
                onClick={handleOpenSortModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-transparent border border-zinc-700/80 hover:border-zinc-500 text-xs text-white transition-colors cursor-pointer shrink-0"
              >
                <span>{activeSortLabel}</span>
                <span className="text-zinc-400 font-mono text-[11px]">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              </button>

              {/* Upcoming and On Hold chips for Shows / Media */}
              {(activeTabType === 'shows' || activeTabType === 'media') && (
                <>
                  <button
                    onClick={() => {
                      setFilterUpcomingOnly(!filterUpcomingOnly);
                      setFilterOnHoldOnly(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer shrink-0 ${
                      filterUpcomingOnly
                        ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white'
                        : 'border-zinc-700/80 hover:border-zinc-500 text-zinc-300 bg-transparent'
                    }`}
                  >
                    Upcoming
                  </button>

                  <button
                    onClick={() => {
                      setFilterOnHoldOnly(!filterOnHoldOnly);
                      setFilterUpcomingOnly(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer shrink-0 ${
                      filterOnHoldOnly
                        ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white'
                        : 'border-zinc-700/80 hover:border-zinc-500 text-zinc-300 bg-transparent'
                    }`}
                  >
                    On Hold
                  </button>
                </>
              )}
            </div>
          )}

          {/* MARVEL VIEW (Connected directly to Order Timeline) */}
          {activeTabType === 'order' ? (
            marvelSetupDone ? (
              <OrderTimeline
                config={marvelConfig}
                items={marvelItems}
                watchedIds={marvelWatched}
                skippedIds={marvelSkipped}
                favoriteIds={marvelFavorites}
                onUpdateItems={(newItems) => {
                  setMarvelItems(newItems);
                  saveOrderItems(newItems);
                }}
                onUpdateWatched={(newWatched) => {
                  setMarvelWatched(newWatched);
                  saveStoredWatchedIds(newWatched);
                }}
                onUpdateSkipped={(newSkipped) => {
                  setMarvelSkipped(newSkipped);
                  saveStoredSkippedIds(newSkipped);
                }}
                onUpdateFavorites={(newFavs) => {
                  setMarvelFavorites(newFavs);
                  saveStoredFavoriteIds(newFavs);
                }}
                onUpdateConfig={(newCfg) => {
                  setMarvelConfig(newCfg);
                  saveOrderConfig(newCfg);
                }}
                onOpenWizard={() => {
                  if (onNavigateToOrder) onNavigateToOrder();
                }}
                onSelectTitle={async (title, year, marvelItem) => {
                  try {
                    const results = await searchMulti(title);
                    if (results && results.length > 0) {
                      let best = { ...results[0] };
                      if (year) {
                        const m = results.find((r) => {
                          const d = r.release_date || r.first_air_date;
                          return d && d.startsWith(year.toString());
                        });
                        if (m) best = { ...m };
                      }
                      if (marvelItem) {
                        (best as any).orderItemId = marvelItem.id;
                        (best as any).marvelId = marvelItem.id;
                        (best as any).orderItem = marvelItem;
                      }
                      onSelect(best);
                    } else if (marvelItem) {
                      // Fallback if search returns nothing: build TMDBItem from marvelItem
                      const syntheticItem: any = {
                        id: marvelItem.tmdbId || Math.abs(marvelItem.id.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)),
                        title: marvelItem.title,
                        media_type: marvelItem.mediaType === 'tv' ? 'tv' : 'movie',
                        release_date: `${marvelItem.year}-01-01`,
                        overview: `Part of the Marvel Cinematic Universe - ${marvelItem.phase}. Featured hero: ${marvelItem.hero}.`,
                        vote_average: 8.0,
                        orderItemId: marvelItem.id,
                        marvelId: marvelItem.id,
                      };
                      onSelect(syntheticItem);
                    }
                  } catch (e) {
                    console.warn('TMDB search error for order title:', e);
                  }
                }}
              />
            ) : (
              <div className="rounded-3xl bg-[#0a0a12] border border-zinc-800/80 p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1a1220] to-[#110e18] border border-[#ff2a85]/40 flex items-center justify-center text-[#ff2a85] mb-4 mx-auto shadow-[0_0_25px_rgba(255,42,133,0.3)]">
                  <Layers className="w-8 h-8" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ff2a85]/20 text-[#ff2a85] border border-[#ff2a85]/30">
                  Marvel Chronology & Timelines
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2 mb-2 font-serif">
                  Curate Your Marvel Universe Watchlist
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
                  Personalize your Marvel journey with custom properties (Road to Doomsday, Focus MCU Sacred Timeline, or All 280+ Properties) in Story or Release order.
                </p>
                <button
                  onClick={() => {
                    if (onNavigateToOrder) onNavigateToOrder();
                  }}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-bold shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer transform active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Setup Marvel Watchlist</span>
                </button>
              </div>
            )
          ) : displayItems.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-[#ff2a85]">
                {activeTabType === 'shows' ? <Tv className="w-6 h-6" /> : <Film className="w-6 h-6" />}
              </div>
              <h2 className="text-base font-bold text-white mb-1.5">
                No {activeTabType === 'shows' ? 'shows in progress' : activeTabType === 'movies' ? 'movies on watchlist' : 'titles in progress'}
              </h2>
              <p className="text-xs text-zinc-400 max-w-sm mb-5 leading-relaxed">
                {activeTabType === 'shows'
                  ? 'Click "Add To Shows" on any TV series in Discover to start tracking your watch journey.'
                  : activeTabType === 'movies'
                  ? 'Click "Watchlist" on any movie in Discover to start tracking it on Progress.'
                  : 'Add television shows or movies to begin tracking your watch progress.'}
              </p>
              <button
                onClick={onExplore}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.4)] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Titles</span>
              </button>
            </div>
          ) : (
            /* Items List (Supports TV Shows & Movies) */
            <div className="space-y-4">
              {displayItems.map((item) => {
                const poster = getImageUrl(item.posterPath, 'w300');
                const tmdbObj = toTMDBItem(item);

                if (item.mediaType === 'tv') {
                  const watchedCount = getShowWatchedCount(item.tmdbId);
                  const totalCount = item.totalEpisodes || 10;
                  const leftCount = Math.max(0, totalCount - watchedCount);
                  const nextInfo = getNextEpisodeInfo(item);
                  const percent = Math.min(100, Math.round((watchedCount / totalCount) * 100));

                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-3.5 py-3 border-b border-zinc-900/70 last:border-b-0 group"
                    >
                      {/* Left Poster */}
                      <div
                        onClick={() => onSelect(tmdbObj)}
                        className="w-20 sm:w-24 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-850 shadow-md cursor-pointer hover:border-[#ff2a85]/50 transition-colors"
                      >
                        {poster ? (
                          <img
                            src={poster}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <Tv className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      {/* Right Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                        <div>
                          <h3
                            onClick={() => onSelect(tmdbObj)}
                            className="text-base sm:text-lg font-serif font-bold text-white hover:text-[#ff2a85] transition-colors cursor-pointer truncate"
                          >
                            {item.title}
                          </h3>

                          {/* Episode Badge + Episode Title */}
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded bg-zinc-850 border border-zinc-800 text-zinc-300 font-mono text-[11px] font-semibold shrink-0">
                              S.{String(nextInfo.currentSeason).padStart(2, '0')} E.{String(nextInfo.nextEpNumber).padStart(2, '0')}
                            </span>
                            <span className="text-xs text-zinc-300 truncate font-normal">
                              {nextInfo.isCompleted ? 'Completed' : nextInfo.episodeTitle}
                            </span>
                            {nextInfo.isUnreleased && (
                              <span className="text-[10px] text-[#ff2a85] font-mono px-1.5 py-0.5 rounded bg-[#ff2a85]/10 border border-[#ff2a85]/30">
                                Airs {nextInfo.airDateStr}
                              </span>
                            )}
                          </div>

                          {/* Progress Line & Left Counter */}
                          <div className="flex items-center gap-3 mt-2.5">
                            <span className="text-[11px] text-zinc-400 font-mono shrink-0">
                              {watchedCount}/{totalCount} ({leftCount} left)
                            </span>
                            <div className="flex-1 h-1 bg-zinc-850 rounded-full overflow-hidden max-w-[140px] sm:max-w-[180px]">
                              <div
                                className="h-full bg-[#ff2a85] rounded-full shadow-[0_0_6px_rgba(255,42,133,0.7)]"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row: DETAILS text link & Locked/Active Button */}
                        <div className="flex items-center justify-between mt-3 pt-1">
                          <button
                            onClick={() => onSelect(tmdbObj)}
                            className="text-xs font-semibold tracking-wider text-zinc-400 hover:text-white uppercase transition-colors cursor-pointer"
                          >
                            DETAILS
                          </button>

                          <button
                            disabled={nextInfo.isUnreleased || nextInfo.isCompleted}
                            onClick={(e) => handleMarkShowEpisodeWatched(e, item)}
                            className={`px-5 py-1.5 rounded-full border flex items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                              nextInfo.isUnreleased
                                ? 'border-zinc-800 bg-zinc-900/60 text-zinc-500 cursor-not-allowed'
                                : 'border-zinc-500 hover:border-white text-white hover:bg-zinc-800 cursor-pointer active:scale-95'
                            }`}
                            title={
                              nextInfo.isUnreleased
                                ? `Episode unreleased. Airs ${nextInfo.airDateStr}`
                                : nextInfo.isCompleted
                                ? 'All episodes watched'
                                : 'Mark next episode as watched'
                            }
                          >
                            {nextInfo.isUnreleased ? (
                              <>
                                <Lock className="w-3.5 h-3.5 text-zinc-500" />
                                <span className="text-[11px] text-zinc-500">Unreleased</span>
                              </>
                            ) : (
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Movie Card
                const isWatched = item.status === 'watched';
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 py-3 border-b border-zinc-900/70 last:border-b-0 group"
                  >
                    <div
                      onClick={() => onSelect(tmdbObj)}
                      className="w-20 sm:w-24 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-850 shadow-md cursor-pointer hover:border-[#ff2a85]/50 transition-colors"
                    >
                      {poster ? (
                        <img
                          src={poster}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                          <Film className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                      <div>
                        <h3
                          onClick={() => onSelect(tmdbObj)}
                          className="text-base sm:text-lg font-serif font-bold text-white hover:text-[#ff2a85] transition-colors cursor-pointer truncate"
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                          {item.overview || 'Feature film in your watchlist.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-1">
                        <button
                          onClick={() => onSelect(tmdbObj)}
                          className="text-xs font-semibold tracking-wider text-zinc-400 hover:text-white uppercase transition-colors cursor-pointer"
                        >
                          DETAILS
                        </button>

                        <button
                          onClick={(e) => handleToggleMovieWatched(e, item)}
                          className={`px-6 py-1.5 rounded-full border transition-all cursor-pointer active:scale-95 flex items-center justify-center ${
                            isWatched
                              ? 'bg-[#ff2a85] border-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.5)]'
                              : 'border-zinc-500 hover:border-white text-white hover:bg-zinc-800'
                          }`}
                          title={isWatched ? 'Watched' : 'Mark as watched'}
                        >
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Collapsible Upcoming Section Header */}
              {activeTabType === 'shows' && (
                <>
                  <div className="pt-4 border-t border-zinc-900">
                    <button
                      onClick={() => setUpcomingSectionOpen(!upcomingSectionOpen)}
                      className="w-full flex items-center justify-between py-2 text-left group cursor-pointer"
                    >
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-[#ff2a85] transition-colors flex items-center gap-2">
                        <span>Upcoming</span>
                        <ChevronRight
                          className={`w-5 h-5 text-zinc-500 transition-transform ${
                            upcomingSectionOpen ? 'rotate-90 text-[#ff2a85]' : ''
                          }`}
                        />
                      </h3>
                    </button>
                    {upcomingSectionOpen && (
                      <div className="py-3 px-1 text-xs text-zinc-400 space-y-3">
                        {calendarUpcomingEpisodes.length > 0 ? (
                          calendarUpcomingEpisodes.map((ep) => (
                            <div
                              key={ep.id}
                              onClick={() => onSelect(ep.tmdbObj)}
                              className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-[#ff2a85]/40 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-14 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-850">
                                  {ep.posterPath ? (
                                    <img src={getImageUrl(ep.posterPath, 'w300')} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                      <Tv className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-white">{ep.showTitle}</h4>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    {ep.seasonNumber > 0 && (
                                      <span className="px-1.5 py-0.5 rounded bg-zinc-850 text-zinc-300 font-mono text-[10px]">
                                        S.{String(ep.seasonNumber).padStart(2, '0')} E.{String(ep.episodeNumber).padStart(2, '0')}
                                      </span>
                                    )}
                                    <span className="text-xs text-zinc-400 truncate">{ep.episodeTitle}</span>
                                  </div>
                                  <p className="text-[11px] text-[#ff2a85] font-medium mt-1">
                                    {ep.airDateFormatted}
                                  </p>
                                </div>
                              </div>
                              <button className="text-xs font-semibold text-zinc-400 hover:text-white uppercase transition-colors">
                                DETAILS
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-zinc-500">No upcoming episodes scheduled right now.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Collapsible On Hold Section Header */}
                  <div className="pt-1">
                    <button
                      onClick={() => setOnHoldSectionOpen(!onHoldSectionOpen)}
                      className="w-full flex items-center justify-between py-2 text-left group cursor-pointer"
                    >
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-[#ff2a85] transition-colors flex items-center gap-2">
                        <span>On Hold</span>
                        <ChevronRight
                          className={`w-5 h-5 text-zinc-500 transition-transform ${
                            onHoldSectionOpen ? 'rotate-90 text-[#ff2a85]' : ''
                          }`}
                        />
                      </h3>
                    </button>
                    {onHoldSectionOpen && (
                      <div className="py-3 px-1 text-xs text-zinc-400">
                        {onHoldShows.length > 0 ? (
                          <div className="space-y-2">
                            {onHoldShows.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-900"
                              >
                                <span className="font-medium text-white">{item.title}</span>
                                <button
                                  onClick={() => updateStatus(item.id, 'watching')}
                                  className="text-[11px] text-[#ff2a85] hover:underline"
                                >
                                  Resume
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-zinc-500">No shows currently placed on hold.</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: CALENDAR                                                             */}
      {/* ========================================================================= */}
      {subTab === 'calendar' && (
        activeTabType === 'order' ? (
          /* ================= ORDER DAILY WATCH CALENDAR ================= */
          <div className="space-y-6 pt-1">
            {/* Calendar Controls & Pace Selection Header */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c0c16] border border-zinc-800 space-y-3.5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#ff2a85]" />
                    <span>Order Daily Watch Plan</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {marvelItems.filter((i) => !marvelWatched.includes(i.id) && !marvelSkipped.includes(i.id)).length} titles remaining
                    {marvelItems.filter((i) => !marvelWatched.includes(i.id) && !marvelSkipped.includes(i.id)).length > 0
                      ? ` · Estimated completion in ${Math.ceil(marvelItems.filter((i) => !marvelWatched.includes(i.id) && !marvelSkipped.includes(i.id)).length / dailyPace)} days`
                      : ' · All caught up!'}
                  </p>
                </div>

                {/* Redo / Reset Calendar CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    // Force refresh/redo calendar from today
                    setCalendarPacePickerOpen(!calendarPacePickerOpen);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-semibold shadow-[0_0_12px_rgba(255,42,133,0.35)] transition-all cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Redo Calendar</span>
                </button>
              </div>

              {/* Pace Selector Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-850">
                <span className="text-[11px] font-semibold text-zinc-400 mr-1">Daily Pace:</span>
                {[
                  { pace: 1, label: '1 Title / Day' },
                  { pace: 2, label: '2 Titles / Day' },
                  { pace: 3, label: '3 Titles / Day' },
                ].map((item) => (
                  <button
                    key={item.pace}
                    type="button"
                    onClick={() => setDailyPace(item.pace)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      dailyPace === item.pace
                        ? 'bg-[#ff2a85] text-white shadow-sm font-semibold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Schedule Cards */}
            {marvelItems.filter((i) => !marvelWatched.includes(i.id) && !marvelSkipped.includes(i.id)).length === 0 ? (
              <div className="py-20 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">All Caught Up!</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  You have watched every title in your active order. Use "Adjust Order" to add more properties or reset!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {(() => {
                  const unwatched = marvelItems.filter((i) => !marvelWatched.includes(i.id) && !marvelSkipped.includes(i.id));
                  // Group titles by day
                  const dayGroups: { dayLabel: string; dateStr: string; items: typeof unwatched }[] = [];
                  const now = new Date();

                  unwatched.forEach((item, index) => {
                    const dayOffset = Math.floor(index / dailyPace);
                    if (dayOffset >= 30) return; // limit to next 30 days
                    const targetDate = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
                    const isToday = dayOffset === 0;
                    const isTomorrow = dayOffset === 1;
                    const dateFormatted = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const weekday = targetDate.toLocaleDateString('en-US', { weekday: 'short' });

                    const dayLabel = isToday ? `Today · ${dateFormatted}` : isTomorrow ? `Tomorrow · ${dateFormatted}` : `${weekday} · ${dateFormatted}`;

                    let existing = dayGroups.find((g) => g.dayLabel === dayLabel);
                    if (!existing) {
                      existing = { dayLabel, dateStr: dateFormatted, items: [] };
                      dayGroups.push(existing);
                    }
                    existing.items.push(item);
                  });

                  return dayGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-serif font-bold text-zinc-300 uppercase tracking-wider">
                          {group.dayLabel}
                        </span>
                        <div className="flex-1 h-[1px] bg-zinc-850" />
                      </div>

                      <div className="space-y-2">
                        {group.items.map((titleItem) => {
                          return (
                            <div
                              key={titleItem.id}
                              className="p-3 sm:p-3.5 rounded-2xl bg-[#0e0e18] border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between gap-3 shadow-sm"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                                  {titleItem.mediaType === 'tv' ? (
                                    <Tv className="w-4 h-4 text-purple-400" />
                                  ) : (
                                    <Film className="w-4 h-4 text-rose-400" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                    {titleItem.title}
                                  </h4>
                                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                                    <span className="text-[#ff2a85] font-semibold">{titleItem.year}</span>
                                    <span>•</span>
                                    <span>{titleItem.runtime}</span>
                                    <span>•</span>
                                    <span className="truncate">{titleItem.hero}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Quick Mark Watched Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  const nextWatched = [...marvelWatched, titleItem.id];
                                  setMarvelWatched(nextWatched);
                                  saveStoredWatchedIds(nextWatched);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer shrink-0"
                                title="Mark as Watched"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Watched</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        ) : (
          /* ================= SHOWS / MOVIES / MEDIA UPCOMING CALENDAR ================= */
        <div className="space-y-6 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCalendarFilter('upcoming')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                calendarFilter === 'upcoming'
                  ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white'
                  : 'border-zinc-700/80 hover:border-zinc-500 text-zinc-300 bg-transparent'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-[#ff2a85]" />
              <span>Upcoming</span>
            </button>
            <button
              onClick={() => setCalendarFilter('premieres')}
              className={`px-3.5 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                calendarFilter === 'premieres'
                  ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white'
                  : 'border-zinc-700/80 hover:border-zinc-500 text-zinc-300 bg-transparent'
              }`}
            >
              Premieres
            </button>
          </div>

          {calendarUpcomingEpisodes.length === 0 ? (
            <div className="py-24 text-center">
              <h2 className="text-xl font-serif font-bold tracking-wider text-white mb-2 uppercase">
                CALENDAR
              </h2>
              <p className="text-xs text-zinc-400">
                There are no new {activeTabType === 'movies' ? 'movies' : 'shows'} on the way.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Group: Next Week */}
              {calendarUpcomingEpisodes.filter((i) => i.group === 'Next Week').length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Next Week
                  </h3>
                  <div className="space-y-3">
                    {calendarUpcomingEpisodes
                      .filter((i) => i.group === 'Next Week')
                      .map((ep) => {
                        const poster = getImageUrl(ep.posterPath, 'w300');
                        return (
                          <div
                            key={ep.id}
                            className="flex items-start gap-3.5 py-3 border-b border-zinc-900/60 last:border-b-0 group"
                          >
                            <div
                              onClick={() => onSelect(ep.tmdbObj)}
                              className="w-16 sm:w-20 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-850 cursor-pointer hover:border-[#ff2a85]/50 transition-colors"
                            >
                              {poster ? (
                                <img
                                  src={poster}
                                  alt={ep.showTitle}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                  <Tv className="w-5 h-5" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                              <div>
                                <h4
                                  onClick={() => onSelect(ep.tmdbObj)}
                                  className="text-base font-serif font-bold text-white group-hover:text-[#ff2a85] transition-colors cursor-pointer truncate"
                                >
                                  {ep.showTitle}
                                </h4>
                                {ep.seasonNumber > 0 && (
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="px-1.5 py-0.5 rounded bg-zinc-850 text-zinc-300 font-mono text-[10px]">
                                      S.{String(ep.seasonNumber).padStart(2, '0')} E.{String(ep.episodeNumber).padStart(2, '0')}
                                    </span>
                                    <span className="text-xs text-zinc-300 truncate">
                                      {ep.episodeTitle}
                                    </span>
                                  </div>
                                )}
                                <p className="text-xs text-zinc-400 mt-1.5">
                                  {ep.airDateFormatted}
                                </p>
                              </div>

                              <div className="flex items-center justify-end mt-2">
                                <button
                                  onClick={() => onSelect(ep.tmdbObj)}
                                  className="text-xs font-semibold tracking-wider text-zinc-400 hover:text-white uppercase transition-colors cursor-pointer"
                                >
                                  DETAILS
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Group: Coming Later */}
              {calendarUpcomingEpisodes.filter((i) => i.group === 'Upcoming').length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Coming Soon
                  </h3>
                  <div className="space-y-3">
                    {calendarUpcomingEpisodes
                      .filter((i) => i.group === 'Upcoming')
                      .map((ep) => {
                        const poster = getImageUrl(ep.posterPath, 'w300');
                        return (
                          <div
                            key={ep.id}
                            className="flex items-start gap-3.5 py-3 border-b border-zinc-900/60 last:border-b-0 group"
                          >
                            <div
                              onClick={() => onSelect(ep.tmdbObj)}
                              className="w-16 sm:w-20 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-850 cursor-pointer hover:border-[#ff2a85]/50 transition-colors"
                            >
                              {poster ? (
                                <img
                                  src={poster}
                                  alt={ep.showTitle}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                  <Tv className="w-5 h-5" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                              <div>
                                <h4
                                  onClick={() => onSelect(ep.tmdbObj)}
                                  className="text-base font-serif font-bold text-white group-hover:text-[#ff2a85] transition-colors cursor-pointer truncate"
                                >
                                  {ep.showTitle}
                                </h4>
                                {ep.seasonNumber > 0 && (
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="px-1.5 py-0.5 rounded bg-zinc-850 text-zinc-300 font-mono text-[10px]">
                                      S.{String(ep.seasonNumber).padStart(2, '0')} E.{String(ep.episodeNumber).padStart(2, '0')}
                                    </span>
                                    <span className="text-xs text-zinc-300 truncate">
                                      {ep.episodeTitle}
                                    </span>
                                  </div>
                                )}
                                <p className="text-xs text-zinc-400 mt-1.5">
                                  {ep.airDateFormatted}
                                </p>
                              </div>

                              <div className="flex items-center justify-end mt-2">
                                <button
                                  onClick={() => onSelect(ep.tmdbObj)}
                                  className="text-xs font-semibold tracking-wider text-zinc-400 hover:text-white uppercase transition-colors cursor-pointer"
                                >
                                  DETAILS
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        )
      )}

      {/* ========================================================================= */}
      {/* TAB: HISTORY                                                              */}
      {/* ========================================================================= */}
      {subTab === 'history' && (
        <div className="space-y-5 pt-1">
          <div className="relative inline-block">
            <button
              onClick={() => setHistoryMenuOpen(!historyMenuOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-700/80 hover:border-zinc-500 text-xs text-white bg-transparent transition-colors cursor-pointer"
            >
              <span>
                {historyPeriod === '30days'
                  ? 'Last 30 days'
                  : historyPeriod === '7days'
                  ? 'Last 7 days'
                  : 'All time'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {historyMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setHistoryMenuOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-40 rounded-xl bg-[#0e0e16] border border-zinc-800 shadow-xl z-40 py-1 text-xs">
                  <button
                    onClick={() => {
                      setHistoryPeriod('30days');
                      setHistoryMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 cursor-pointer"
                  >
                    Last 30 days
                  </button>
                  <button
                    onClick={() => {
                      setHistoryPeriod('7days');
                      setHistoryMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 cursor-pointer"
                  >
                    Last 7 days
                  </button>
                  <button
                    onClick={() => {
                      setHistoryPeriod('all');
                      setHistoryMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 cursor-pointer"
                  >
                    All time
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order Tab History */}
          {activeTabType === 'order' ? (
            marvelItems.filter((i) => marvelWatched.includes(i.id)).length === 0 ? (
              <div className="py-24 text-center">
                <h2 className="text-xl font-serif font-bold tracking-wider text-white mb-2 uppercase">
                  ORDER HISTORY
                </h2>
                <p className="text-xs text-zinc-400">
                  No Order titles marked as watched yet. Tap [✓] on titles in the timeline to log them here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Completed Titles ({marvelItems.filter((i) => marvelWatched.includes(i.id)).length})
                </h3>
                <div className="space-y-2.5">
                  {marvelItems
                    .filter((i) => marvelWatched.includes(i.id))
                    .map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-3 sm:p-3.5 rounded-2xl bg-[#0d0d16] border border-emerald-500/25 flex items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                              <span className="text-[#ff2a85] font-semibold">{item.year}</span>
                              <span>•</span>
                              <span>{item.runtime}</span>
                              <span>•</span>
                              <span className="truncate">{item.hero}</span>
                              <span>•</span>
                              <span className="truncate">{item.phase}</span>
                            </div>
                          </div>
                        </div>

                        {/* Unmark Watched Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const nextWatched = marvelWatched.filter((id) => id !== item.id);
                            setMarvelWatched(nextWatched);
                            saveStoredWatchedIds(nextWatched);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer shrink-0"
                          title="Unmark Watched"
                        >
                          Undo
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )
          ) : activeTabType === 'movies' ? (
            /* Movies History */
            library.filter((i) => i.mediaType === 'movie' && i.status === 'watched').length === 0 ? (
              <div className="py-24 text-center">
                <h2 className="text-xl font-serif font-bold tracking-wider text-white mb-2 uppercase">
                  MOVIE HISTORY
                </h2>
                <p className="text-xs text-zinc-400">
                  No movies marked as watched yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Watched Movies ({library.filter((i) => i.mediaType === 'movie' && i.status === 'watched').length})
                </h3>
                <div className="space-y-2.5">
                  {library
                    .filter((i) => i.mediaType === 'movie' && i.status === 'watched')
                    .map((item) => {
                      const poster = getImageUrl(item.posterPath, 'w300');
                      const tmdbObj = toTMDBItem(item);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0d0d16] border border-zinc-850"
                        >
                          <div
                            onClick={() => onSelect(tmdbObj)}
                            className="w-12 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800 cursor-pointer"
                          >
                            {poster && <img src={poster} alt={item.title} className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              onClick={() => onSelect(tmdbObj)}
                              className="text-sm font-serif font-bold text-white truncate cursor-pointer hover:text-[#ff2a85]"
                            >
                              {item.title}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-0.5">{item.releaseDate ? item.releaseDate.substring(0, 4) : ''}</p>
                          </div>
                          <span className="px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                            Watched
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )
          ) : historyWatchedEpisodes.length === 0 ? (
            <div className="py-24 text-center">
              <h2 className="text-xl font-serif font-bold tracking-wider text-white mb-2 uppercase">
                HISTORY
              </h2>
              <p className="text-xs text-zinc-400">
                No watched episodes or titles logged yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Today
              </h3>

              <div className="space-y-4">
                {historyWatchedEpisodes.map((ep) => {
                  const showItem = library.find((i) => i.tmdbId === ep.showId);
                  const poster = getImageUrl(showItem?.posterPath, 'w300');
                  const tmdbObj = showItem ? toTMDBItem(showItem) : null;

                  return (
                    <div
                      key={ep.id}
                      className="flex items-start gap-3.5 py-2.5 border-b border-zinc-900/60 last:border-b-0 group"
                    >
                      <div
                        onClick={() => tmdbObj && onSelect(tmdbObj)}
                        className="w-16 sm:w-20 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-850 cursor-pointer"
                      >
                        {poster ? (
                          <img
                            src={poster}
                            alt={showItem?.title || 'Show'}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <Tv className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                        <div>
                          <h4
                            onClick={() => tmdbObj && onSelect(tmdbObj)}
                            className="text-base font-serif font-bold text-white group-hover:text-[#ff2a85] transition-colors cursor-pointer truncate"
                          >
                            {showItem?.title || `Show #${ep.showId}`}
                          </h4>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-1.5 py-0.5 rounded bg-zinc-850 text-zinc-300 font-mono text-[10px]">
                              S.{String(ep.seasonNumber).padStart(2, '0')} E.{String(ep.episodeNumber).padStart(2, '0')}
                            </span>
                            <span className="text-xs text-zinc-300 truncate">
                              {ep.episodeTitle || `Episode ${ep.episodeNumber}`}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>
                              {new Date(ep.watchedAt).toLocaleDateString(undefined, {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end mt-2">
                          <button
                            onClick={() => tmdbObj && onSelect(tmdbObj)}
                            className="text-xs font-semibold tracking-wider text-zinc-400 hover:text-white uppercase transition-colors cursor-pointer"
                          >
                            DETAILS
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* AUTHENTIC SHOWLY "SORT BY:" BOTTOM SHEET MODAL (Screenshots 1 & 2)         */}
      {/* ========================================================================= */}
      {sortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSortModalOpen(false)}
          />

          <div className="relative w-full sm:max-w-md bg-[#13131c] border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-2xl p-6 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-6 duration-200">
            {/* Header: SORT BY: in bold uppercase */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
              <h3 className="text-base font-bold text-white tracking-wider font-mono">
                SORT BY:
              </h3>
              <button
                onClick={() => setSortModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Options List */}
            <div className="flex-1 overflow-y-auto space-y-1 py-1 no-scrollbar">
              {sortOptions.map((opt) => {
                const isSelected = tempSortOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (isSelected) {
                        // Toggle direction when tapping the active option
                        setTempSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
                      } else {
                        setTempSortOption(opt.id);
                        setTempSortDirection('desc');
                      }
                    }}
                    className={`w-full flex items-center justify-between py-3.5 px-3 rounded-lg transition-colors text-left cursor-pointer ${
                      isSelected
                        ? 'text-white font-medium bg-zinc-900/60'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Vertical red/pink accent indicator when active */}
                      {isSelected ? (
                        <div className="w-1 h-5 rounded-full bg-[#ff2a85] shadow-[0_0_8px_rgba(255,42,133,0.8)]" />
                      ) : (
                        <div className="w-1 h-5" />
                      )}
                      <span className="text-sm font-serif sm:font-sans">{opt.label}</span>
                    </div>

                    {/* Arrow down / up on right when active */}
                    {isSelected && (
                      <span className="text-[#ff2a85] font-mono text-base font-bold">
                        {tempSortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Checkbox: New episodes always first (for Shows & Media) */}
            {(activeTabType === 'shows' || activeTabType === 'media') && (
              <div className="pt-3 pb-4 border-t border-zinc-850">
                <label className="flex items-center gap-3 text-xs text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={tempNewEpisodesFirst}
                    onChange={(e) => setTempNewEpisodesFirst(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#ff2a85] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>New episodes always first</span>
                </label>
              </div>
            )}

            {/* Full-Width Hot Pink APPLY Button (Matching Showly Screenshots 1 & 2) */}
            <div className="pt-2">
              <button
                onClick={handleApplySort}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(255,42,133,0.5)] transition-all cursor-pointer active:scale-98"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
