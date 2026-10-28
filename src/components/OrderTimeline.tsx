import React, { useState, useMemo } from 'react';
import {
  Search,
  Layers,
  ListOrdered,
  SlidersHorizontal,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  Film,
  Tv,
  ChevronRight,
  ChevronsUpDown
} from 'lucide-react';
import {
  MarvelItem,
  MarvelOrderConfig,
  PHASE_DISPLAY_NAMES,
  DisplayLayoutType
} from '../data/marvelData';
import {
  saveOrderItems,
  saveOrderConfig,
  saveStoredWatchedIds,
  saveStoredSkippedIds
} from '../services/marvelOrderService';
import { AdjustOrderModal } from './AdjustOrderModal';

interface OrderTimelineProps {
  config: MarvelOrderConfig;
  items: MarvelItem[];
  watchedIds: string[];
  skippedIds: string[];
  favoriteIds?: string[];
  onUpdateItems: (items: MarvelItem[]) => void;
  onUpdateWatched: (ids: string[]) => void;
  onUpdateSkipped: (ids: string[]) => void;
  onUpdateFavorites?: (ids: string[]) => void;
  onUpdateConfig: (config: MarvelOrderConfig) => void;
  onOpenWizard?: () => void;
  onSelectTitle?: (title: string, year?: number) => void;
}

