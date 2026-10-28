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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Showly-Style Full Pill Capsule Floating Over Hero Banner */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-[#12121b]/80 backdrop-blur-md border border-zinc-700/60 hover:border-[#ff2a85]/50 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {/* Left Search Trigger */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex-1 flex items-center gap-3 text-left cursor-pointer focus:outline-none group"
        >
          <img
            src="/logo.png"
            alt="Velvetscreen Logo"
            className="w-5 h-5 rounded-md object-cover shadow-sm border border-[#ff2a85]/50 shrink-0"
          />
          <Search className="w-4 h-4 text-zinc-400 group-hover:text-[#ff2a85] shrink-0 transition-colors" />
          <span className="text-sm font-normal text-zinc-300 group-hover:text-white font-serif tracking-wide select-none transition-colors">
            Search
          </span>
        </button>

        {/* Right Settings Button */}
        <button
          type="button"
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
