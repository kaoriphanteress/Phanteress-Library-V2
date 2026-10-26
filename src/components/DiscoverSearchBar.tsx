import React from 'react';
import { Search, Settings } from 'lucide-react';

interface DiscoverSearchBarProps {
  onOpenSearch: () => void;
  onOpenSettings: () => void;
}

export const DiscoverSearchBar: React.FC<DiscoverSearchBarProps> = ({
  onOpenSearch,
  onOpenSettings,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-2">
      {/* Showly-Style Full Pill Capsule Search Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-[#13131c] border border-zinc-800/90 hover:border-[#ff2a85]/40 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Left Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex-1 flex items-center gap-3 text-left cursor-pointer focus:outline-none"
        >
          <Search className="w-4 h-4 text-zinc-400 group-hover:text-[#ff2a85] shrink-0" />
          <span className="text-sm font-normal text-zinc-400 font-serif tracking-wide select-none">
            Search
          </span>
        </button>

        {/* Right Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Settings & Cloud Sync"
        >
          <Settings className="w-4 h-4 hover:rotate-45 transition-transform" />
        </button>
      </div>
    </div>
  );
};
