import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { useAuth } from './AuthContext';
import { EpisodeProgress, LibraryItem, MediaType, TMDBItem, WatchStatus, CustomList, CustomListItem } from '../types/tmdb';
import { TMDB_GENRES } from '../services/tmdb';

interface LibraryContextType {
  library: LibraryItem[];
  episodes: EpisodeProgress[];
  customLists: CustomList[];
  loading: boolean;
  addToLibrary: (item: TMDBItem, status?: WatchStatus) => Promise<void>;
  updateStatus: (id: string, status: WatchStatus) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  toggleFavoriteItem: (item: TMDBItem) => Promise<void>;
  toggleWatchlist: (item: TMDBItem) => Promise<void>;
  toggleWatched: (item: TMDBItem) => Promise<void>;
  toggleAddToShows: (item: TMDBItem) => Promise<void>;
  createCustomList: (name: string, description?: string) => string;
  deleteCustomList: (id: string) => void;
  toggleItemInCustomList: (listId: string, item: TMDBItem | string, mediaType?: MediaType) => void;
  isItemInCustomList: (listId: string, itemId: string) => boolean;
  getListsForItem: (itemId: string) => string[];
  setUserRating: (id: string, rating: number) => Promise<void>;
  setUserReview: (id: string, review: string) => Promise<void>;
  removeFromLibrary: (id: string) => Promise<void>;
  getLibraryItem: (tmdbId: number, mediaType?: MediaType) => LibraryItem | undefined;
  toggleEpisodeWatched: (showId: number, seasonNumber: number, episodeNumber: number, episodeTitle?: string) => Promise<void>;
  isEpisodeWatched: (showId: number, seasonNumber: number, episodeNumber: number) => boolean;
  getShowWatchedCount: (showId: number) => number;
  clearAllData: () => Promise<void>;
  stats: {
    totalMovies: number;
    totalShows: number;
    totalEpisodesWatched: number;
    watchTimeHours: number;
    watchTimeDays: number;
    avgRating: number;
    topGenres: { name: string; count: number }[];
  };
}

