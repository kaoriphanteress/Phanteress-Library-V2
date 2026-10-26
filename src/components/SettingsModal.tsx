import React from 'react';
import {
  X,
  LogIn,
  LogOut,
  ShieldCheck,
  Cloud,
  Film,
  Info,
  Sliders,
  ExternalLink,
  Sparkles,
  Database,
  Check,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, signInWithGoogle, logout } = useAuth();
  const { library, episodes, clearAllData } = useLibrary();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Settings Modal Sheet */}
      <div className="relative w-full max-w-lg bg-[#0e0e16] border border-zinc-800 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#09090f]">
          <h2 className="text-lg font-bold text-white tracking-tight">Settings</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Section 1: Account & Google Cloud Sync */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#ff2a85]" />
              <span>Account & Cloud Sync</span>
            </h3>

            {user ? (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <div className="flex items-center gap-3.5 mb-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full border-2 border-[#ff2a85] object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#ff2a85]/20 text-[#ff2a85] flex items-center justify-center font-bold text-sm">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {user.displayName || 'Showty User'}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Firebase Cloud Sync Active</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex justify-end">
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-center">
                <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                  Sign in with Google to synchronize your watchlist, episode progress, and custom lists across all your devices via Firebase.
                </p>
                <button
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.35)] transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Data & Storage */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#ff2a85]" />
              <span>Storage & Library Status</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850">
                <p className="text-zinc-500 text-[11px]">Tracked Titles</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">{library.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850">
                <p className="text-zinc-500 text-[11px]">Watched Episodes</p>
                <p className="text-lg font-bold text-[#ff2a85] font-mono mt-0.5">{episodes.filter(e => e.watched).length}</p>
              </div>
            </div>
            <div className="mt-2.5">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset and clear all titles, progress, and custom lists?')) {
                    clearAllData();
                  }
                }}
                className="w-full py-2 px-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Reset All Progress & Titles</span>
              </button>
            </div>
          </div>

          {/* Section 3: Credits & TMDB Attribution (Requested by User) */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#ff2a85]" />
              <span>Credits & Attribution</span>
            </h3>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 text-xs space-y-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#ff2a85]" />
                <span className="font-semibold text-white">The Movie Database (TMDB)</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                This application uses TMDB and the TMDB APIs to retrieve high-resolution posters, backdrops, cast information, synopsis, and episode schedules.
              </p>
              <div className="p-2.5 rounded-lg bg-[#0a0a10] border border-zinc-800 text-[10px] text-zinc-500 font-mono">
                "This product uses the TMDB API but is not endorsed or certified by TMDB."
              </div>
            </div>
          </div>

          {/* Section 4: Treat Me (Requested PayPal Me Integration) */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#ff2a85] fill-[#ff2a85]/40" />
              <span>Treat Me</span>
            </h3>
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#160d18] to-zinc-950 border border-[#ff2a85]/30 text-xs space-y-3">
              <p className="text-zinc-300 text-xs leading-relaxed">
                Enjoying Phanteress Library? Support the app and future updates with a treat!
              </p>
              <a
                href="https://www.paypal.me/IanLenard759"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.35)] transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Treat Me on PayPal</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Section 5: About & Install Guidance */}
          <div className="pt-2 border-t border-zinc-900 text-center text-xs text-zinc-500 space-y-1">
            <p className="font-semibold text-zinc-400">Phanteress Library v2.0</p>
            <p className="text-[11px]">Inspired by Showly · Black & Pink Edition</p>
            <p className="text-[10px] text-zinc-600 pt-1">
              Tip: Tap "Add to Home Screen" in your browser menu to install this as a native app on your phone!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
