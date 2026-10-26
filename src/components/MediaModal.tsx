import React, { useEffect, useState } from 'react';
import {
  X,
  Star,
  Bookmark,
  Check,
  Heart,
  Play,
  Calendar,
  Clock,
  Tv,
  Film,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Circle,
  Layers,
  Lock,
  Plus
} from 'lucide-react';
import { TMDBItem, TMDBSeasonDetail, WatchStatus } from '../types/tmdb';
import { getDetails, getImageUrl, getTVSeasonDetails } from '../services/tmdb';
import { useLibrary } from '../context/LibraryContext';

interface MediaModalProps {
  item: TMDBItem | null;
  onClose: () => void;
  onSelectRelated: (item: TMDBItem) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose, onSelectRelated }) => {
  const {
    library,
    customLists,
    createCustomList,
    toggleItemInCustomList,
    isItemInCustomList,
    toggleWatchlist,
    toggleWatched,
    toggleAddToShows,
    toggleFavoriteItem,
    addToLibrary,
    updateStatus,
    setUserRating,
    setUserReview,
    isEpisodeWatched,
    toggleEpisodeWatched,
    getShowWatchedCount
  } = useLibrary();

  const [details, setDetails] = useState<TMDBItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState(1);
  const [seasonDetail, setSeasonDetail] = useState<TMDBSeasonDetail | null>(null);
  const [seasonLoading, setSeasonLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [manageListOpen, setManageListOpen] = useState(false);
  const [newListNameInModal, setNewListNameInModal] = useState('');

  // Fetch full details whenever item changes
  useEffect(() => {
    if (!item) {
      setDetails(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setShowTrailer(false);

    const type = item.media_type || (item.title ? 'movie' : 'tv');

    getDetails(item.id, type)
      .then((data) => {
        if (!isMounted) return;
        setDetails(data);
        setLoading(false);
        if (type === 'tv') {
          setActiveSeason(1);
        }
      })
      .catch((err) => {
        console.warn('Failed to load item details:', err);
        if (isMounted) {
          setDetails(item);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [item]);

  // Fetch TV season episodes
  useEffect(() => {
    if (!details || (details.media_type !== 'tv' && !details.name)) return;

    let isMounted = true;
    setSeasonLoading(true);

    getTVSeasonDetails(details.id, activeSeason)
      .then((data) => {
        if (isMounted) {
          setSeasonDetail(data);
          setSeasonLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setSeasonLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [details, activeSeason]);

  // Sync existing review
  useEffect(() => {
    if (!item) return;
    const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
    const libItem = library.find(
      (l) => l.tmdbId === item.id && (l.mediaType === mediaType || !l.mediaType)
    );
    setReviewText(libItem?.review || '');
  }, [item, library]);

  if (!item) return null;

  const currentData = details || item;
  const title = currentData.title || currentData.name || 'Untitled';
  const mediaType = currentData.media_type || (currentData.title ? 'movie' : 'tv');
  const releaseDate = currentData.release_date || currentData.first_air_date || '';
  const year = releaseDate ? releaseDate.substring(0, 4) : '';
  const rating = currentData.vote_average ? currentData.vote_average.toFixed(1) : '—';
  const backdropUrl = getImageUrl(currentData.backdrop_path, 'original') || getImageUrl(currentData.poster_path, 'w1280');
  const posterUrl = getImageUrl(currentData.poster_path, 'w500');

  const libItem = library.find(
    (l) => l.tmdbId === currentData.id && (l.mediaType === mediaType || !l.mediaType)
  );

  const currentStatus = libItem?.status;
  const isFavorite = !!libItem?.favorite;
  const userRating = libItem?.userRating || 0;

  // Trailer lookup
  const trailerVideo = currentData.videos?.results?.find(
    (v) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
  );

  // TV Progress
  const watchedEps = mediaType === 'tv' ? getShowWatchedCount(currentData.id) : 0;
  const totalEps = currentData.number_of_episodes || libItem?.totalEpisodes || seasonDetail?.episodes?.length || 0;
  const progressPercent = totalEps > 0 ? Math.min(100, Math.round((watchedEps / totalEps) * 100)) : 0;

  const handleStatusChange = (status: WatchStatus) => {
    if (libItem) {
      updateStatus(libItem.id, status);
    } else {
      addToLibrary(currentData, status);
    }
  };

  const handleReviewSave = () => {
    if (libItem) {
      setUserReview(libItem.id, reviewText);
    } else {
      addToLibrary(currentData, 'watchlist').then(() => {
        const id = `${mediaType}_${currentData.id}`;
        setUserReview(id, reviewText);
      });
    }
  };

  const handleRatingClick = (rate: number) => {
    if (libItem) {
      setUserRating(libItem.id, rate);
    } else {
      addToLibrary(currentData, 'watched').then(() => {
        const id = `${mediaType}_${currentData.id}`;
        setUserRating(id, rate);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop Dimmer */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0c12] border border-zinc-800 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-y-auto z-10 no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-zinc-950 overflow-hidden">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-45"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-zinc-950 via-[#190a16] to-zinc-950" />
          )}

          {/* Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-[#0c0c12]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c12] via-transparent to-transparent" />

          {/* Trailer Button Overlay if available */}
          {trailerVideo && !showTrailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,42,133,0.7)] hover:scale-110 transition-transform cursor-pointer"
              title="Play Official Trailer"
            >
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </button>
          )}

          {/* Embedded YouTube Trailer Player */}
          {showTrailer && trailerVideo && (
            <div className="absolute inset-0 z-20 bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerVideo.key}?autoplay=1&rel=0`}
                title={`${title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute top-3 left-3 px-3 py-1 bg-black/80 hover:bg-black text-white text-xs rounded border border-zinc-700 cursor-pointer"
              >
                Close Trailer
              </button>
            </div>
          )}
        </div>

        {/* Modal Main Content */}
        <div className="px-5 sm:px-8 pb-8 -mt-24 sm:-mt-28 relative z-20">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Poster Thumbnail */}
            <div className="w-32 sm:w-44 aspect-[2/3] shrink-0 rounded-xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                  <Film className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Header Titles & Specs */}
            <div className="flex-1 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                <span className="text-[#ff2a85] font-semibold uppercase tracking-wider text-xs">
                  {mediaType === 'tv' ? 'TV Series' : 'Movie'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{year || 'Release Date TBA'}</span>
                {currentData.runtime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {currentData.runtime}m
                    </span>
                  </>
                )}
                {currentData.number_of_seasons && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{currentData.number_of_seasons} Seasons</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                {title}
              </h2>

              {currentData.tagline && (
                <p className="text-xs sm:text-sm text-zinc-400 italic mb-3">
                  "{currentData.tagline}"
                </p>
              )}

              {/* Rating & Genres */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800">
                  <Star className="w-3.5 h-3.5 text-[#ff2a85] fill-[#ff2a85]" />
                  <span className="font-bold text-white font-mono tabular-nums">{rating}</span>
                  <span className="text-zinc-500 text-[11px]">({currentData.vote_count || 0})</span>
                </div>

                {currentData.genres && currentData.genres.length > 0 && (
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    {currentData.genres.map((g, idx) => (
                      <span key={g.id}>
                        {g.name}
                        {idx < currentData.genres!.length - 1 && <span className="ml-1.5 text-zinc-600">·</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Phanteress Action Buttons (Movie vs Show) */}
              <div className="pt-1 pb-3 space-y-2">
                {mediaType === 'movie' ? (
                  /* Movie Row: [Watchlist] [✔️] [♥️] */
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWatchlist(currentData)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        currentStatus === 'watchlist'
                          ? 'bg-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.5)] border border-[#ff2a85]'
                          : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Watchlist</span>
                    </button>

                    <button
                      onClick={() => {
                        const isFuture = currentData.release_date && new Date(currentData.release_date).getTime() > Date.now();
                        if (isFuture) {
                          alert(`"${title}" has not been released yet.`);
                          return;
                        }
                        toggleWatched(currentData);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        currentStatus === 'watched'
                          ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400'
                          : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Watched</span>
                    </button>

                    <button
                      onClick={() => toggleFavoriteItem(currentData)}
                      className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        isFavorite
                          ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                          : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-400 border border-zinc-800'
                      }`}
                      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                ) : (
                  /* Show Row: [Add To Shows] [Watchlist] [♥️] */
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAddToShows(currentData)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        currentStatus === 'watching'
                          ? 'bg-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.5)] border border-[#ff2a85]'
                          : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800'
                      }`}
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>Add To Shows</span>
                    </button>

                    <button
                      onClick={() => toggleWatchlist(currentData)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        currentStatus === 'watchlist'
                          ? 'bg-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.5)] border border-[#ff2a85]'
                          : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Watchlist</span>
                    </button>

                    <button
                      onClick={() => toggleFavoriteItem(currentData)}
                      className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        isFavorite
                          ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                          : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-400 border border-zinc-800'
                      }`}
                      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                )}

                {/* Manage Lists Button on bottom of status row */}
                <div>
                  <button
                    onClick={() => setManageListOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-[#ff2a85]/40 text-zinc-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#ff2a85]" />
                    <span>Manage Lists</span>
                  </button>
                </div>
              </div>

              {/* TV Progress Bar */}
              {mediaType === 'tv' && (
                <div className="mt-2 pt-2 border-t border-zinc-900">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>Episode Progress</span>
                    <span className="font-mono text-white font-medium">
                      {watchedEps} / {totalEps || '?'} episodes ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] transition-all duration-300 shadow-[0_0_8px_rgba(255,42,133,0.8)]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Overview Section */}
          <div className="mt-6 pt-5 border-t border-zinc-900">
            <h3 className="text-sm font-semibold text-white mb-2">Overview</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {currentData.overview || 'No synopsis available for this title.'}
            </p>
          </div>

          {/* Interactive 10-Star User Rating & Personal Note */}
          <div className="mt-6 p-4 rounded-xl bg-[#09090e] border border-zinc-800/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Your Rating & Journal
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Rate out of 10 to calibrate your stats and recommendations
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => handleRatingClick(star)}
                    className="p-1 text-zinc-600 hover:text-amber-400 transition-colors cursor-pointer"
                    title={`Rate ${star}/10`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= (hoverRating ?? userRating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
                {userRating > 0 && (
                  <span className="text-xs font-bold text-amber-400 ml-1 font-mono">
                    {userRating}/10
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Add a personal review or private note..."
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2a85]"
              />
              <button
                onClick={handleReviewSave}
                className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-[#ff2a85] text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Save Note
              </button>
            </div>
          </div>

          {/* TV Shows: Interactive Seasons & Episodes Browser */}
          {mediaType === 'tv' && currentData.number_of_seasons && currentData.number_of_seasons > 0 && (
            <div className="mt-6 pt-5 border-t border-zinc-900">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Tv className="w-4 h-4 text-[#ff2a85]" />
                  <span>Seasons & Episodes</span>
                </h3>

                {/* Season Selector Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-xs sm:max-w-md py-1">
                  {Array.from({ length: currentData.number_of_seasons }, (_, i) => i + 1).map((sNum) => (
                    <button
                      key={sNum}
                      onClick={() => setActiveSeason(sNum)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeSeason === sNum
                          ? 'bg-[#ff2a85] text-white shadow-[0_0_10px_rgba(255,42,133,0.4)]'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      Season {sNum}
                    </button>
                  ))}
                </div>
              </div>

              {/* Episodes List */}
              {seasonLoading ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  <div className="w-5 h-5 border-2 border-[#ff2a85] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Loading Season {activeSeason} episodes...
                </div>
              ) : seasonDetail?.episodes && seasonDetail.episodes.length > 0 ? (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                  {seasonDetail.episodes.map((ep) => {
                    const watched = isEpisodeWatched(currentData.id, activeSeason, ep.episode_number);
                    const isUnreleased = ep.air_date ? new Date(ep.air_date).getTime() > Date.now() : false;

                    return (
                      <div
                        key={ep.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                          watched
                            ? 'bg-[#120a14] border-[#ff2a85]/30'
                            : isUnreleased
                            ? 'bg-zinc-950/40 border-zinc-900/60 opacity-80'
                            : 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                          <button
                            onClick={() => {
                              if (isUnreleased) return;
                              toggleEpisodeWatched(
                                currentData.id,
                                activeSeason,
                                ep.episode_number,
                                ep.name
                              );
                            }}
                            disabled={isUnreleased}
                            className={`shrink-0 ${isUnreleased ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                            title={isUnreleased ? `Premieres ${ep.air_date}` : watched ? 'Mark as unwatched' : 'Mark as watched'}
                          >
                            {isUnreleased ? (
                              <Lock className="w-4 h-4 text-zinc-500" />
                            ) : watched ? (
                              <CheckCircle2 className="w-5 h-5 text-[#ff2a85] fill-[#ff2a85]/20" />
                            ) : (
                              <Circle className="w-5 h-5 text-zinc-600 hover:text-zinc-400" />
                            )}
                          </button>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              <span className="text-zinc-500 font-mono mr-1.5">
                                E{ep.episode_number}.
                              </span>
                              {ep.name || `Episode ${ep.episode_number}`}
                            </p>
                            <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                              {ep.air_date ? ep.air_date : 'Air date not set'}
                              {ep.runtime ? ` · ${ep.runtime}m` : ''}
                              {ep.overview ? ` · ${ep.overview}` : ''}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-mono shrink-0 ${
                            isUnreleased
                              ? 'text-amber-400/80 bg-amber-400/10'
                              : watched
                              ? 'text-[#ff2a85] bg-[#ff2a85]/10'
                              : 'text-zinc-600'
                          }`}
                        >
                          {isUnreleased ? 'Unreleased' : watched ? 'Watched' : 'Unseen'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-zinc-500">
                  No episodes listed for this season.
                </div>
              )}
            </div>
          )}

          {/* Cast & Crew Carousel */}
          {currentData.credits?.cast && currentData.credits.cast.length > 0 && (
            <div className="mt-6 pt-5 border-t border-zinc-900">
              <h3 className="text-sm font-semibold text-white mb-3">Top Cast</h3>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {currentData.credits.cast.slice(0, 10).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center w-20 shrink-0 text-center"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 mb-1.5">
                      {actor.profile_path ? (
                        <img
                          src={getImageUrl(actor.profile_path, 'w300')}
                          alt={actor.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600 font-bold">
                          {actor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-white truncate w-full">
                      {actor.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 truncate w-full">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations / Similar Titles */}
          {currentData.recommendations?.results && currentData.recommendations.results.length > 0 && (
            <div className="mt-6 pt-5 border-t border-zinc-900">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#ff2a85]" />
                <span>You Might Also Like</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentData.recommendations.results.slice(0, 4).map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => onSelectRelated(rec)}
                    className="group flex flex-col bg-zinc-950 border border-zinc-900 hover:border-[#ff2a85]/50 rounded-lg overflow-hidden cursor-pointer p-2 transition-all"
                  >
                    <div className="aspect-[2/3] w-full rounded bg-zinc-900 overflow-hidden mb-1.5">
                      {rec.poster_path ? (
                        <img
                          src={getImageUrl(rec.poster_path, 'w300')}
                          alt={rec.title || rec.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-white truncate group-hover:text-[#ff2a85]">
                      {rec.title || rec.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono">
                      ★ {rec.vote_average ? rec.vote_average.toFixed(1) : '—'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating "Manage Lists" Bottom Sheet Modal */}
      {manageListOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setManageListOpen(false)}
          />

          <div className="relative w-full sm:max-w-md bg-[#0c0c14] border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-2xl p-6 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] max-h-[85vh] flex flex-col">
            <div className="w-10 h-1 bg-zinc-800 rounded-full mx-auto mb-3 sm:hidden" />

            <div className="flex items-center justify-between pb-3 border-b border-zinc-900 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ff2a85]" />
                <span>Manage Lists for "{title}"</span>
              </h3>
              <button
                onClick={() => setManageListOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Custom Lists with Checkboxes */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar mb-4 max-h-56">
              {customLists.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-xs text-zinc-400">
                    You don't have any custom lists yet.
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Create a list below to organize this title.
                  </p>
                </div>
              ) : (
                customLists.map((cl) => {
                  const itemId = `${mediaType}_${currentData.id}`;
                  const inList = isItemInCustomList(cl.id, itemId);

                  return (
                    <button
                      key={cl.id}
                      onClick={() => toggleItemInCustomList(cl.id, currentData)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-pointer ${
                        inList
                          ? 'bg-[#18101a] border-[#ff2a85]/50 text-white shadow-[0_0_12px_rgba(255,42,133,0.15)]'
                          : 'bg-zinc-950/70 border-zinc-900 text-zinc-300 hover:border-zinc-800'
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <p className="text-sm font-semibold text-white truncate">{cl.name}</p>
                        {cl.description && (
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">{cl.description}</p>
                        )}
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {cl.itemIds.length} titles
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          inList
                            ? 'bg-[#ff2a85] border-[#ff2a85] text-white shadow-[0_0_8px_rgba(255,42,133,0.7)]'
                            : 'border-zinc-700 bg-transparent'
                        }`}
                      >
                        {inList && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Quick Create New List Form */}
            <div className="pt-3 border-t border-zinc-900 space-y-2">
              <p className="text-xs font-semibold text-zinc-300">Create New List</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New list name (e.g. Marvel)"
                  value={newListNameInModal}
                  onChange={(e) => setNewListNameInModal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newListNameInModal.trim()) {
                      const createdId = createCustomList(newListNameInModal.trim());
                      toggleItemInCustomList(createdId, currentData);
                      setNewListNameInModal('');
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#ff2a85]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newListNameInModal.trim()) return;
                    const createdId = createCustomList(newListNameInModal.trim());
                    toggleItemInCustomList(createdId, currentData);
                    setNewListNameInModal('');
                  }}
                  disabled={!newListNameInModal.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] disabled:opacity-50 text-white text-xs font-semibold cursor-pointer shrink-0 transition-opacity"
                >
                  Create & Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
