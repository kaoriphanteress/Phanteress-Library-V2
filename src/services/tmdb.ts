import { TMDBItem, TMDBSeasonDetail } from '../types/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '848fe4caae0a257296be80f1ee012769';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const TMDB_GENRES = [
  { id: 0, name: 'All' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
];

export function getImageUrl(path: string | null | undefined, size: 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'): string {
  if (!path) {
    return '';
  }
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`TMDB HTTP error ${res.status}: ${res.statusText}`);
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`TMDB fetch failed for ${endpoint}:`, error);
    throw error;
  }
}

export async function getTrendingAll(timeWindow: 'day' | 'week' = 'day'): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>(`/trending/all/${timeWindow}`);
    return data.results.map(item => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    }));
  } catch {
    return FALLBACK_TRENDING;
  }
}

export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'day'): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>(`/trending/movie/${timeWindow}`);
    return data.results.map(item => ({ ...item, media_type: 'movie' }));
  } catch {
    return FALLBACK_MOVIES;
  }
}

export async function getTrendingTV(timeWindow: 'day' | 'week' = 'day'): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>(`/trending/tv/${timeWindow}`);
    return data.results.map(item => ({ ...item, media_type: 'tv' }));
  } catch {
    return FALLBACK_TV;
  }
}

export async function getPopularMovies(page = 1): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>('/movie/popular', { page: String(page) });
    return data.results.map(item => ({ ...item, media_type: 'movie' }));
  } catch {
    return FALLBACK_MOVIES;
  }
}

export async function getPopularTV(page = 1): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>('/tv/popular', { page: String(page) });
    return data.results.map(item => ({ ...item, media_type: 'tv' }));
  } catch {
    return FALLBACK_TV;
  }
}

export async function getTopRatedMovies(): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>('/movie/top_rated');
    return data.results.map(item => ({ ...item, media_type: 'movie' }));
  } catch {
    return FALLBACK_MOVIES;
  }
}

export async function getTopRatedTV(): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>('/tv/top_rated');
    return data.results.map(item => ({ ...item, media_type: 'tv' }));
  } catch {
    return FALLBACK_TV;
  }
}

export async function getNowPlayingMovies(): Promise<TMDBItem[]> {
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>('/movie/now_playing');
    return data.results.map(item => ({ ...item, media_type: 'movie' }));
  } catch {
    return FALLBACK_MOVIES;
  }
}

export async function searchMulti(query: string): Promise<TMDBItem[]> {
  if (!query.trim()) return [];
  try {
    const data = await fetchFromTMDB<{ results: TMDBItem[] }>('/search/multi', {
      query: query.trim(),
      include_adult: 'false',
    });
    return data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      .map(item => ({
        ...item,
        media_type: item.media_type || (item.title ? 'movie' : 'tv')
      }));
  } catch {
    const q = query.toLowerCase();
    return [...FALLBACK_TRENDING, ...FALLBACK_MOVIES, ...FALLBACK_TV].filter(
      item => (item.title || item.name || '').toLowerCase().includes(q)
    );
  }
}

export async function getDetails(id: number, type: 'movie' | 'tv'): Promise<TMDBItem> {
  try {
    const data = await fetchFromTMDB<TMDBItem>(`/${type}/${id}`, {
      append_to_response: 'credits,videos,recommendations',
    });
    return {
      ...data,
      media_type: type,
    };
  } catch {
    const found = [...FALLBACK_TRENDING, ...FALLBACK_MOVIES, ...FALLBACK_TV].find(
      i => i.id === id && (i.media_type === type || (!i.media_type && (type === 'movie' ? !!i.title : !!i.name)))
    );
    if (found) return { ...found, media_type: type };
    return {
      id,
      title: type === 'movie' ? 'Title Not Found' : undefined,
      name: type === 'tv' ? 'Show Not Found' : undefined,
      overview: 'Details currently unavailable. Please verify connection or API key.',
      poster_path: null,
      backdrop_path: null,
      media_type: type,
      vote_average: 7.5,
      vote_count: 100,
    };
  }
}

export async function getTVSeasonDetails(showId: number, seasonNumber: number): Promise<TMDBSeasonDetail | null> {
  try {
    return await fetchFromTMDB<TMDBSeasonDetail>(`/tv/${showId}/season/${seasonNumber}`);
  } catch {
    // Generate placeholder season episodes so episode tracking always works gracefully
    return {
      id: seasonNumber,
      name: `Season ${seasonNumber}`,
      overview: `Episodes for Season ${seasonNumber}`,
      season_number: seasonNumber,
      poster_path: null,
      episodes: Array.from({ length: 10 }, (_, i) => ({
        id: showId * 1000 + seasonNumber * 100 + (i + 1),
        name: `Episode ${i + 1}`,
        overview: `Episode ${i + 1} synopsis and storyline summary.`,
        season_number: seasonNumber,
        episode_number: i + 1,
        air_date: '2024-01-01',
        still_path: null,
        vote_average: 8.0,
        runtime: 48,
      })),
    };
  }
}

