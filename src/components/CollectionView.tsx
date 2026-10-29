import React, { useState, useMemo, useEffect } from 'react';
import {
  Bookmark,
  Check,
  Heart,
  Star,
  Trash2,
  Sparkles,
  Film,
  Tv,
  Layers,
  ListPlus,
  X,
  Search,
  LayoutGrid,
  Rows,
  Clock,
  Settings
} from 'lucide-react';
import { LibraryItem, MediaType, TMDBItem, CustomList } from '../types/tmdb';
import { useLibrary } from '../context/LibraryContext';
import { getImageUrl, getDetails } from '../services/tmdb';
import { getShowTotalEpisodes } from '../utils/showMetadata';

interface CollectionViewProps {
  onSelect: (item: TMDBItem) => void;
  onExplore: () => void;
  onOpenSearch?: () => void;
  onOpenSettings?: () => void;
}

type MainCategory = 'shows' | 'movies' | 'lists';
type ShowsSubTab = 'my_shows' | 'watchlist' | 'favorites';
type MoviesSubTab = 'history' | 'watchlist' | 'favorites';

type SortOption =
  | 'title'
  | 'top_rated'
  | 'most_recent'
  | 'recently_added'
  | 'recently_watched'
  | 'random'
  | 'recently_updated';

type StatusFilter = 'all' | 'watching' | 'upcoming' | 'finished';
type UpcomingFilter = 'all' | 'upcoming' | 'released';
type ViewMode = 'compact' | 'grid';

// 20 Authentic Streaming & Broadcast Networks
const NETWORK_OPTIONS = [
  { id: 'ABC', name: 'ABC', badge: 'abc', bg: 'bg-zinc-800 text-white' },
  { id: 'Amazon', name: 'Amazon', badge: 'a', bg: 'bg-sky-950 text-sky-400' },
  { id: 'AMC', name: 'AMC', badge: 'amc', bg: 'bg-zinc-800 text-white' },
  { id: 'Apple', name: 'Apple', badge: 'tv', bg: 'bg-zinc-800 text-white' },
  { id: 'BBC', name: 'BBC', badge: 'BBC', bg: 'bg-pink-950 text-pink-300' },
  { id: 'CBS', name: 'CBS', badge: 'CBS', bg: 'bg-blue-950 text-blue-300' },
  { id: 'Crunchyroll', name: 'Crunchyroll', badge: 'CR', bg: 'bg-pink-950 text-[#ff2a85]' },
  { id: 'CW', name: 'CW', badge: 'cw', bg: 'bg-emerald-950 text-emerald-400' },
  { id: 'Discovery', name: 'Discovery', badge: 'D', bg: 'bg-blue-900 text-white' },
  { id: 'Disney', name: 'Disney', badge: 'Disney', bg: 'bg-blue-950 text-blue-300' },
  { id: 'FOX', name: 'FOX', badge: 'FOX', bg: 'bg-zinc-800 text-zinc-300' },
  { id: 'HBO Max', name: 'HBO Max', badge: 'HBO', bg: 'bg-purple-950 text-purple-300' },
  { id: 'Hulu', name: 'Hulu', badge: 'hulu', bg: 'bg-emerald-950 text-emerald-300' },
  { id: 'ITV', name: 'ITV', badge: 'itv', bg: 'bg-cyan-950 text-cyan-300' },
  { id: 'NBC', name: 'NBC', badge: 'NBC', bg: 'bg-zinc-800 text-zinc-300' },
  { id: 'Netflix', name: 'Netflix', badge: 'N', bg: 'bg-pink-950 text-[#ff2a85] font-black' },
  { id: 'Paramount', name: 'Paramount', badge: 'P+', bg: 'bg-blue-950 text-blue-400' },
  { id: 'Peacock', name: 'Peacock', badge: 'P', bg: 'bg-emerald-950 text-emerald-400' },
  { id: 'Rakuten TV', name: 'Rakuten TV', badge: 'R', bg: 'bg-pink-950 text-[#ff2a85]' },
  { id: 'Showtime', name: 'Showtime', badge: 'SHO', bg: 'bg-pink-950 text-[#ff2a85] font-bold' },
];

// 16 Authentic Genre Chips
const GENRE_OPTIONS = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 9999, name: 'Anime' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science-Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

// Dictionary of known TV series & movies to their network/distributor
const KNOWN_NETWORKS: Record<string, string> = {
  'american horror story': 'FX',
  'the mentalist': 'CBS',
  'the legend of korra': 'Nickelodeon',
  'avatar: the last airbender': 'Nickelodeon',
  'visionquest': 'Disney+',
  'spider-man': 'Syndication',
  'clown in a cornfield': 'Temple Hill',
  'red, white & royal blue': 'Amazon',
  'the school for good and evil': 'Netflix',
  'carrie': 'MGM',
  'stranger things': 'Netflix',
  'wednesday': 'Netflix',
  'squid game': 'Netflix',
  'game of thrones': 'HBO Max',
  'house of the dragon': 'HBO Max',
  'the last of us': 'HBO Max',
  'succession': 'HBO Max',
  'the boys': 'Amazon',
  'the bear': 'FX',
  'shogun': 'FX',
  'fargo': 'FX',
  'ted lasso': 'Apple',
  'severance': 'Apple',
  'breaking bad': 'AMC',
  'better call saul': 'AMC',
  'the walking dead': 'AMC',
  'loki': 'Disney+',
  'the mandalorian': 'Disney+',
  'wandavision': 'Disney+',
  'ironheart': 'Disney+',
  'daredevil': 'Disney+',
  'captain america': 'Marvel',
  'avengers': 'Marvel',
  'the office': 'NBC',
  'friends': 'NBC',
  'grey\'s anatomy': 'ABC',
  'modern family': 'ABC',
  'doctor who': 'BBC',
  'peaky blinders': 'BBC',
  'sherlock': 'BBC',
};

