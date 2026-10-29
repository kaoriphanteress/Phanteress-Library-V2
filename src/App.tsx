import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';
import { Navbar, NavTab } from './components/Navbar';
import { DiscoverSearchBar } from './components/DiscoverSearchBar';
import { SettingsModal } from './components/SettingsModal';
import { HeroBanner } from './components/HeroBanner';
import { MediaCard } from './components/MediaCard';
import { MediaModal } from './components/MediaModal';
import { SearchModal } from './components/SearchModal';
import { ProgressView } from './components/ProgressView';
import { OrderView } from './components/OrderView';
import { CollectionView } from './components/CollectionView';
import { StatsView } from './components/StatsView';
import { PWALandingPage } from './components/PWALandingPage';
import { usePWAInstall } from './hooks/usePWAInstall';
import { TMDBItem } from './types/tmdb';
import {
  getTrendingAll,
  getTrendingMovies,
  getTrendingTV,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  discoverByGenre,
  TMDB_GENRES
} from './services/tmdb';
import { Sparkles, Film, Tv, Flame, Star } from 'lucide-react';

function ShowtyDashboard() {
  // Showly default launch tab is Progress
  const [activeTab, setActiveTab] = useState<NavTab>('progress');
  const [selectedItem, setSelectedItem] = useState<TMDBItem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Content Data States for Discover tab
  const [trending, setTrending] = useState<TMDBItem[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<TMDBItem[]>([]);
  const [trendingTV, setTrendingTV] = useState<TMDBItem[]>([]);
  const [popularMovies, setPopularMovies] = useState<TMDBItem[]>([]);
  const [popularTV, setPopularTV] = useState<TMDBItem[]>([]);
  const [topRated, setTopRated] = useState<TMDBItem[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<TMDBItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Genre filtering on Discover
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
  const [genreResults, setGenreResults] = useState<TMDBItem[]>([]);
  const [genreLoading, setGenreLoading] = useState(false);

  // Discover sub-filter: all / movies / tv
  const [discoverSection, setDiscoverSection] = useState<'all' | 'movies' | 'tv'>('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.allSettled([
      getTrendingAll('day'),
      getTrendingMovies('day'),
      getTrendingTV('day'),
      getPopularMovies(1),
      getPopularTV(1),
      getTopRatedMovies(),
      getTopRatedTV(),
    ]).then(([resTrending, resTrMovies, resTrTV, resPopMovies, resPopTV, resTopRated, resTopTV]) => {
      if (!isMounted) return;

      if (resTrending.status === 'fulfilled') setTrending(resTrending.value);
      if (resTrMovies.status === 'fulfilled') setTrendingMovies(resTrMovies.value);
      if (resTrTV.status === 'fulfilled') setTrendingTV(resTrTV.value);
      if (resPopMovies.status === 'fulfilled') setPopularMovies(resPopMovies.value);
      if (resPopTV.status === 'fulfilled') setPopularTV(resPopTV.value);
      if (resTopRated.status === 'fulfilled') setTopRated(resTopRated.value);
      if (resTopTV.status === 'fulfilled') setTopRatedTV(resTopTV.value);

      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedGenreId === 0) {
      setGenreResults([]);
      return;
    }

    let isMounted = true;
    setGenreLoading(true);

    if (discoverSection === 'movies') {
      discoverByGenre('movie', selectedGenreId)
        .then((res) => {
          if (isMounted) {
            setGenreResults(res);
            setGenreLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setGenreLoading(false);
        });
    } else if (discoverSection === 'tv') {
      discoverByGenre('tv', selectedGenreId)
        .then((res) => {
          if (isMounted) {
            setGenreResults(res);
            setGenreLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setGenreLoading(false);
        });
    } else {
      // Both movies and tv
      Promise.allSettled([
        discoverByGenre('movie', selectedGenreId),
        discoverByGenre('tv', selectedGenreId),
      ]).then(([resMovies, resTV]) => {
        if (!isMounted) return;
        const movies = resMovies.status === 'fulfilled' ? resMovies.value : [];
        const tv = resTV.status === 'fulfilled' ? resTV.value : [];
        // Interleave movies and TV
        const combined: TMDBItem[] = [];
        const maxLen = Math.max(movies.length, tv.length);
        for (let i = 0; i < maxLen; i++) {
          if (movies[i]) combined.push(movies[i]);
          if (tv[i]) combined.push(tv[i]);
        }
        const seen = new Set<string>();
        const unique = combined.filter((item) => {
          const k = `${item.media_type || (item.title ? "movie" : "tv")}_${item.id}`;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });
        setGenreResults(unique);
        setGenreLoading(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [selectedGenreId, discoverSection]);

  const handlePlayTrailer = (item: TMDBItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-[#060609] text-zinc-100 flex flex-col font-sans selection:bg-[#ff2a85] selection:text-white pb-24">
      {/* 
        Showly Rule: Top search capsule ONLY shows on Discover tab!
        No top bar on Progress, Order, Collection, or Stats!
      */}
      {/* Discover floating search bar over hero backdrop */}
      {activeTab === 'discover' && (
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-auto pt-3 pb-6 bg-gradient-to-b from-[#060609]/95 via-[#060609]/50 to-transparent">
          <DiscoverSearchBar
            onOpenSearch={() => setSearchOpen(true)}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ================= 1. PROGRESS TAB (Default Showly Home) ================= */}
        {activeTab === 'progress' && (
          <ProgressView
            onSelect={(item) => setSelectedItem(item)}
            onExplore={() => setActiveTab('discover')}
            onOpenSearch={() => setSearchOpen(true)}
            onNavigateToOrder={() => setActiveTab('order')}
          />
        )}

        {/* ================= 2. ORDER TAB ================= */}
        {activeTab === 'order' && (
          <OrderView
            onSelectTMDBItem={(item) => setSelectedItem(item)}
            onNavigateToProgress={() => setActiveTab('progress')}
          />
        )}

        {/* ================= 3. DISCOVER TAB ================= */}
        {activeTab === 'discover' && (
          <div>
            {/* Hero Billboard Banner */}
            <HeroBanner
              items={
                discoverSection === 'movies'
                  ? (trendingMovies.length > 0 ? trendingMovies : popularMovies)
                  : discoverSection === 'tv'
                  ? (trendingTV.length > 0 ? trendingTV : popularTV)
                  : (trending.length > 0 ? trending : popularMovies)
              }
              onSelect={(item) => setSelectedItem(item)}
              onPlayTrailer={handlePlayTrailer}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-9">
              {/* Discover Sub-Sections & Genre Filter Chips */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 bg-[#0b0b10] border border-zinc-900 rounded-xl">
                  <button
                    onClick={() => setDiscoverSection('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      discoverSection === 'all'
                        ? 'bg-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDiscoverSection('movies')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      discoverSection === 'movies'
                        ? 'bg-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Movies</span>
                  </button>
                  <button
                    onClick={() => setDiscoverSection('tv')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      discoverSection === 'tv'
                        ? 'bg-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>Shows</span>
                  </button>
                </div>

                {/* Genre Carousel */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {TMDB_GENRES.map((genre) => {
                    const isSelected = selectedGenreId === genre.id;
                    return (
                      <button
                        key={genre.id}
                        onClick={() => setSelectedGenreId(genre.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.4)]'
                            : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800/80'
                        }`}
                      >
                        {genre.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filtered Genre Results */}
              {selectedGenreId !== 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#ff2a85]" />
                      <span>
                        {TMDB_GENRES.find((g) => g.id === selectedGenreId)?.name} Selections
                      </span>
                    </h2>
                    <button
                      onClick={() => setSelectedGenreId(0)}
                      className="text-xs text-[#ff2a85] hover:underline cursor-pointer"
                    >
                      Clear Genre Filter
                    </button>
                  </div>

                  {genreLoading ? (
                    <div className="py-12 text-center text-xs text-zinc-500">
                      <div className="w-6 h-6 border-2 border-[#ff2a85] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Loading genre selections...
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {genreResults.map((item, idx) => (
                        <MediaCard
                          key={`genre_${item.media_type || 'm'}_${item.id}_${idx}`}
                          item={item}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: MOVIES ONLY VIEW */}
              {discoverSection === 'movies' && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Trending Movies
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {trendingMovies.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`mov_tr_${item.id}`}
                          item={{ ...item, media_type: 'movie' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Film className="w-5 h-5 text-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Popular Movies
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {popularMovies.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`mov_pop_${item.id}`}
                          item={{ ...item, media_type: 'movie' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#ff2a85] fill-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Top Rated Movies
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {topRated.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`mov_top_${item.id}`}
                          item={{ ...item, media_type: 'movie' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* SECTION: TV SHOWS ONLY VIEW */}
              {discoverSection === 'tv' && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Trending TV Series
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {trendingTV.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`tv_tr_${item.id}`}
                          item={{ ...item, media_type: 'tv' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Tv className="w-5 h-5 text-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Popular TV Series
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {popularTV.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`tv_pop_${item.id}`}
                          item={{ ...item, media_type: 'tv' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#ff2a85] fill-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Top Rated TV Series
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {(topRatedTV.length > 0 ? topRatedTV : popularTV).slice(0, 12).map((item) => (
                        <MediaCard
                          key={`tv_top_${item.id}`}
                          item={{ ...item, media_type: 'tv' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* SECTION: ALL DISCOVERIES */}
              {discoverSection === 'all' && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Trending Today
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {trending.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`all_tr_${item.id}`}
                          item={item}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Film className="w-5 h-5 text-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Popular Movies
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {popularMovies.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`all_mov_${item.id}`}
                          item={{ ...item, media_type: 'movie' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Tv className="w-5 h-5 text-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Popular TV Series
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {popularTV.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`all_tv_${item.id}`}
                          item={{ ...item, media_type: 'tv' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#ff2a85] fill-[#ff2a85]" />
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Top Rated Classics
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {topRated.slice(0, 12).map((item) => (
                        <MediaCard
                          key={`all_top_${item.id}`}
                          item={{ ...item, media_type: 'movie' }}
                          onSelect={(i) => setSelectedItem(i)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= 4. COLLECTION TAB ================= */}
        {activeTab === 'collection' && (
          <CollectionView
            onSelect={(item) => setSelectedItem(item)}
            onExplore={() => setActiveTab('discover')}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}

        {/* ================= 5. STATS TAB ================= */}
        {activeTab === 'stats' && <StatsView />}
      </main>

      {/* Showly Floating Pill Bottom Dock */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Media Detail Modal */}
      <MediaModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelectRelated={(item) => setSelectedItem(item)}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(item) => setSelectedItem(item)}
      />

      {/* Showly-Style Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  const { isStandalone } = usePWAInstall();
  const [bypassLanding, setBypassLanding] = useState(false);

  // If opened as installed PWA (display-mode: standalone), show tracker directly!
  // If visited normally in browser, show attractive PWA installation landing page!
  const showDashboard = isStandalone || bypassLanding;

  return (
    <AuthProvider>
      <LibraryProvider>
        {showDashboard ? (
          <ShowtyDashboard />
        ) : (
          <PWALandingPage onEnterStandalone={() => setBypassLanding(true)} />
        )}
      </LibraryProvider>
    </AuthProvider>
  );
}