export async function discoverByGenre(type: 'movie' | 'tv', genreId: number): Promise<TMDBItem[]> {
  try {
    if (type === 'tv') {
      const params: Record<string, string> = { sort_by: 'popularity.desc' };
      // TMDB TV genre mapping: Action (28) & Adventure (12) -> 10759, Sci-Fi (878) & Fantasy (14) -> 10765
      if (genreId === 28 || genreId === 12) {
        params.with_genres = '10759';
      } else if (genreId === 878 || genreId === 14) {
        params.with_genres = '10765';
      } else if (genreId === 27) {
        // Horror -> TMDB TV uses keyword 3335 (horror) or genre 9648
        params.with_keywords = '3335';
      } else if (genreId === 53) {
        // Thriller -> TMDB TV uses keyword 9715 (thriller) or genre 9648
        params.with_keywords = '9715';
      } else {
        params.with_genres = String(genreId);
      }

      let data = await fetchFromTMDB<{ results: TMDBItem[] }>('/discover/tv', params);
      // Fallback if keywords returned empty results
      if ((!data.results || data.results.length === 0) && (genreId === 27 || genreId === 53)) {
        data = await fetchFromTMDB<{ results: TMDBItem[] }>('/discover/tv', {
          with_genres: '9648',
          sort_by: 'popularity.desc',
        });
      }
      return (data.results || []).map(item => ({ ...item, media_type: 'tv' }));
    } else {
      const data = await fetchFromTMDB<{ results: TMDBItem[] }>('/discover/movie', {
        with_genres: String(genreId),
        sort_by: 'popularity.desc',
      });
      return (data.results || []).map(item => ({ ...item, media_type: 'movie' }));
    }
  } catch {
    const pool = type === 'movie' ? FALLBACK_MOVIES : FALLBACK_TV;
    return pool.filter(i => {
      const ids = i.genre_ids || [];
      const gList = i.genres ? i.genres.map(g => g.id) : [];
      const allIds = new Set([...ids, ...gList]);
      if (allIds.has(genreId)) return true;
      // TV genre mappings
      if ((genreId === 28 || genreId === 12) && (allIds.has(10759) || allIds.has(28) || allIds.has(12))) return true;
      if ((genreId === 878 || genreId === 14) && (allIds.has(10765) || allIds.has(878) || allIds.has(14))) return true;
      if ((genreId === 27 || genreId === 53) && (allIds.has(9648) || allIds.has(53) || allIds.has(27))) return true;
      return false;
    });
  }
}

