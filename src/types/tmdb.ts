export type MediaType = 'movie' | 'tv';

export type WatchStatus = 'watchlist' | 'watching' | 'watched' | 'dropped' | 'on_hold';

export interface TMDBItem {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type?: MediaType;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  tagline?: string;
  status?: string;
  credits?: {
    cast: TMDBCast[];
    crew: TMDBCrew[];
  };
  videos?: {
    results: TMDBVideo[];
  };
  recommendations?: {
    results: TMDBItem[];
  };
  seasons?: TMDBSeasonSummary[];
}

export interface TMDBCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDBSeasonSummary {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  air_date: string;
}

export interface TMDBSeasonDetail {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  poster_path: string | null;
  episodes: TMDBEpisode[];
}

export interface TMDBEpisode {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_number: number;
  air_date: string;
  still_path: string | null;
  vote_average: number;
  runtime?: number;
}

export interface LibraryItem {
  id: string; // e.g. "movie_123" or "tv_456"
  userId?: string;
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  overview?: string;
  genreIds?: number[];
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  status: WatchStatus;
  userRating?: number; // 1-10
  review?: string;
  favorite: boolean;
  totalSeasons?: number;
  totalEpisodes?: number;
  watchedEpisodesCount?: number;
  addedAt: string;
  updatedAt: string;
}

export interface EpisodeProgress {
  id: string; // e.g. "show_456_s1_e1"
  userId?: string;
  showId: number;
  seasonNumber: number;
  episodeNumber: number;
  episodeTitle?: string;
  watched: boolean;
  watchedAt: string;
}

export interface CustomListItem {
  id: string; // e.g. "movie_12345" or "tv_213375"
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  backdropPath?: string | null;
  releaseDate?: string;
  voteAverage?: number;
}

export interface CustomList {
  id: string;
  name: string;
  description: string;
  itemIds: string[]; // array of item IDs
  items?: CustomListItem[]; // cached full items
  createdAt: string;
  updatedAt?: string;
}