function getItemNetwork(item: LibraryItem): string {
  const normTitle = (item.title || '').toLowerCase().trim();
  for (const [key, net] of Object.entries(KNOWN_NETWORKS)) {
    if (normTitle.includes(key) || key.includes(normTitle)) {
      return net;
    }
  }
  return '';
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  onSelect,
  onExplore,
  onOpenSearch,
  onOpenSettings,
}) => {
  const {
    library,
    customLists,
    createCustomList,
    deleteCustomList,
    toggleItemInCustomList,
  } = useLibrary();

  // Top level categories
  const [mainCategory, setMainCategory] = useState<MainCategory>('shows');
  const [showsSubTab, setShowsSubTab] = useState<ShowsSubTab>('my_shows');
  const [moviesSubTab, setMoviesSubTab] = useState<MoviesSubTab>('history');

  // Sorting & Filtering
  const [sortBy, setSortBy] = useState<SortOption>('recently_added');
  const [tempSortBy, setTempSortBy] = useState<SortOption>('recently_added');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [tempSortDirection, setTempSortDirection] = useState<'asc' | 'desc'>('desc');

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tempStatusFilter, setTempStatusFilter] = useState<StatusFilter>('all');

  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [tempNetwork, setTempNetwork] = useState<string>('');

  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
  const [tempGenreId, setTempGenreId] = useState<number>(0);

  const [upcomingFilter, setUpcomingFilter] = useState<UpcomingFilter>('all');

  // View presentation mode: compact list vs grid
  const [viewMode, setViewMode] = useState<ViewMode>('compact');

  // Bottom sheets modals
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [networkModalOpen, setNetworkModalOpen] = useState(false);
  const [genreModalOpen, setGenreModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // Search filter
  const [searchFilterOpen, setSearchFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Custom List view & creation state
  const [selectedCustomListId, setSelectedCustomListId] = useState<string | null>(null);
  const [newListModalOpen, setNewListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');

  // Missing custom list items cache
  const [fetchedMissingItems, setFetchedMissingItems] = useState<
    Record<
      string,
      {
        id: string;
        tmdbId: number;
        mediaType: MediaType;
        title: string;
        posterPath: string | null;
        backdropPath?: string | null;
        releaseDate?: string;
        voteAverage?: number;
      }
    >
  >({});

  const activeCustomList = customLists.find((l) => l.id === selectedCustomListId);

  // Auto-fetch missing items in selected list
  useEffect(() => {
    if (!activeCustomList) return;
    const missingIds = activeCustomList.itemIds.filter((id) => {
      const inLib = library.some((l) => l.id === id);
      const inCached = activeCustomList.items?.some((i) => i.id === id);
      const inFetched = !!fetchedMissingItems[id];
      return !inLib && !inCached && !inFetched;
    });

    if (missingIds.length === 0) return;

    missingIds.forEach(async (id) => {
      const parts = id.split('_');
      if (parts.length < 2) return;
      const type: MediaType = parts[0] === 'tv' ? 'tv' : 'movie';
      const tmdbId = parseInt(parts[1], 10);
      if (isNaN(tmdbId)) return;

      try {
        const details = await getDetails(tmdbId, type);
        setFetchedMissingItems((prev) => ({
          ...prev,
          [id]: {
            id,
            tmdbId: details.id,
            mediaType: type,
            title: details.title || details.name || 'Untitled',
            posterPath: details.poster_path,
            backdropPath: details.backdrop_path,
            releaseDate: details.release_date || details.first_air_date || '',
            voteAverage: details.vote_average || 0,
          },
        }));
      } catch (err) {
        console.warn('Failed to fetch missing custom list item:', id, err);
      }
    });
  }, [activeCustomList, library, fetchedMissingItems]);

  const activeCustomListItems = useMemo(() => {
    if (!activeCustomList) return [];
    const items: Array<{
      id: string;
      tmdbId: number;
      mediaType: MediaType;
      title: string;
      posterPath: string | null;
      backdropPath?: string | null;
      releaseDate?: string;
      voteAverage?: number;
      overview?: string;
      totalEpisodes?: number;
      totalSeasons?: number;
    }> = [];

    activeCustomList.itemIds.forEach((id) => {
      const libMatch = library.find((l) => l.id === id);
      if (libMatch) {
        items.push({
          id: libMatch.id,
          tmdbId: libMatch.tmdbId,
          mediaType: libMatch.mediaType,
          title: libMatch.title,
          posterPath: libMatch.posterPath,
          backdropPath: libMatch.backdropPath,
          releaseDate: libMatch.releaseDate,
          voteAverage: libMatch.voteAverage,
          overview: libMatch.overview,
          totalEpisodes: libMatch.totalEpisodes,
          totalSeasons: libMatch.totalSeasons,
        });
        return;
      }

      const cachedMatch = activeCustomList.items?.find((i) => i.id === id);
      if (cachedMatch) {
        items.push(cachedMatch);
        return;
      }

      if (fetchedMissingItems[id]) {
        items.push(fetchedMissingItems[id]);
      }
    });

    return items;
  }, [activeCustomList, library, fetchedMissingItems]);

  const handleCardClick = (item: any) => {
    const tmdbObj: TMDBItem = {
      id: item.tmdbId,
      title: item.mediaType === 'movie' ? item.title : undefined,
      name: item.mediaType === 'tv' ? item.title : undefined,
      poster_path: item.posterPath,
      backdrop_path: item.backdropPath,
      release_date: item.mediaType === 'movie' ? item.releaseDate : undefined,
      first_air_date: item.mediaType === 'tv' ? item.releaseDate : undefined,
      vote_average: item.voteAverage || 0,
      vote_count: 0,
      overview: item.overview || '',
      media_type: item.mediaType,
      number_of_episodes: getShowTotalEpisodes(item),
      number_of_seasons: item.totalSeasons,
    };
    onSelect(tmdbObj);
  };

  // Base items partitioned by current tab state
  const baseItems = useMemo(() => {
    if (mainCategory === 'shows') {
      const showsOnly = library.filter((i) => i.mediaType === 'tv');
      if (showsSubTab === 'my_shows') {
        return showsOnly.filter((i) => i.status === 'watching' || i.status === 'watched' || i.status === 'watchlist');
      }
      if (showsSubTab === 'watchlist') {
        return showsOnly.filter((i) => i.status === 'watchlist');
      }
      if (showsSubTab === 'favorites') {
        return showsOnly.filter((i) => i.favorite);
      }
    } else if (mainCategory === 'movies') {
      const moviesOnly = library.filter((i) => i.mediaType === 'movie');
      if (moviesSubTab === 'history') {
        return moviesOnly.filter((i) => i.status === 'watched');
      }
      if (moviesSubTab === 'watchlist') {
        return moviesOnly.filter((i) => i.status === 'watchlist');
      }
      if (moviesSubTab === 'favorites') {
        return moviesOnly.filter((i) => i.favorite);
      }
    }
    return [];
  }, [library, mainCategory, showsSubTab, moviesSubTab]);

  // Top Section: "Recently Added" items (up to 6 items)
  const recentlyAddedCards = useMemo(() => {
    return [...baseItems]
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, 6);
  }, [baseItems]);

  // Main filtered & sorted items
  const displayItems = useMemo(() => {
    let items = [...baseItems];

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'watching') {
        items = items.filter((i) => i.status === 'watching');
      } else if (statusFilter === 'finished') {
        items = items.filter((i) => i.status === 'watched');
      } else if (statusFilter === 'upcoming') {
        items = items.filter(
          (i) => i.releaseDate && new Date(i.releaseDate).getTime() > Date.now()
        );
      }
    }

    // Network filter
    if (selectedNetwork) {
      items = items.filter((i) => {
        const net = getItemNetwork(i);
        return (
          net.toLowerCase() === selectedNetwork.toLowerCase() ||
          net.toLowerCase().includes(selectedNetwork.toLowerCase())
        );
      });
    }

    // Genre filter
    if (selectedGenreId !== 0) {
      items = items.filter((i) => {
        if (selectedGenreId === 9999) {
          return (
            i.genreIds?.includes(16) ||
            i.title.toLowerCase().includes('anime') ||
            (i.overview || '').toLowerCase().includes('anime')
          );
        }
        return i.genreIds?.includes(selectedGenreId);
      });
    }

    // Upcoming / Released filter
    if (upcomingFilter === 'upcoming') {
      items = items.filter((i) => i.releaseDate && new Date(i.releaseDate).getTime() > Date.now());
    } else if (upcomingFilter === 'released') {
      items = items.filter((i) => !i.releaseDate || new Date(i.releaseDate).getTime() <= Date.now());
    }

    // Inline search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((i) => i.title.toLowerCase().includes(q));
    }

    // Sorting
    items.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'top_rated') {
        const rA = a.userRating || a.voteAverage || 0;
        const rB = b.userRating || b.voteAverage || 0;
        comparison = rB - rA;
      } else if (sortBy === 'most_recent') {
        comparison = (b.releaseDate || '').localeCompare(a.releaseDate || '');
      } else if (sortBy === 'recently_added') {
        comparison = new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      } else if (sortBy === 'recently_watched') {
        comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortBy === 'random') {
        comparison = Math.random() - 0.5;
      }
      return sortDirection === 'asc' ? -comparison : comparison;
    });

    return items;
  }, [baseItems, statusFilter, selectedNetwork, selectedGenreId, upcomingFilter, searchQuery, sortBy, sortDirection]);

  // Sort label display
  const sortLabel = useMemo(() => {
    switch (sortBy) {
      case 'title':
        return 'Title';
      case 'top_rated':
        return 'Top Rated';
      case 'most_recent':
        return 'Most Recent';
      case 'recently_added':
        return 'Recently Added';
      case 'recently_watched':
        return 'Recently Watched';
      case 'recently_updated':
        return 'Recently Updated';
      case 'random':
        return 'Random';
      default:
        return 'Recently Added';
    }
  }, [sortBy]);

  // Status label display
  const statusLabel = useMemo(() => {
    switch (statusFilter) {
      case 'watching':
        return 'Watching';
      case 'upcoming':
        return 'Upcoming';
      case 'finished':
        return 'Finished';
      default:
        return 'All';
    }
  }, [statusFilter]);

  // Sorted custom lists
  const sortedCustomLists = useMemo(() => {
    const list = [...customLists];
    list.sort((a, b) => {
      if (sortBy === 'title') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortBy === 'most_recent') {
        return sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      }
      return sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });
    return list;
  }, [customLists, sortBy, sortDirection]);

  const handleApplySort = () => {
    setSortBy(tempSortBy);
    setSortDirection(tempSortDirection);
    setSortModalOpen(false);
  };

  const handleApplyStatus = () => {
    setStatusFilter(tempStatusFilter);
    setStatusModalOpen(false);
  };

  const handleApplyNetwork = () => {
    setSelectedNetwork(tempNetwork);
    setNetworkModalOpen(false);
  };

  const handleApplyGenre = () => {
    setSelectedGenreId(tempGenreId);
    setGenreModalOpen(false);
  };

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createCustomList(newListName.trim(), newListDesc.trim() || 'Curated personal list');
    setNewListName('');
    setNewListDesc('');
    setNewListModalOpen(false);
  };

  const showRecentlyAddedSection =
    (mainCategory === 'shows' && showsSubTab === 'my_shows') ||
    (mainCategory === 'movies' && moviesSubTab === 'history');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 pb-28 text-zinc-100 overflow-x-hidden font-sans">
      {/* ================= 1. SHOWLY TOP SEARCH CAPSULE ================= */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-[#0a0a10] border border-zinc-800 shadow-md mb-6">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 flex-1 text-left text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4 text-zinc-400" />
          <span className="text-xs sm:text-sm">Search</span>
        </button>

        <div className="flex items-center gap-3 shrink-0 text-zinc-400">
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-1 hover:text-[#ff2a85] transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= 2. PRIMARY CATEGORY TABS [Shows] [Movies] [Lists] ================= */}
      <div className="flex items-baseline gap-6 sm:gap-8 mb-4 border-b border-zinc-900 pb-1">
        <button
          type="button"
          onClick={() => {
            setMainCategory('shows');
            setSelectedCustomListId(null);
          }}
          className={`font-serif tracking-tight cursor-pointer transition-colors ${
            mainCategory === 'shows'
              ? 'text-2xl sm:text-3xl font-bold text-white'
              : 'text-2xl sm:text-3xl font-medium text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Shows
        </button>

        <button
          type="button"
          onClick={() => {
            setMainCategory('movies');
            setSelectedCustomListId(null);
          }}
          className={`font-serif tracking-tight cursor-pointer transition-colors ${
            mainCategory === 'movies'
              ? 'text-2xl sm:text-3xl font-bold text-white'
              : 'text-2xl sm:text-3xl font-medium text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Movies
        </button>

        <button
          type="button"
          onClick={() => {
            setMainCategory('lists');
            setSelectedCustomListId(null);
          }}
          className={`font-serif tracking-tight cursor-pointer transition-colors ${
            mainCategory === 'lists'
              ? 'text-2xl sm:text-3xl font-bold text-white'
              : 'text-2xl sm:text-3xl font-medium text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Lists
        </button>
      </div>

      {/* ================= 3. SECONDARY SUB-TABS (When Shows or Movies) ================= */}
      {mainCategory === 'shows' && (
        <div className="flex items-center justify-between gap-4 border-b border-zinc-900 mb-6">
          <div className="flex items-center gap-5 sm:gap-7">
            <button
              type="button"
              onClick={() => setShowsSubTab('my_shows')}
              className={`text-xs sm:text-sm font-medium pb-2.5 transition-colors cursor-pointer ${
                showsSubTab === 'my_shows'
                  ? 'text-white border-b-2 border-[#ff2a85]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              My Shows
            </button>
            <button
              type="button"
              onClick={() => setShowsSubTab('watchlist')}
              className={`text-xs sm:text-sm font-medium pb-2.5 transition-colors cursor-pointer ${
                showsSubTab === 'watchlist'
                  ? 'text-white border-b-2 border-[#ff2a85]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Watchlist
            </button>
            <button
              type="button"
              onClick={() => setShowsSubTab('favorites')}
              className={`text-xs sm:text-sm font-medium pb-2.5 transition-colors cursor-pointer ${
                showsSubTab === 'favorites'
                  ? 'text-white border-b-2 border-[#ff2a85]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Favorites
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSearchFilterOpen((prev) => !prev)}
            className={`p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer mb-1 ${
              searchFilterOpen || searchQuery ? 'text-[#ff2a85]' : ''
            }`}
            title="Search inside this tab"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      )}

      {mainCategory === 'movies' && (
        <div className="flex items-center justify-between gap-4 border-b border-zinc-900 mb-6">
          <div className="flex items-center gap-5 sm:gap-7">
            <button
              type="button"
              onClick={() => setMoviesSubTab('history')}
              className={`text-xs sm:text-sm font-medium pb-2.5 transition-colors cursor-pointer ${
                moviesSubTab === 'history'
                  ? 'text-white border-b-2 border-[#ff2a85]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              History
            </button>
            <button
              type="button"
              onClick={() => setMoviesSubTab('watchlist')}
              className={`text-xs sm:text-sm font-medium pb-2.5 transition-colors cursor-pointer ${
                moviesSubTab === 'watchlist'
                  ? 'text-white border-b-2 border-[#ff2a85]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Watchlist
            </button>
            <button
              type="button"
              onClick={() => setMoviesSubTab('favorites')}
              className={`text-xs sm:text-sm font-medium pb-2.5 transition-colors cursor-pointer ${
                moviesSubTab === 'favorites'
                  ? 'text-white border-b-2 border-[#ff2a85]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Favorites
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSearchFilterOpen((prev) => !prev)}
            className={`p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer mb-1 ${
              searchFilterOpen || searchQuery ? 'text-[#ff2a85]' : ''
            }`}
            title="Search inside this tab"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Optional Search Filter Input Bar */}
      {searchFilterOpen && (
        <div className="flex items-center gap-2 mb-4 p-2 rounded-xl bg-zinc-900 border border-zinc-800">
          <Search className="w-4 h-4 text-zinc-400 shrink-0 ml-1" />
          <input
            type="text"
            placeholder="Type to filter titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* ================= 4. SECTION: RECENTLY ADDED (For Shows>My Shows & Movies>History) ================= */}
      {showRecentlyAddedSection && recentlyAddedCards.length > 0 && !searchQuery && (
        <div className="mb-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            Recently Added
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {recentlyAddedCards.map((item) => {
              const poster = getImageUrl(item.backdropPath || item.posterPath, 'w780') || getImageUrl(item.posterPath, 'w500');
              return (
                <div
                  key={`recent_${item.id}`}
                  onClick={() => handleCardClick(item)}
                  className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-850 cursor-pointer group shadow-md"
                >
                  {poster ? (
                    <img
                      src={poster}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                      <Film className="w-8 h-8" />
                    </div>
                  )}

                  {/* Gradient shadow for text overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* Title overlay in bottom left */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="font-serif text-xs sm:text-sm font-bold text-white leading-tight line-clamp-1 [text-shadow:_0_1px_4px_rgb(0_0_0_/_90%)]">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= 5. MAIN CONTENT SECTIONS ================= */}
      {mainCategory === 'lists' ? (
        /* ================= LISTS VIEW ================= */
        <div>
          {/* Lists Controls Bar */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {/* [(Icon of list with plus)] */}
              <button
                type="button"
                onClick={() => setNewListModalOpen(true)}
                className="flex items-center justify-center p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-[#ff2a85] transition-colors cursor-pointer shrink-0"
                title="Create New List"
              >
                <ListPlus className="w-4 h-4 text-[#ff2a85]" />
              </button>

              {/* [Recently Updated ↑] */}
              <button
                type="button"
                onClick={() => {
                  setTempSortBy(sortBy);
                  setTempSortDirection(sortDirection);
                  setSortModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-white transition-colors cursor-pointer shrink-0"
              >
                <span>{sortLabel}</span>
                <span className="text-[#ff2a85] font-mono text-xs">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              </button>
            </div>

            {/* [(Icon of list views if compact list or grid view)] */}
            <button
              type="button"
              onClick={() => setViewMode((prev) => (prev === 'compact' ? 'grid' : 'compact'))}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
              title={viewMode === 'compact' ? 'Switch to Grid View' : 'Switch to Compact List View'}
            >
              {viewMode === 'compact' ? <LayoutGrid className="w-4 h-4" /> : <Rows className="w-4 h-4" />}
            </button>
          </div>

          {selectedCustomListId && activeCustomList ? (
            /* Selected Custom List Detail */
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a10] border border-zinc-800">
                <div>
                  <button
                    onClick={() => setSelectedCustomListId(null)}
                    className="text-xs text-[#ff2a85] hover:underline mb-1 cursor-pointer font-medium"
                  >
                    ← Back to All Lists
                  </button>
                  <h3 className="font-serif text-lg font-bold text-white">{activeCustomList.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{activeCustomList.description}</p>
                </div>

                <button
                  onClick={() => {
                    deleteCustomList(activeCustomList.id);
                    setSelectedCustomListId(null);
                  }}
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete List</span>
                </button>
              </div>

              {activeCustomListItems.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 text-xs bg-[#0a0a10] rounded-2xl border border-zinc-900 p-8">
                  <ListPlus className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-zinc-300 font-semibold mb-1">List is currently empty</p>
                  <p className="text-zinc-500 max-w-xs mx-auto mb-4">
                    Open any title details and tap "Manage Lists" to add it here.
                  </p>
                  <button
                    onClick={onExplore}
                    className="px-4 py-2 bg-zinc-900 hover:bg-[#ff2a85] text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Discover Titles
                  </button>
                </div>
              ) : viewMode === 'compact' ? (
                /* Compact List View in Selected List */
                <div className="space-y-3">
                  {activeCustomListItems.map((item) => {
                    const poster = getImageUrl(item.posterPath, 'w300');
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className="flex items-center gap-3.5 p-2 rounded-2xl bg-[#0a0a10] border border-zinc-900/80 hover:border-zinc-800 transition-colors cursor-pointer group"
                      >
                        <div className="w-20 sm:w-24 aspect-[2/3] shrink-0 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-850">
                          {poster ? (
                            <img src={poster} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                              <Film className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[#ff2a85] text-xs font-semibold">
                              {item.releaseDate ? item.releaseDate.substring(0, 4) : 'TBA'}
                            </span>
                            <div className="flex items-center gap-1 text-white text-xs font-bold">
                              <Star className="w-3.5 h-3.5 text-[#ff2a85] fill-[#ff2a85]" />
                              <span>{item.voteAverage ? item.voteAverage.toFixed(1) : '—'}</span>
                            </div>
                          </div>

                          <h3 className="font-serif text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#ff2a85] transition-colors">
                            {item.title}
                          </h3>

                          {item.overview && (
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                              {item.overview}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItemInCustomList(activeCustomList.id, item.id);
                          }}
                          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg shrink-0 cursor-pointer"
                          title="Remove from list"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Grid View in Selected List */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {activeCustomListItems.map((item) => {
                    const poster = getImageUrl(item.posterPath, 'w500');
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-850 cursor-pointer group shadow-md"
                      >
                        {poster ? (
                          <img
                            src={poster}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                            <Film className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded text-[11px] font-bold text-white">
                          <Star className="w-3 h-3 text-[#ff2a85] fill-[#ff2a85]" />
                          <span>{item.voteAverage ? item.voteAverage.toFixed(1) : '—'}</span>
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <p className="font-serif text-xs font-bold text-white line-clamp-1 [text-shadow:_0_1px_4px_rgb(0_0_0_/_90%)]">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Custom Lists Overview */
            <div>
              {sortedCustomLists.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 text-xs bg-[#0a0a10] rounded-2xl border border-zinc-900 p-8">
                  <Layers className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-zinc-300 font-semibold mb-1">No custom lists yet</p>
                  <p className="text-zinc-500 max-w-xs mx-auto mb-4">
                    Create custom lists to group movies and TV shows your way.
                  </p>
                  <button
                    onClick={() => setNewListModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white rounded-xl transition-colors cursor-pointer font-semibold shadow-[0_0_15px_rgba(255,42,133,0.4)]"
                  >
                    Create Your First List
                  </button>
                </div>
              ) : viewMode === 'compact' ? (
                /* Compact List View for Lists */
                <div className="space-y-4">
                  {sortedCustomLists.map((list) => {
                    const listItems = library.filter((i) => list.itemIds.includes(i.id));
                    const combinedPosters = [
                      ...listItems.map((i) => i.posterPath),
                      ...(list.items || []).map((i) => i.posterPath),
                      ...Object.values(fetchedMissingItems)
                        .filter((i) => list.itemIds.includes(i.id))
                        .map((i) => i.posterPath),
                    ].filter(Boolean);
                    const previewPosters = Array.from(new Set(combinedPosters)).slice(0, 3);

                    return (
                      <div
                        key={list.id}
                        onClick={() => setSelectedCustomListId(list.id)}
                        className="flex items-center gap-4 p-3 rounded-2xl bg-[#0a0a10] border border-zinc-900/80 hover:border-zinc-800 transition-all cursor-pointer group"
                      >
                        {/* Overlapping Poster Collage */}
                        <div className="relative w-24 h-28 shrink-0 flex items-center justify-center">
                          {previewPosters.length > 0 ? (
                            previewPosters.map((p, idx) => (
                              <img
                                key={idx}
                                src={getImageUrl(p, 'w300')}
                                alt=""
                                className={`absolute w-16 h-24 object-cover rounded-lg border border-zinc-800 shadow-md transition-transform group-hover:scale-105 ${
                                  idx === 0
                                    ? 'z-30 translate-x-3 translate-y-1'
                                    : idx === 1
                                    ? 'z-20 -translate-x-1 -translate-y-1 opacity-90'
                                    : 'z-10 -translate-x-4 -translate-y-2 opacity-70'
                                }`}
                              />
                            ))
                          ) : (
                            <div className="w-16 h-24 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                              <Bookmark className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        {/* List Metadata */}
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-[#ff2a85] text-xs font-semibold mb-1">
                            {list.createdAt ? new Date((list as any).updatedAt || list.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently Updated'}
                          </p>

                          <h3 className="font-serif text-lg font-bold text-white tracking-tight group-hover:text-[#ff2a85] transition-colors truncate">
                            {list.name}
                          </h3>

                          {list.description && (
                            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                              {list.description}
                            </p>
                          )}

                          <p className="text-[11px] text-zinc-500 font-mono mt-1.5">
                            {list.itemIds.length} {list.itemIds.length === 1 ? 'title' : 'titles'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Grid View for Lists */
                <div className="grid grid-cols-2 gap-4">
                  {sortedCustomLists.map((list) => {
                    const listItems = library.filter((i) => list.itemIds.includes(i.id));
                    const poster = listItems[0]?.backdropPath || listItems[0]?.posterPath;
                    return (
                      <div
                        key={list.id}
                        onClick={() => setSelectedCustomListId(list.id)}
                        className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-850 cursor-pointer group shadow-md"
                      >
                        {poster ? (
                          <img
                            src={getImageUrl(poster, 'w500')}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                            <Bookmark className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="font-serif text-sm font-bold text-white line-clamp-1 group-hover:text-[#ff2a85]">
                            {list.name}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-mono">
                            {list.itemIds.length} titles
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ================= SHOWS OR MOVIES CONTENT VIEW ================= */
        <div>
          {/* Section 2: "All (count)" Header */}
          <div className="mb-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              All ({displayItems.length})
            </h2>
          </div>

          {/* Filter Pills Row */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {/* [All] Status Filter Chip */}
              {(showsSubTab === 'my_shows' ||
                showsSubTab === 'favorites' ||
                moviesSubTab === 'history' ||
                moviesSubTab === 'watchlist' ||
                moviesSubTab === 'favorites') && (
                <button
                  type="button"
                  onClick={() => {
                    setTempStatusFilter(statusFilter);
                    setStatusModalOpen(true);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer shrink-0 transition-colors ${
                    statusFilter !== 'all'
                      ? 'bg-[#ff2a85] border-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.35)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  {statusLabel}
                </button>
              )}

              {/* [Recently Added ↓] Sort Chip */}
              <button
                type="button"
                onClick={() => {
                  setTempSortBy(sortBy);
                  setTempSortDirection(sortDirection);
                  setSortModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-white transition-colors cursor-pointer shrink-0"
              >
                <span>{sortLabel}</span>
                <span className="text-[#ff2a85] font-mono text-xs">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              </button>

              {/* [Network] Chip */}
              <button
                type="button"
                onClick={() => {
                  setTempNetwork(selectedNetwork);
                  setNetworkModalOpen(true);
                }}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer shrink-0 transition-colors ${
                  selectedNetwork
                    ? 'bg-[#ff2a85] border-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.35)]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                {selectedNetwork ? selectedNetwork : 'Network'}
              </button>

              {/* [Genre] Chip */}
              <button
                type="button"
                onClick={() => {
                  setTempGenreId(selectedGenreId);
                  setGenreModalOpen(true);
                }}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer shrink-0 transition-colors ${
                  selectedGenreId !== 0
                    ? 'bg-[#ff2a85] border-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.35)]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                {selectedGenreId !== 0
                  ? GENRE_OPTIONS.find((g) => g.id === selectedGenreId)?.name || 'Genres'
                  : 'Genres'}
              </button>

              {/* [Upcoming] Chip (When in Watchlist) */}
              {(showsSubTab === 'watchlist' || moviesSubTab === 'watchlist') && (
                <button
                  type="button"
                  onClick={() =>
                    setUpcomingFilter((prev) =>
                      prev === 'all' ? 'upcoming' : prev === 'upcoming' ? 'released' : 'all'
                    )
                  }
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer shrink-0 transition-colors ${
                    upcomingFilter === 'upcoming' || upcomingFilter === 'released'
                      ? 'border-[#ff2a85] text-[#ff2a85] bg-[#ff2a85]/15 shadow-[0_0_10px_rgba(255,42,133,0.3)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  {upcomingFilter === 'upcoming'
                    ? 'Upcoming'
                    : upcomingFilter === 'released'
                    ? 'Released'
                    : 'Upcoming'}
                </button>
              )}
            </div>

            {/* [(Icon of list views if compact list or grid view)] */}
            <button
              type="button"
              onClick={() => setViewMode((prev) => (prev === 'compact' ? 'grid' : 'compact'))}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
              title={viewMode === 'compact' ? 'Switch to Grid View' : 'Switch to Compact List View'}
            >
              {viewMode === 'compact' ? <LayoutGrid className="w-4 h-4" /> : <Rows className="w-4 h-4" />}
            </button>
          </div>

          {/* Titles Display */}
          {displayItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-[#ff2a85]">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-1.5">No titles found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mb-5 leading-relaxed">
                Try clearing your active filters or explore new titles to add to your collection.
              </p>
              <button
                onClick={onExplore}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.4)] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Discover Titles</span>
              </button>
            </div>
          ) : viewMode === 'compact' ? (
            /* Compact List View */
            <div className="space-y-4">
              {displayItems.map((item) => {
                const poster = getImageUrl(item.posterPath, 'w300');
                const network = getItemNetwork(item);
                const year = item.releaseDate ? item.releaseDate.substring(0, 4) : '';
                const networkOrDateLabel = network
                  ? `${network} (${year || 'TBA'})`
                  : item.releaseDate
                  ? new Date(item.releaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  : 'TBA';

                const ratingScore = item.userRating || (item.voteAverage ? item.voteAverage.toFixed(1) : null);
                const isUpcoming = item.releaseDate && new Date(item.releaseDate).getTime() > Date.now();

                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className="flex items-center gap-3.5 p-2 rounded-2xl bg-[#0a0a10] border border-zinc-900/80 hover:border-zinc-800 transition-colors cursor-pointer group"
                  >
                    {/* Poster on left */}
                    <div className="w-24 sm:w-28 aspect-[2/3] shrink-0 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-850">
                      {poster ? (
                        <img
                          src={poster}
                          alt={item.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                          <Film className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Metadata on right */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[#ff2a85] text-xs font-semibold">
                          {networkOrDateLabel}
                        </span>
                        {ratingScore && (
                          <div className="flex items-center gap-1 text-white text-xs font-bold shrink-0">
                            <Star className="w-3.5 h-3.5 text-[#ff2a85] fill-[#ff2a85]" />
                            <span>{ratingScore}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#ff2a85] transition-colors">
                        {item.title}
                      </h3>

                      {item.overview && (
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                          {item.overview}
                        </p>
                      )}

                      {/* Watched or Scheduled Status Badge */}
                      <div className="flex items-center gap-2 mt-2">
                        {item.status === 'watched' ? (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
                            <Check className="w-3 h-3 text-[#ff2a85] stroke-[3]" />
                            <span>
                              {item.updatedAt
                                ? new Date(item.updatedAt).toLocaleDateString('en-GB', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : 'Watched'}
                            </span>
                          </div>
                        ) : isUpcoming ? (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            <span>
                              {new Date(item.releaseDate).toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {displayItems.map((item) => {
                const poster = getImageUrl(item.posterPath, 'w500');
                const ratingScore = item.userRating || (item.voteAverage ? item.voteAverage.toFixed(1) : null);

                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-850 cursor-pointer group shadow-md"
                  >
                    {poster ? (
                      <img
                        src={poster}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                        <Film className="w-8 h-8" />
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Rating badge */}
                    {ratingScore && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded text-[11px] font-bold text-white">
                        <Star className="w-3 h-3 text-[#ff2a85] fill-[#ff2a85]" />
                        <span>{ratingScore}</span>
                      </div>
                    )}

                    {/* Title in bottom left */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="font-serif text-xs font-bold text-white line-clamp-2 leading-tight [text-shadow:_0_1px_4px_rgb(0_0_0_/_90%)]">
                        {item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================= BOTTOM SHEET 1: SORT BY ================= */}
      {sortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSortModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#0e0e16] border-t border-zinc-800 rounded-t-3xl p-6 z-10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-5">
            <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-5">
              SORT BY:
            </h3>

            <div className="space-y-4 mb-6">
              {[
                { id: 'title', label: 'Title' },
                { id: 'top_rated', label: 'Top Rated' },
                { id: 'most_recent', label: 'Most Recent' },
                { id: 'recently_added', label: 'Recently Added' },
                { id: 'recently_watched', label: 'Recently Watched' },
                { id: 'random', label: 'Random' },
              ].map((opt) => {
                const isSelected = tempSortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setTempSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
                      } else {
                        setTempSortBy(opt.id as SortOption);
                      }
                    }}
                    className="w-full flex items-center justify-between text-left py-1 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {isSelected ? (
                        <div className="w-1 h-5 bg-[#ff2a85] rounded-full shadow-[0_0_10px_rgba(255,42,133,0.8)]" />
                      ) : (
                        <div className="w-1 h-5 bg-transparent" />
                      )}
                      <span
                        className={`text-sm ${
                          isSelected ? 'font-bold text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="text-[#ff2a85] font-mono text-sm">
                        {tempSortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleApplySort}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer active:scale-95"
            >
              APPLY
            </button>
          </div>
        </div>
      )}

      {/* ================= BOTTOM SHEET 2: STATUS / ALL ================= */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setStatusModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#0e0e16] border-t border-zinc-800 rounded-t-3xl p-6 z-10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-5">
            <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-5">
              STATUS:
            </h3>

            <div className="space-y-4 mb-6">
              {[
                { id: 'all', label: 'All' },
                { id: 'watching', label: 'Watching' },
                { id: 'upcoming', label: 'Returning & Upcoming' },
                { id: 'finished', label: 'Finished' },
              ].map((opt) => {
                const isSelected = tempStatusFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTempStatusFilter(opt.id as StatusFilter)}
                    className="w-full flex items-center justify-between text-left py-1 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {isSelected ? (
                        <div className="w-1 h-5 bg-[#ff2a85] rounded-full shadow-[0_0_10px_rgba(255,42,133,0.8)]" />
                      ) : (
                        <div className="w-1 h-5 bg-transparent" />
                      )}
                      <span
                        className={`text-sm ${
                          isSelected ? 'font-bold text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleApplyStatus}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer active:scale-95"
            >
              APPLY
            </button>
          </div>
        </div>
      )}

      {/* ================= BOTTOM SHEET 3: NETWORK ================= */}
      {networkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setNetworkModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#0e0e16] border-t border-zinc-800 rounded-t-3xl p-6 z-10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                NETWORK:
              </h3>
              {tempNetwork && (
                <button
                  type="button"
                  onClick={() => setTempNetwork('')}
                  className="text-xs text-[#ff2a85] hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-2 mb-6">
              <div className="flex flex-wrap gap-2.5">
                {NETWORK_OPTIONS.map((net) => {
                  const isSelected = tempNetwork === net.id;
                  return (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => setTempNetwork(isSelected ? '' : net.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-semibold cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#ff2a85]/20 border-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.4)] scale-105'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${net.bg}`}
                      >
                        {net.badge}
                      </span>
                      <span>{net.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyNetwork}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer active:scale-95"
            >
              APPLY
            </button>
          </div>
        </div>
      )}

      {/* ================= BOTTOM SHEET 4: GENRES ================= */}
      {genreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setGenreModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#0e0e16] border-t border-zinc-800 rounded-t-3xl p-6 z-10 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                GENRES:
              </h3>
              {tempGenreId !== 0 && (
                <button
                  type="button"
                  onClick={() => setTempGenreId(0)}
                  className="text-xs text-[#ff2a85] hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-2 mb-6">
              <div className="flex flex-wrap gap-2.5">
                {GENRE_OPTIONS.map((g) => {
                  const isSelected = tempGenreId === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setTempGenreId(isSelected ? 0 : g.id)}
                      className={`px-4 py-2 rounded-full border text-xs font-semibold cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#ff2a85]/20 border-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.4)] scale-105'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {g.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyGenre}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer active:scale-95"
            >
              APPLY
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE NEW LIST ================= */}
      {newListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0a0a10] border border-zinc-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <h3 className="font-serif text-base font-bold text-white">Create New Custom List</h3>
              <button
                onClick={() => setNewListModalOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateList} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">List Name</label>
                <input
                  type="text"
                  placeholder="e.g. Marvel Universe, Favorite Horror"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#ff2a85]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="A curated collection of my favorite titles..."
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#ff2a85]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewListModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newListName.trim()}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] disabled:opacity-50 text-white text-xs font-semibold cursor-pointer shadow-[0_0_12px_rgba(255,42,133,0.35)]"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