// Robust fallback data ensuring the UI is immediately alive
export const FALLBACK_TRENDING: TMDBItem[] = [
  {
    id: 96677,
    name: 'Lupin',
    overview: 'Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.',
    poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop_path: '/aY7zv2pfk9H0QxaaL3PBjvalbKQ.jpg',
    media_type: 'tv',
    first_air_date: '2021-01-08',
    vote_average: 7.8,
    vote_count: 2240,
    number_of_seasons: 3,
    number_of_episodes: 17,
    genre_ids: [80, 18, 9648, 53],
    genres: [{ id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }, { id: 9648, name: 'Mystery' }, { id: 53, name: 'Thriller' }]
  },
  {
    id: 1061474,
    title: 'Superman',
    overview: 'Follows the titular superhero as he reconciles his heritage with his human upbringing. He is the embodiment of truth, justice and the American way in a world that views kindness as old-fashioned.',
    poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    backdrop_path: '/9nhjGaFLKtddDPtPaXqEmKqsWdH.jpg',
    media_type: 'movie',
    release_date: '2025-07-11',
    vote_average: 8.3,
    vote_count: 1450,
    runtime: 142,
    genre_ids: [28, 878, 12],
    genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Sci-Fi' }, { id: 12, name: 'Adventure' }]
  },
  {
    id: 93405,
    name: 'Squid Game',
    overview: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits — with deadly high stakes.',
    poster_path: '/fcXdJlbSdUEeMSJFsXKsznGwwok.jpg',
    backdrop_path: '/2meX1nMdScFOoV4370rqHWKm5oY.jpg',
    media_type: 'tv',
    first_air_date: '2021-09-17',
    vote_average: 8.2,
    vote_count: 14800,
    number_of_seasons: 2,
    number_of_episodes: 16,
    genre_ids: [18, 9648, 53, 27],
    genres: [{ id: 18, name: 'Drama' }, { id: 9648, name: 'Mystery' }, { id: 53, name: 'Thriller' }, { id: 27, name: 'Horror' }]
  },
  {
    id: 693134,
    title: 'Dune: Part Two',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0x2.jpg',
    media_type: 'movie',
    release_date: '2024-03-01',
    vote_average: 8.2,
    vote_count: 6100,
    runtime: 166,
    genre_ids: [878, 12],
    genres: [{ id: 878, name: 'Sci-Fi' }, { id: 12, name: 'Adventure' }]
  },
  {
    id: 111110,
    name: 'ONE PIECE',
    overview: 'With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure in this live-action adaptation of the popular manga.',
    poster_path: '/fcXdJlbSdUEeMSJFsXKsznGwwok.jpg',
    backdrop_path: '/2rmK7mnchsl935x72P29whvm9Bp.jpg',
    media_type: 'tv',
    first_air_date: '2023-08-31',
    vote_average: 8.2,
    vote_count: 1200,
    number_of_seasons: 2,
    number_of_episodes: 16,
    genre_ids: [28, 12, 10759, 14, 10765],
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 10759, name: 'Action & Adventure' }, { id: 14, name: 'Fantasy' }, { id: 10765, name: 'Sci-Fi & Fantasy' }]
  },
  {
    id: 823464,
    title: 'Godzilla x Kong: The New Empire',
    overview: 'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence.',
    poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop_path: '/qrGtVF3YZvJnecuNkFPFQ94ip7h.jpg',
    media_type: 'movie',
    release_date: '2024-03-29',
    vote_average: 7.1,
    vote_count: 3600,
    runtime: 115,
    genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Sci-Fi' }]
  }
];

export const FALLBACK_MOVIES: TMDBItem[] = [
  ...FALLBACK_TRENDING.filter(i => i.media_type === 'movie'),
  {
    id: 575264,
    title: 'Mission: Impossible - The Final Reckoning',
    overview: 'Our lives are the sum of our choices. Ethan Hunt and his IMF team face their most perilous mission yet.',
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop_path: '/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
    media_type: 'movie',
    release_date: '2025-05-23',
    vote_average: 8.0,
    vote_count: 850,
    runtime: 165,
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }]
  },
  {
    id: 27205,
    title: 'Inception',
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life.',
    poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdrop_path: '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    media_type: 'movie',
    release_date: '2010-07-16',
    vote_average: 8.4,
    vote_count: 35000,
    runtime: 148,
    genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Sci-Fi' }]
  },
  {
    id: 157336,
    title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    media_type: 'movie',
    release_date: '2014-11-07',
    vote_average: 8.4,
    vote_count: 34000,
    runtime: 169,
    genres: [{ id: 12, name: 'Adventure' }, { id: 18, name: 'Drama' }, { id: 878, name: 'Sci-Fi' }]
  }
];

export const FALLBACK_TV: TMDBItem[] = [
  ...FALLBACK_TRENDING.filter(i => i.media_type === 'tv'),
  {
    id: 1399,
    name: 'Game of Thrones',
    overview: 'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war.',
    poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    backdrop_path: '/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
    media_type: 'tv',
    first_air_date: '2011-04-17',
    vote_average: 8.4,
    vote_count: 22800,
    number_of_seasons: 8,
    number_of_episodes: 73,
    genre_ids: [10765, 878, 14, 18, 28, 12],
    genres: [{ id: 10765, name: 'Sci-Fi & Fantasy' }, { id: 14, name: 'Fantasy' }, { id: 878, name: 'Sci-Fi' }, { id: 18, name: 'Drama' }]
  },
  {
    id: 66732,
    name: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    media_type: 'tv',
    first_air_date: '2016-07-15',
    vote_average: 8.6,
    vote_count: 17000,
    number_of_seasons: 5,
    number_of_episodes: 42,
    genres: [{ id: 18, name: 'Drama' }, { id: 9648, name: 'Mystery' }]
  },
  {
    id: 100088,
    name: 'The Last of Us',
    overview: 'Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.',
    poster_path: '/uKvVjHNqB5VmOrdxqAt2V7JMrRI.jpg',
    backdrop_path: '/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    media_type: 'tv',
    first_air_date: '2023-01-15',
    vote_average: 8.6,
    vote_count: 5100,
    number_of_seasons: 2,
    number_of_episodes: 16,
    genres: [{ id: 18, name: 'Drama' }, { id: 10765, name: 'Sci-Fi & Fantasy' }]
  }
];