const LOCAL_STORAGE_KEY_LIBRARY = 'phanteress_library_v2';
const LOCAL_STORAGE_KEY_EPISODES = 'phanteress_episodes_v2';
const LOCAL_STORAGE_KEY_CUSTOM_LISTS = 'phanteress_custom_lists_v2';

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [library, setLibrary] = useState<LibraryItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_LIBRARY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [episodes, setEpisodes] = useState<EpisodeProgress[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_EPISODES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [customLists, setCustomLists] = useState<CustomList[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_LISTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync to local storage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LIBRARY, JSON.stringify(library));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [library]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_EPISODES, JSON.stringify(episodes));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [episodes]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CUSTOM_LISTS, JSON.stringify(customLists));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [customLists]);

  // Firestore Real-time Sync when logged in
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const watchlistColPath = `users/${user.uid}/watchlist`;
    const watchlistCol = collection(db, watchlistColPath);

    // Initial sync of existing local items into Firestore if any
    const syncLocalToFirestore = async () => {
      const currentLocalLib = [...library];
      for (const item of currentLocalLib) {
        try {
          await setDoc(doc(db, watchlistColPath, item.id), {
            ...item,
            userId: user.uid,
          }, { merge: true });
        } catch (err) {
          console.warn('Item sync to cloud error:', err);
        }
      }
    };
    syncLocalToFirestore();

    const unsubWatchlist = onSnapshot(
      watchlistCol,
      (snapshot) => {
        const items: LibraryItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as LibraryItem);
        });
        setLibrary(items);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, watchlistColPath);
      }
    );

    const episodesColPath = `users/${user.uid}/episodes`;
    const episodesCol = collection(db, episodesColPath);

    const unsubEpisodes = onSnapshot(
      episodesCol,
      (snapshot) => {
        const eps: EpisodeProgress[] = [];
        snapshot.forEach((docSnap) => {
          eps.push(docSnap.data() as EpisodeProgress);
        });
        setEpisodes(eps);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, episodesColPath);
      }
    );

    return () => {
      unsubWatchlist();
      unsubEpisodes();
    };
  }, [user]);

  const addToLibrary = async (item: TMDBItem, status: WatchStatus = 'watchlist') => {
    const mediaType: MediaType = item.media_type || (item.title ? 'movie' : 'tv');
    const id = `${mediaType}_${item.id}`;
    const title = item.title || item.name || 'Untitled';
    const releaseDate = item.release_date || item.first_air_date || '';

    const genreIds = item.genre_ids || (item.genres ? item.genres.map((g) => g.id) : []);
    const newItem: LibraryItem = {
      id,
      userId: user?.uid,
      tmdbId: item.id,
      mediaType,
      title,
      overview: item.overview || '',
      genreIds,
      posterPath: item.poster_path,
      backdropPath: item.backdrop_path,
      releaseDate,
      voteAverage: item.vote_average || 0,
      status,
      favorite: false,
      totalSeasons: item.number_of_seasons || 1,
      totalEpisodes: item.number_of_episodes || 10,
      watchedEpisodesCount: 0,
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setLibrary((prev) => {
      const exists = prev.some((i) => i.id === id);
      if (exists) {
        return prev.map((i) => (i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i));
      }
      return [newItem, ...prev];
    });

    if (user) {
      const path = `users/${user.uid}/watchlist/${id}`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', id), newItem, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    }
  };

  const updateStatus = async (id: string, status: WatchStatus) => {
    const updatedAt = new Date().toISOString();
    setLibrary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, updatedAt } : item))
    );

    if (user) {
      const path = `users/${user.uid}/watchlist/${id}`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', id), { status, updatedAt }, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  };

  const toggleFavorite = async (id: string) => {
    let newFavState = false;
    setLibrary((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          newFavState = !item.favorite;
          return { ...item, favorite: newFavState, updatedAt: new Date().toISOString() };
        }
        return item;
      })
    );

    if (user) {
      const path = `users/${user.uid}/watchlist/${id}`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', id), {
          favorite: newFavState,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  };

  const toggleFavoriteItem = async (item: TMDBItem) => {
    const mediaType: MediaType = item.media_type || (item.title ? 'movie' : 'tv');
    const id = `${mediaType}_${item.id}`;
    const existing = library.find((i) => i.id === id);

    if (existing) {
      const newFavState = !existing.favorite;
      setLibrary((prev) =>
        prev.map((i) => (i.id === id ? { ...i, favorite: newFavState, updatedAt: new Date().toISOString() } : i))
      );
      if (user) {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', id), {
          favorite: newFavState,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    } else {
      const genreIds = item.genre_ids || (item.genres ? item.genres.map((g) => g.id) : []);
      const newItem: LibraryItem = {
        id,
        userId: user?.uid,
        tmdbId: item.id,
        mediaType,
        title: item.title || item.name || 'Untitled',
        overview: item.overview || '',
        genreIds,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        releaseDate: item.release_date || item.first_air_date || '',
        voteAverage: item.vote_average || 0,
        status: 'dropped',
        favorite: true,
        totalSeasons: item.number_of_seasons || 1,
        totalEpisodes: item.number_of_episodes || 10,
        watchedEpisodesCount: 0,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLibrary((prev) => [newItem, ...prev]);
      if (user) {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', id), newItem, { merge: true });
      }
    }
  };

  const toggleWatchlist = async (item: TMDBItem) => {
    const mediaType: MediaType = item.media_type || (item.title ? 'movie' : 'tv');
    const id = `${mediaType}_${item.id}`;
    const existing = library.find((i) => i.id === id);

    if (existing && existing.status === 'watchlist') {
      if (existing.favorite) {
        await updateStatus(id, 'dropped');
      } else {
        await removeFromLibrary(id);
      }
    } else {
      await addToLibrary(item, 'watchlist');
    }
  };

  const toggleWatched = async (item: TMDBItem) => {
    const mediaType: MediaType = item.media_type || (item.title ? 'movie' : 'tv');
    const id = `${mediaType}_${item.id}`;
    const existing = library.find((i) => i.id === id);

    if (existing && existing.status === 'watched') {
      if (existing.favorite) {
        await updateStatus(id, 'dropped');
      } else {
        await removeFromLibrary(id);
      }
    } else {
      await addToLibrary(item, 'watched');
    }
  };

  const toggleAddToShows = async (item: TMDBItem) => {
    const id = `tv_${item.id}`;
    const existing = library.find((i) => i.id === id);

    if (existing && existing.status === 'watching') {
      if (existing.favorite) {
        await updateStatus(id, 'dropped');
      } else {
        await removeFromLibrary(id);
      }
    } else {
      await addToLibrary(item, 'watching');
    }
  };

  const createCustomList = (name: string, description?: string): string => {
    const newListId = `list_${Date.now()}`;
    const newList: CustomList = {
      id: newListId,
      name: name.trim(),
      description: (description || '').trim(),
      itemIds: [],
      createdAt: new Date().toISOString(),
    };
    setCustomLists((prev) => [newList, ...prev]);
    return newListId;
  };

  const deleteCustomList = (listId: string) => {
    setCustomLists((prev) => prev.filter((l) => l.id !== listId));
  };

  const toggleItemInCustomList = (
    listId: string,
    itemOrId: TMDBItem | string,
    explicitMediaType?: MediaType
  ) => {
    let itemId = '';
    let customItemSnapshot: CustomListItem | null = null;

    if (typeof itemOrId === 'string') {
      itemId = itemOrId;
      const libItem = library.find((i) => i.id === itemId);
      if (libItem) {
        customItemSnapshot = {
          id: libItem.id,
          tmdbId: libItem.tmdbId,
          mediaType: libItem.mediaType,
          title: libItem.title,
          posterPath: libItem.posterPath,
          backdropPath: libItem.backdropPath,
          releaseDate: libItem.releaseDate,
          voteAverage: libItem.voteAverage,
        };
      }
    } else {
      const type: MediaType =
        explicitMediaType ||
        itemOrId.media_type ||
        (itemOrId.title ? 'movie' : 'tv');
      itemId = `${type}_${itemOrId.id}`;
      customItemSnapshot = {
        id: itemId,
        tmdbId: itemOrId.id,
        mediaType: type,
        title: itemOrId.title || itemOrId.name || 'Untitled',
        posterPath: itemOrId.poster_path,
        backdropPath: itemOrId.backdrop_path,
        releaseDate: itemOrId.release_date || itemOrId.first_air_date || '',
        voteAverage: itemOrId.vote_average || 0,
      };
    }

    setCustomLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        const exists = l.itemIds.includes(itemId);
        const nextIds = exists
          ? l.itemIds.filter((id) => id !== itemId)
          : [...l.itemIds, itemId];

        let nextItems = l.items ? [...l.items] : [];
        if (exists) {
          nextItems = nextItems.filter((i) => i.id !== itemId);
        } else if (customItemSnapshot) {
          nextItems = [
            ...nextItems.filter((i) => i.id !== itemId),
            customItemSnapshot,
          ];
        }

        return {
          ...l,
          itemIds: nextIds,
          items: nextItems,
        };
      })
    );
  };

  const isItemInCustomList = (listId: string, itemId: string): boolean => {
    const list = customLists.find((l) => l.id === listId);
    return list ? list.itemIds.includes(itemId) : false;
  };

  const getListsForItem = (itemId: string): string[] => {
    return customLists.filter((l) => l.itemIds.includes(itemId)).map((l) => l.id);
  };

  const setUserRating = async (id: string, userRating: number) => {
    const updatedAt = new Date().toISOString();
    setLibrary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, userRating, updatedAt } : item))
    );

    if (user) {
      const path = `users/${user.uid}/watchlist/${id}`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', id), { userRating, updatedAt }, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  };

  const setUserReview = async (id: string, review: string) => {
    const updatedAt = new Date().toISOString();
    setLibrary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, review, updatedAt } : item))
    );

    if (user) {
      const path = `users/${user.uid}/watchlist/${id}`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', id), { review, updatedAt }, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  };

  const removeFromLibrary = async (id: string) => {
    setLibrary((prev) => prev.filter((item) => item.id !== id));

    if (user) {
      const path = `users/${user.uid}/watchlist/${id}`;
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'watchlist', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, path);
      }
    }
  };

  const getLibraryItem = (tmdbId: number, mediaType?: MediaType): LibraryItem | undefined => {
    if (mediaType) {
      return library.find((i) => i.tmdbId === tmdbId && i.mediaType === mediaType);
    }
    return library.find((i) => i.tmdbId === tmdbId);
  };

  const toggleEpisodeWatched = async (
    showId: number,
    seasonNumber: number,
    episodeNumber: number,
    episodeTitle?: string
  ) => {
    const episodeDocId = `show_${showId}_s${seasonNumber}_e${episodeNumber}`;
    const existing = episodes.find((e) => e.id === episodeDocId);
    const newWatched = existing ? !existing.watched : true;

    const progressItem: EpisodeProgress = {
      id: episodeDocId,
      userId: user?.uid,
      showId,
      seasonNumber,
      episodeNumber,
      episodeTitle: episodeTitle || `S${seasonNumber}E${episodeNumber}`,
      watched: newWatched,
      watchedAt: new Date().toISOString(),
    };

    setEpisodes((prev) => {
      const exists = prev.some((e) => e.id === episodeDocId);
      if (exists) {
        return prev.map((e) => (e.id === episodeDocId ? progressItem : e));
      }
      return [progressItem, ...prev];
    });

    // Also update watched episode count on the library item
    const showLibItem = library.find((i) => i.tmdbId === showId && i.mediaType === 'tv');
    if (showLibItem) {
      const updatedCount = Math.max(0, (showLibItem.watchedEpisodesCount || 0) + (newWatched ? 1 : -1));
      const autoStatus: WatchStatus = updatedCount > 0 ? (showLibItem.totalEpisodes && updatedCount >= showLibItem.totalEpisodes ? 'watched' : 'watching') : showLibItem.status;
      setLibrary((prev) =>
        prev.map((item) =>
          item.id === showLibItem.id
            ? { ...item, watchedEpisodesCount: updatedCount, status: autoStatus }
            : item
        )
      );
    }

    if (user) {
      const path = `users/${user.uid}/episodes/${episodeDocId}`;
      try {
        await setDoc(doc(db, 'users', user.uid, 'episodes', episodeDocId), progressItem, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    }
  };

  const isEpisodeWatched = (showId: number, seasonNumber: number, episodeNumber: number): boolean => {
    const id = `show_${showId}_s${seasonNumber}_e${episodeNumber}`;
    const ep = episodes.find((e) => e.id === id);
    return ep ? ep.watched : false;
  };

  const getShowWatchedCount = (showId: number): number => {
    return episodes.filter((e) => e.showId === showId && e.watched).length;
  };

  // Compute Showly statistics
  const stats = useMemo(() => {
    const watchedMovies = library.filter((i) => i.mediaType === 'movie' && i.status === 'watched');
    const trackedShows = library.filter((i) => i.mediaType === 'tv');
    const watchedEps = episodes.filter((e) => e.watched);

    // Approximate watch time: 2 hours per watched movie + 45 mins per watched episode
    const movieHours = watchedMovies.length * 2.0;
    const epHours = watchedEps.length * 0.75;
    const totalHours = Math.round(movieHours + epHours);
    const totalDays = Number((totalHours / 24).toFixed(1));

    const ratedItems = library.filter((i) => typeof i.userRating === 'number' && i.userRating > 0);
    const avgRating = ratedItems.length > 0
      ? Number((ratedItems.reduce((acc, curr) => acc + (curr.userRating || 0), 0) / ratedItems.length).toFixed(1))
      : 0;

    // Real genre breakdown from user's tracked library
    const genreCountMap: Record<string, number> = {};
    library.forEach((item) => {
      if (item.genreIds && item.genreIds.length > 0) {
        item.genreIds.forEach((gid) => {
          const match = TMDB_GENRES.find((g) => g.id === gid && g.id !== 0);
          if (match) {
            genreCountMap[match.name] = (genreCountMap[match.name] || 0) + 1;
          }
        });
      }
    });

    const topGenres = Object.entries(genreCountMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalMovies: watchedMovies.length,
      totalShows: trackedShows.length,
      totalEpisodesWatched: watchedEps.length,
      watchTimeHours: totalHours,
      watchTimeDays: totalDays,
      avgRating,
      topGenres,
    };
  }, [library, episodes]);

  const clearAllData = async () => {
    setLibrary([]);
    setEpisodes([]);
    setCustomLists([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_LIBRARY);
      localStorage.removeItem(LOCAL_STORAGE_KEY_EPISODES);
      localStorage.removeItem(LOCAL_STORAGE_KEY_CUSTOM_LISTS);
      localStorage.removeItem('phanteress_library_v2');
      localStorage.removeItem('phanteress_episodes_v2');
      localStorage.removeItem('phanteress_custom_lists_v2');
      localStorage.removeItem('showty_library_v1');
      localStorage.removeItem('showty_episodes_v1');
      localStorage.removeItem('showty_custom_lists_v1');
    } catch (e) {
      console.warn('Clear local storage error:', e);
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        library,
        episodes,
        customLists,
        loading,
        addToLibrary,
        updateStatus,
        toggleFavorite,
        toggleFavoriteItem,
        toggleWatchlist,
        toggleWatched,
        toggleAddToShows,
        createCustomList,
        deleteCustomList,
        toggleItemInCustomList,
        isItemInCustomList,
        getListsForItem,
        setUserRating,
        setUserReview,
        removeFromLibrary,
        getLibraryItem,
        toggleEpisodeWatched,
        isEpisodeWatched,
        getShowWatchedCount,
        clearAllData,
        stats,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
