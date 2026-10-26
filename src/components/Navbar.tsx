import React from 'react';
import {
  CheckSquare,
  ClipboardList,
  Search,
  Bookmark,
  BarChart2,
} from 'lucide-react';

export type NavTab = 'progress' | 'order' | 'discover' | 'collection' | 'stats';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const navLinks = [
    { id: 'progress' as NavTab, label: 'Progress', icon: CheckSquare },
    { id: 'order' as NavTab, label: 'Order', icon: ClipboardList },
    { id: 'discover' as NavTab, label: 'Discover', icon: Search },
    { id: 'collection' as NavTab, label: 'Collection', icon: Bookmark },
    { id: 'stats' as NavTab, label: 'Stats', icon: BarChart2 },
  ];

  return (
    /* Showly-Style Floating Pill Bottom Dock (Matching Screenshot 1) */
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md">
      <nav className="flex items-center justify-around h-16 px-2 rounded-full bg-[#12121a]/95 backdrop-blur-xl border border-zinc-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
        {navLinks.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all cursor-pointer min-h-[44px] min-w-[52px] group ${
                isActive ? 'text-[#ff2a85]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {/* Active Pill Container around Icon (Screenshot 1) */}
              <div
                className={`px-3.5 py-1 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#ff2a85]/15 text-[#ff2a85] shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                    : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 font-medium ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-500'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
