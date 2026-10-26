import React from 'react';
import {
  Clock,
  Film,
  Tv,
  Star,
  Award,
  TrendingUp,
  Flame
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const StatsView: React.FC = () => {
  const { stats, library } = useLibrary();

  const ratedItems = library.filter((i) => i.userRating && i.userRating > 0);

  const kpis = [
    {
      label: 'Watch Time',
      value: `${stats.watchTimeDays}d ${stats.watchTimeHours % 24}h`,
      subtext: `${stats.watchTimeHours} total hours logged`,
      icon: Clock,
      color: 'text-[#ff2a85]',
      bg: 'bg-[#ff2a85]/10',
      border: 'border-[#ff2a85]/20',
    },
    {
      label: 'Movies Watched',
      value: stats.totalMovies,
      subtext: 'Feature films completed',
      icon: Film,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
    {
      label: 'Episodes Watched',
      value: stats.totalEpisodesWatched,
      subtext: `Across ${stats.totalShows} tracked series`,
      icon: Tv,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/10',
      border: 'border-fuchsia-500/20',
    },
    {
      label: 'Average Score',
      value: stats.avgRating > 0 ? `★ ${stats.avgRating}` : '—',
      subtext: `${ratedItems.length} personal scores given`,
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5">
          <Flame className="w-7 h-7 text-[#ff2a85]" />
          <span>Stats</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Viewing insights, screen time calculation, and genre breakdown.
        </p>
      </div>

      {/* 4-KPI Grid */}
      <div className="grid grid-cols-2 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl bg-[#0c0c14] border ${kpi.border} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {kpi.value}
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">{kpi.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Watched Genres */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0c14] border border-zinc-900">
        <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#ff2a85]" />
          <span>Genre Breakdown</span>
        </h2>
        <p className="text-xs text-zinc-400 mb-5">
          Distribution across your tracked titles
        </p>

        {stats.topGenres.length === 0 ? (
          <div className="py-6 text-center text-zinc-500 text-xs">
            Track shows and movies in your library to see your personal genre breakdown.
          </div>
        ) : (
          <div className="space-y-3.5">
            {stats.topGenres.map((genre) => {
              const maxCount = stats.topGenres[0]?.count || 1;
              const percent = Math.round((genre.count / maxCount) * 100);
              return (
                <div key={genre.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-300">{genre.name}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      {genre.count} titles
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] rounded-full shadow-[0_0_8px_rgba(255,42,133,0.5)]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Viewing Achievement Milestone */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0e0e16] border border-[#ff2a85]/30">
        <Award className="w-6 h-6 text-[#ff2a85] shrink-0" />
        <div>
          <p className="text-xs font-semibold text-white">Cinephile Level</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {stats.totalMovies + stats.totalEpisodesWatched >= 10
              ? 'Level 2 Track Master reached!'
              : 'Log at least 10 titles or episodes to unlock your next milestone badge.'}
          </p>
        </div>
      </div>
    </div>
  );
};