type FilterType = 'all' | 'movie' | 'tv' | 'unwatched' | 'watched' | 'skipped';

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  config,
  items,
  watchedIds,
  skippedIds,
  onUpdateItems,
  onUpdateWatched,
  onUpdateSkipped,
  onUpdateConfig,
  onSelectTitle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [layoutMode, setLayoutMode] = useState<DisplayLayoutType>(config.layout || 'byphase');

  // Direct 1-Tab Adjust Order Modal
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  // Accordion state for By Phase: Record<phaseKey, isCollapsed>
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

  // Long list pagination limit for smooth scrolling performance
  const [displayCount, setDisplayCount] = useState<number>(30);

  // Toggle layout mode
  const handleToggleLayout = (mode: DisplayLayoutType) => {
    setLayoutMode(mode);
    const updated = { ...config, layout: mode };
    onUpdateConfig(updated);
    saveOrderConfig(updated);
  };

  // Watched toggle
  const handleToggleWatched = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const exists = watchedIds.includes(id);
    const nextWatched = exists
      ? watchedIds.filter((item) => item !== id)
      : [...watchedIds, id];

    // If marking watched, remove from skipped
    const nextSkipped = skippedIds.filter((item) => item !== id);

    onUpdateWatched(nextWatched);
    saveStoredWatchedIds(nextWatched);
    if (nextSkipped.length !== skippedIds.length) {
      onUpdateSkipped(nextSkipped);
      saveStoredSkippedIds(nextSkipped);
    }
  };

  // Skipped toggle
  const handleToggleSkipped = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const exists = skippedIds.includes(id);
    const nextSkipped = exists
      ? skippedIds.filter((item) => item !== id)
      : [...skippedIds, id];

    // If marking skipped, remove from watched
    const nextWatched = watchedIds.filter((item) => item !== id);

    onUpdateSkipped(nextSkipped);
    saveStoredSkippedIds(nextSkipped);
    if (nextWatched.length !== watchedIds.length) {
      onUpdateWatched(nextWatched);
      saveStoredWatchedIds(nextWatched);
    }
  };

  // Up/Down reordering
  const handleMove = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const nextItems = [...items];
    const [moved] = nextItems.splice(index, 1);
    nextItems.splice(newIndex, 0, moved);

    onUpdateItems(nextItems);
    saveOrderItems(nextItems);
  };

  // Phase collapse toggling
  const togglePhaseCollapse = (phaseKey: string) => {
    setCollapsedPhases((prev) => ({
      ...prev,
      [phaseKey]: !prev[phaseKey],
    }));
  };

  const toggleAllPhases = () => {
    const hasAnyExpanded = groupedPhases.some((g) => !collapsedPhases[g.phaseKey]);
    const nextState: Record<string, boolean> = {};
    groupedPhases.forEach((g) => {
      nextState[g.phaseKey] = hasAnyExpanded;
    });
    setCollapsedPhases(nextState);
  };

  // Filtered titles
  const filteredItems = useMemo(() => {
    let result = items;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.hero.toLowerCase().includes(q) ||
          i.phase.toLowerCase().includes(q) ||
          i.year.toString().includes(q)
      );
    }

    if (activeFilter === 'movie') {
      result = result.filter((i) => i.mediaType === 'movie');
    } else if (activeFilter === 'tv') {
      result = result.filter((i) => i.mediaType === 'tv' || i.mediaType === 'short');
    } else if (activeFilter === 'watched') {
      result = result.filter((i) => watchedIds.includes(i.id));
    } else if (activeFilter === 'unwatched') {
      result = result.filter((i) => !watchedIds.includes(i.id) && !skippedIds.includes(i.id));
    } else if (activeFilter === 'skipped') {
      result = result.filter((i) => skippedIds.includes(i.id));
    }

    return result;
  }, [items, searchQuery, activeFilter, watchedIds, skippedIds]);

  // Group by phase if in byphase layout
  const groupedPhases = useMemo(() => {
    if (layoutMode !== 'byphase') return [];
    const map = new Map<string, MarvelItem[]>();
    filteredItems.forEach((item) => {
      const p = item.phase || 'General';
      if (!map.has(p)) map.set(p, []);
      map.get(p)!.push(item);
    });

    return Array.from(map.entries()).map(([phaseKey, phaseItems]) => ({
      phaseKey,
      displayName: PHASE_DISPLAY_NAMES[phaseKey] || phaseKey,
      items: phaseItems,
      totalCount: phaseItems.length,
      completedCount: phaseItems.filter((i) => watchedIds.includes(i.id)).length,
    }));
  }, [filteredItems, layoutMode, watchedIds]);

  const totalTitles = items.length;
  const completedTotal = items.filter((i) => watchedIds.includes(i.id)).length;
  const percentTotal = totalTitles > 0 ? Math.round((completedTotal / totalTitles) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-5">
      {/* Search Input Bar */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in your order by title, hero, phase, or year..."
          className="w-full pl-11 pr-4 py-3 bg-[#0d0d16] border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff2a85] focus:ring-1 focus:ring-[#ff2a85] transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Top Controls Row: View Mode Switcher & Adjust Order Button (No Sort By) */}
      <div className="flex flex-wrap items-center justify-between gap-3 select-none">
        {/* Layout Toggle Buttons: By Phase vs One Long List */}
        <div className="flex items-center p-1 bg-zinc-950 border border-zinc-850 rounded-xl">
          <button
            type="button"
            onClick={() => handleToggleLayout('byphase')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              layoutMode === 'byphase'
                ? 'bg-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>By Phase</span>
          </button>
          <button
            type="button"
            onClick={() => handleToggleLayout('onelonglist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              layoutMode === 'onelonglist'
                ? 'bg-[#ff2a85] text-white shadow-[0_0_12px_rgba(255,42,133,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>One Long List</span>
          </button>
        </div>

        {/* Adjust Order CTA Button - Opens Single Tab Modal Directly */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsAdjustModalOpen(true);
          }}
          className="relative z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#ff2a85]/40 bg-[#ff2a85]/10 hover:bg-[#ff2a85]/20 text-[#ff2a85] text-xs font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(255,42,133,0.15)] active:scale-95"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Adjust Order</span>
        </button>
      </div>

      {/* Filter Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar select-none pb-1">
        {(
          [
            { id: 'all', label: 'All' },
            { id: 'movie', label: 'Movies' },
            { id: 'tv', label: 'Series' },
            { id: 'unwatched', label: 'Unwatched' },
            { id: 'watched', label: 'Watched' },
            { id: 'skipped', label: 'Skipped' },
          ] as { id: FilterType; label: string }[]
        ).map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] text-white font-bold shadow-[0_0_12px_rgba(255,42,133,0.35)]'
                  : 'bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Progress & Instruction Banner */}
      <div className="p-4 rounded-2xl bg-[#0b0b14] border border-zinc-850 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <p className="text-zinc-400 text-[11px] sm:text-xs">
            Active Timeline: Tap <span className="text-emerald-400 font-semibold">[✓]</span> for Watched,{' '}
            <span className="text-red-400 font-semibold">[✕]</span> for Skipped.
          </p>
          <span className="font-mono font-bold text-white text-xs whitespace-nowrap">
            {completedTotal} of {totalTitles} Titles ({percentTotal}%)
          </span>
        </div>

        {/* Global Progress Track */}
        <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-[#ff2a85] to-rose-400 transition-all duration-300"
            style={{ width: `${percentTotal}%` }}
          />
        </div>
      </div>

      {/* Accordion Controls for By Phase */}
      {layoutMode === 'byphase' && groupedPhases.length > 0 && (
        <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
          <span>{groupedPhases.length} Phases</span>
          <button
            type="button"
            onClick={toggleAllPhases}
            className="text-[11px] font-semibold text-[#ff2a85] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
            <span>Toggle All Phases</span>
          </button>
        </div>
      )}

      {/* Items Rendering */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center text-zinc-500 text-xs">
          No titles found matching your search or active filter.
        </div>
      ) : layoutMode === 'byphase' ? (
        /* ================= BY PHASE GROUPED ACCORDION VIEW ================= */
        <div className="space-y-4">
          {groupedPhases.map((group) => {
            const phasePct =
              group.totalCount > 0
                ? Math.round((group.completedCount / group.totalCount) * 100)
                : 0;
            const isCollapsed = !!collapsedPhases[group.phaseKey];

            return (
              <div
                key={group.phaseKey}
                className="rounded-2xl border border-zinc-850/80 bg-[#090910] overflow-hidden transition-all shadow-sm"
              >
                {/* Phase Chapter Header Card (Clickable Accordion) */}
                <div
                  onClick={() => togglePhaseCollapse(group.phaseKey)}
                  className="p-4 sm:p-5 bg-gradient-to-r from-[#170e1a] via-[#100d16] to-[#0c0c14] border-b border-zinc-850/50 cursor-pointer hover:bg-zinc-900/40 transition-colors select-none"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#ff2a85]/20 text-[#ff2a85] border border-[#ff2a85]/40 font-mono">
                      {group.phaseKey.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-zinc-300">
                        {group.completedCount} of {group.totalCount} ({phasePct}%)
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                          isCollapsed ? 'rotate-0' : 'rotate-90'
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-serif">
                    {group.displayName}
                  </h3>

                  {/* Phase Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden mt-2.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff2a85] to-rose-400 transition-all duration-300"
                      style={{ width: `${phasePct}%` }}
                    />
                  </div>
                </div>

                {/* Collapsible Phase Items */}
                {!isCollapsed && (
                  <div className="p-3 sm:p-4 space-y-2 bg-[#07070c]">
                    {group.items.map((item) => {
                      const globalIndex = items.findIndex((i) => i.id === item.id);
                      return renderTitleCard(item, globalIndex);
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= ONE LONG CONTINUOUS LIST VIEW WITH SMOOTH PAGINATION ================= */
        <div className="space-y-2.5">
          {filteredItems.slice(0, displayCount).map((item) => {
            const globalIndex = items.findIndex((i) => i.id === item.id);
            return renderTitleCard(item, globalIndex);
          })}

          {filteredItems.length > displayCount && (
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setDisplayCount((prev) => prev + 30)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Load Next 30 Titles ({filteredItems.length - displayCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Adjust Order Modal (Single Tab with all options) */}
      <AdjustOrderModal
        isOpen={isAdjustModalOpen}
        currentConfig={config}
        onClose={() => setIsAdjustModalOpen(false)}
        onApply={(newConfig, newItems) => {
          onUpdateConfig(newConfig);
          saveOrderConfig(newConfig);
          onUpdateItems(newItems);
          saveOrderItems(newItems);
          setLayoutMode(newConfig.layout || 'byphase');
          setIsAdjustModalOpen(false);
        }}
      />
    </div>
  );

  function renderTitleCard(item: MarvelItem, globalIndex: number) {
    const isWatched = watchedIds.includes(item.id);
    const isSkipped = skippedIds.includes(item.id);
    const rank = globalIndex + 1;

    return (
      <div
        key={item.id}
        onClick={() => onSelectTitle && onSelectTitle(item.title, item.year)}
        className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
          isWatched
            ? 'border-emerald-500/30 bg-emerald-950/10'
            : isSkipped
            ? 'border-zinc-850 bg-zinc-950/40 opacity-55'
            : 'border-zinc-850 bg-[#0d0d16] hover:border-zinc-700'
        }`}
      >
        {/* Left Side: Rank Number & Details */}
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
              isWatched
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800'
            }`}
          >
            {rank}
          </span>

          <div className="min-w-0">
            <h4
              className={`text-xs sm:text-sm font-bold truncate ${
                isWatched ? 'text-zinc-200 line-through' : 'text-white'
              }`}
            >
              {item.title}
            </h4>

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
              <span className="text-[#ff2a85] font-semibold">{item.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {item.mediaType === 'tv' ? (
                  <Tv className="w-3 h-3 text-purple-400" />
                ) : (
                  <Film className="w-3 h-3 text-rose-400" />
                )}
                <span>{item.runtime}</span>
              </span>
              <span>•</span>
              <span className="text-zinc-400 font-medium truncate">{item.phase}</span>
              <span>•</span>
              <span className="text-zinc-300 font-medium truncate">{item.hero}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Action Buttons (NO HEART BUTTON - Removed) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          {/* Watched Checkmark Button */}
          <button
            type="button"
            onClick={(e) => handleToggleWatched(item.id, e)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer ${
              isWatched
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-emerald-400 hover:border-zinc-700'
            }`}
            title="Mark Watched"
          >
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Skipped X Button */}
          <button
            type="button"
            onClick={(e) => handleToggleSkipped(item.id, e)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer ${
              isSkipped
                ? 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-red-400 hover:border-zinc-700'
            }`}
            title="Mark Skipped"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Up & Down Reorder Buttons */}
          <div className="flex flex-col ml-0.5">
            <button
              type="button"
              onClick={(e) => handleMove(globalIndex, 'up', e)}
              disabled={globalIndex === 0}
              className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
              title="Move Up"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={(e) => handleMove(globalIndex, 'down', e)}
              disabled={globalIndex === items.length - 1}
              className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
              title="Move Down"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }
};
