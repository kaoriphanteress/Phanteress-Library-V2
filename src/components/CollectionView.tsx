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
  Plus,
  ListPlus,
  X,
  ChevronRight
} from 'lucide-react';
import { LibraryItem, MediaType, TMDBItem, CustomList } from '../types/tmdb';
import { useLibrary } from '../context/LibraryContext';
import { getImageUrl, getDetails } from '../services/tmdb';

interface CollectionViewProps {
  onSelect: (item: TMDBItem) => void;
  onExplore: () => void;
}

export type CollectionTab = 'watchlist' | 'watched' | 'favorites' | 'lists';

export const CollectionView: React.FC<CollectionViewProps> = ({ onSelect, onExplore }) => {
  const {
    library,
    customLists,
    createCustomList,
    deleteCustomList,
    toggleItemInCustomList,
    toggleFavorite,
    removeFromLibrary,
  } = useLibrary();

  // Tab state - Watching is strictly removed per instructions
  const [activeTab, setActiveTab] = useState<CollectionTab>('watchlist');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | MediaType>('all');

  // Authentic Showly Sort bottom sheet state
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'added' | 'rating' | 'release' | 'title'>('added');
  const [tempSortBy, setTempSortBy] = useState<'added' | 'rating' | 'release' | 'title'>('added');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [tempSortDirection, setTempSortDirection] = useState<'asc' | 'desc'>('desc');

  const [searchQuery, setSearchQuery] = useState('');

  // Custom List view & creation state
  const [selectedCustomListId, setSelectedCustomListId] = useState<string | null>(null);
  const [newListModalOpen, setNewListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');

  // Available Sort Options
  const sortOptions = [
    { id: 'added', label: 'Recently Added' },
    { id: 'rating', label: 'Highest Rating' },
    { id: 'release', label: 'Release Date' },
    { id: 'title', label: 'Title (A-Z)' },
  ] as const;

  const activeSortLabel = useMemo(() => {
    const match = sortOptions.find((o) => o.id === sortBy);
    return match ? match.label : 'Recently Added';
  }, [sortBy]);

  const handleOpenSortModal = () => {
    setTempSortBy(sortBy);
    setTempSortDirection(sortDirection);
    setSortModalOpen(true);
  };

  const handleApplySort = () => {
    setSortBy(tempSortBy);
    setSortDirection(tempSortDirection);
    setSortModalOpen(false);
  };

  // Filtering standard collection items
  const filteredItems = useMemo(() => {
    return library.filter((item) => {
      // Tab filter
      if (activeTab === 'favorites') {
        if (!item.favorite) return false;
      } else if (activeTab === 'watchlist') {
        if (item.status !== 'watchlist') return false;
      } else if (activeTab === 'watched') {
        if (item.status !== 'watched') return false;
      } else if (activeTab === 'lists') {
        return false;
      }

      // Media type filter
      if (mediaTypeFilter !== 'all' && item.mediaType !== mediaTypeFilter) return false;

      // Search query
      if (searchQuery.trim() && !item.title.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'added') {
        comparison = new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      } else if (sortBy === 'rating') {
        const ratingA = a.userRating || a.voteAverage || 0;
        const ratingB = b.userRating || b.voteAverage || 0;
        comparison = ratingB - ratingA;
      } else if (sortBy === 'release') {
        comparison = (b.releaseDate || '').localeCompare(a.releaseDate || '');
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      return sortDirection === 'asc' ? -comparison : comparison;
    });
  }, [library, activeTab, mediaTypeFilter, sortBy, sortDirection, searchQuery]);

  // Tabs list without 'watching'
  const tabs = [
    { id: 'watchlist', label: 'Watchlist', count: library.filter((i) => i.status === 'watchlist').length },
    { id: 'watched', label: 'Completed', count: library.filter((i) => i.status === 'watched').length },
    { id: 'favorites', label: 'Favorites', count: library.filter((i) => i.favorite).length },
    { id: 'lists', label: 'Lists', count: customLists.length },
  ];

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    createCustomList(newListName.trim(), newListDesc.trim() || 'Curated personal list');
    setNewListName('');
    setNewListDesc('');
    setNewListModalOpen(false);
  };

  const handleDeleteList = (listId: string) => {
    deleteCustomList(listId);
    if (selectedCustomListId === listId) {
      setSelectedCustomListId(null);
    }
  };

  const [fetchedMissingItems, setFetchedMissingItems] = useState<Record<string, {
    id: string;
    tmdbId: number;
    mediaType: MediaType;
    title: string;
    posterPath: string | null;
    backdropPath?: string | null;
    releaseDate?: string;
    voteAverage?: number;
  }>>({});

  const activeCustomList = customLists.find((l) => l.id === selectedCustomListId);

  // Auto-fetch any missing items whose metadata wasn't loaded in library or items
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
      number_of_episodes: item.totalEpisodes,
      number_of_seasons: item.totalSeasons,
    };
    onSelect(tmdbObj);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* Showly Collection Top Category Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-[#0b0b10] border border-zinc-900 rounded-xl overflow-x-auto no-scrollbar mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as CollectionTab);
                setSelectedCustomListId(null);
              }}
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

      {/* ================= SECTION A: CUSTOM LISTS FEATURE ================= */}
      {activeTab === 'lists' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#ff2a85]" />
                <span>Custom Lists</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Organize your movies and shows into themed collections and marathons.
              </p>
            </div>

            <button
              onClick={() => setNewListModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.4)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New List</span>
            </button>
          </div>

          {selectedCustomListId && activeCustomList ? (
            /* Inside a Selected Custom List */
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0e0e16] border border-zinc-800">
                <div>
                  <button
                    onClick={() => setSelectedCustomListId(null)}
                    className="text-xs text-[#ff2a85] hover:underline mb-1 cursor-pointer"
                  >
                    ← Back to All Lists
                  </button>
                  <h3 className="text-lg font-bold text-white">{activeCustomList.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{activeCustomList.description}</p>
                </div>

                <button
                  onClick={() => handleDeleteList(activeCustomList.id)}
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete List</span>
                </button>
              </div>

              {activeCustomListItems.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 text-xs bg-[#0c0c12] rounded-2xl border border-zinc-900 p-8">
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
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {activeCustomListItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item)}
                      className="group relative flex flex-col bg-[#0c0c12] border border-zinc-900 hover:border-[#ff2a85]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-[2/3] w-full bg-zinc-950 overflow-hidden relative">
                        {item.posterPath ? (
                          <img
                            src={getImageUrl(item.posterPath, 'w300')}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                            <Film className="w-6 h-6" />
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItemInCustomList(activeCustomList.id, item.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/75 hover:bg-red-500/80 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title="Remove from list"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                        <p className="text-[11px] text-zinc-500 capitalize">{item.mediaType}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Custom Lists Overview Grid */
            <div>
              {customLists.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 text-xs bg-[#0c0c12] rounded-2xl border border-zinc-900 p-8">
                  <Layers className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-zinc-300 font-semibold mb-1">No custom lists yet</p>
                  <p className="text-zinc-500 max-w-xs mx-auto mb-4">
                    Create custom lists to group movies and TV shows your way.
                  </p>
                  <button
                    onClick={() => setNewListModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white rounded-lg transition-colors cursor-pointer font-semibold"
                  >
                    Create Your First List
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {customLists.map((list) => {
                    const listItems = library.filter((i) => list.itemIds.includes(i.id));
                    const combinedPosters = [
                      ...listItems.map((i) => i.posterPath),
                      ...(list.items || []).map((i) => i.posterPath),
                      ...Object.values(fetchedMissingItems).filter((i) => list.itemIds.includes(i.id)).map((i) => i.posterPath),
                    ].filter(Boolean);
                    const previewPosters = Array.from(new Set(combinedPosters)).slice(0, 3);
                    const count = list.itemIds.length;

                    return (
                      <div
                        key={list.id}
                        onClick={() => setSelectedCustomListId(list.id)}
                        className="p-5 rounded-2xl bg-[#0c0c14] border border-zinc-900 hover:border-[#ff2a85]/50 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-[0_10px_25px_rgba(255,42,133,0.15)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ff2a85] group-hover:scale-110 transition-transform">
                              <Bookmark className="w-5 h-5" />
                            </div>
                            {previewPosters.length > 0 && (
                              <div className="flex -space-x-3 overflow-hidden">
                                {previewPosters.map((p, idx) => (
                                  <img
                                    key={idx}
                                    src={getImageUrl(p, 'w300')}
                                    alt=""
                                    className="w-8 h-12 object-cover rounded border border-zinc-900 shadow-sm"
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-white group-hover:text-[#ff2a85] transition-colors">
                            {list.name}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                            {list.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-900/80 text-xs text-zinc-500">
                          <span className="font-mono text-zinc-400">{count} {count === 1 ? 'title' : 'titles'}</span>
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#ff2a85] transition-colors" />
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
        /* ================= SECTION B: STANDARD SHOWLY COLLECTION ================= */
        <div className="space-y-6">
          {/* Sub-Filters: Media Type & Authentic Showly Sort Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-900">
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-900">
              <button
                onClick={() => setMediaTypeFilter('all')}
                className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  mediaTypeFilter === 'all'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMediaTypeFilter('movie')}
                className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  mediaTypeFilter === 'movie'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-[#ff2a85]" />
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
                <Tv className="w-3.5 h-3.5 text-[#ff2a85]" />
                <span>Shows</span>
              </button>
            </div>

            {/* Authentic Showly Sort Pill Button */}
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
          </div>

          {/* Grid of Titles */}
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-[#ff2a85]">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">No titles in this section</h3>
              <p className="text-xs text-zinc-400 max-w-sm mb-5 leading-relaxed">
                Add titles to your watchlist, complete movies and shows, and build your curated library.
              </p>
              <button
                onClick={onExplore}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.4)] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Discover Titles</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredItems.map((item) => {
                const year = item.releaseDate ? item.releaseDate.substring(0, 4) : '';
                const poster = getImageUrl(item.posterPath, 'w500');

                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className="group relative flex flex-col bg-[#0c0c12] border border-zinc-900 hover:border-[#ff2a85]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,42,133,0.2)]"
                  >
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
                          <span className="text-xs text-center text-zinc-400">{item.title}</span>
                        </div>
                      )}

                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded backdrop-blur-md bg-black/75 text-zinc-300 border border-zinc-800">
                          {item.status}
                        </span>
                        {item.favorite && (
                          <div className="p-1 rounded-full bg-rose-600 text-white">
                            <Heart className="w-3 h-3 fill-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-2.5 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#ff2a85] transition-colors truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                          <span>{year || 'TBA'}</span>
                          <span aria-hidden="true">·</span>
                          <span className="uppercase text-[10px] text-zinc-500 font-mono">
                            {item.mediaType}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-zinc-900">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          className={`p-1 rounded cursor-pointer ${
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
                          className="p-1 rounded text-zinc-600 hover:text-red-400 cursor-pointer"
                          title="Remove from collection"
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
      )}

      {/* Create New List Modal */}
      {newListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0f0f18] border border-zinc-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <h3 className="text-base font-bold text-white">Create New Custom List</h3>
              <button
                onClick={() => setNewListModalOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateList} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  List Name
                </label>
                <input
                  type="text"
                  required
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="e.g. Marvel Cinematic Universe, 90s Thrillers"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2a85]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  placeholder="Brief description of this collection..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2a85]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Create List
                </button>
                <button
                  type="button"
                  onClick={() => setNewListModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AUTHENTIC SHOWLY "SORT BY:" BOTTOM SHEET MODAL                             */}
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
                const isSelected = tempSortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (isSelected) {
                        setTempSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
                      } else {
                        setTempSortBy(opt.id);
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
                      {isSelected ? (
                        <div className="w-1 h-5 rounded-full bg-[#ff2a85] shadow-[0_0_8px_rgba(255,42,133,0.8)]" />
                      ) : (
                        <div className="w-1 h-5" />
                      )}
                      <span className="text-sm">{opt.label}</span>
                    </div>

                    {isSelected && (
                      <span className="text-[#ff2a85] font-mono text-base font-bold">
                        {tempSortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Full-Width Hot Pink APPLY Button */}
            <div className="pt-4 border-t border-zinc-850">
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
