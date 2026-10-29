import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  X,
  LogIn,
  LogOut,
  Cloud,
  Film,
  Info,
  Sliders,
  ExternalLink,
  Database,
  Heart,
  Trash2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';

interface HoldToResetButtonProps {
  onReset: () => Promise<void> | void;
}

const HoldToResetButton: React.FC<HoldToResetButtonProps> = ({ onReset }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [justReset, setJustReset] = useState(false);

  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const HOLD_DURATION = 2000; // 2.0 seconds

  const cancelHold = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setIsHolding(false);
    setProgress(0);
  }, []);

  const startHold = useCallback(
    (e: React.SyntheticEvent) => {
      if (isResetting || justReset) return;
      setIsHolding(true);
      startTimeRef.current = Date.now();

      try {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(30);
        }
      } catch {}

      const step = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const pct = Math.min(100, (elapsed / HOLD_DURATION) * 100);
        setProgress(pct);

        if (pct < 100) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          frameRef.current = null;
          setIsHolding(false);
          setIsResetting(true);
          try {
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              navigator.vibrate([60, 40, 100]);
            }
          } catch {}

          Promise.resolve(onReset()).finally(() => {
            setIsResetting(false);
            setJustReset(true);
            setProgress(0);
            setTimeout(() => {
              setJustReset(false);
            }, 4000);
          });
        }
      };

      frameRef.current = requestAnimationFrame(step);
    },
    [isResetting, justReset, onReset]
  );

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="space-y-2 select-none">
      <div
        role="button"
        tabIndex={0}
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        onTouchCancel={cancelHold}
        onContextMenu={(e) => e.preventDefault()}
        className={`relative overflow-hidden w-full py-3 px-4 rounded-xl border font-medium text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 select-none ${
          justReset
            ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            : isHolding
            ? 'border-[#ff2a85] bg-red-950/40 text-white scale-[0.98] shadow-[0_0_25px_rgba(255,42,133,0.45)]'
            : isResetting
            ? 'border-[#ff2a85]/50 bg-[#ff2a85]/10 text-[#ff2a85] animate-pulse'
            : 'border-red-500/30 bg-red-500/10 hover:bg-red-500/15 text-red-400 hover:border-red-500/50'
        }`}
      >
        {/* Animated Fill Bar while holding */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 via-[#ff2a85] to-rose-500 transition-[width] ease-linear pointer-events-none"
          style={{
            width: `${progress}%`,
            opacity: isHolding ? 0.85 : 0,
            transitionDuration: isHolding ? '50ms' : '200ms',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2 font-semibold">
            {justReset ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : isResetting ? (
              <RotateCcw className="w-4 h-4 animate-spin text-[#ff2a85]" />
            ) : isHolding ? (
              <AlertTriangle className="w-4 h-4 text-[#ff2a85] animate-pulse" />
            ) : (
              <Trash2 className="w-4 h-4 text-red-400" />
            )}

            <span>
              {justReset
                ? 'Library Reset Complete!'
                : isResetting
                ? 'Purging Library & Cloud Data...'
                : isHolding
                ? `Hold to Reset... ${Math.round(progress)}%`
                : 'Hold to Reset Library'}
            </span>
          </div>

          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors ${
              justReset
                ? 'bg-emerald-500/30 text-emerald-200'
                : isHolding
                ? 'bg-black/50 text-white font-bold'
                : 'bg-red-500/20 text-red-300'
            }`}
          >
            {justReset
              ? 'Done'
              : isHolding
              ? `${((HOLD_DURATION - (progress / 100) * HOLD_DURATION) / 1000).toFixed(1)}s`
              : 'Hold 2s'}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-zinc-500 text-center px-1">
        {justReset
          ? '✓ All tracked titles, watched episodes, and custom lists were cleared.'
          : 'Press & hold the button for 2 seconds to wipe all titles, progress, and lists.'}
      </p>
    </div>
  );
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, signInWithGoogle, signInAsGuest, signingIn, authError, clearAuthError, logout } = useAuth();
  const { library, episodes, clearAllData } = useLibrary();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-[#060609] overflow-y-auto no-scrollbar flex flex-col">
      {/* Sticky Top Header Bar - Full Screen & Mobile Friendly */}
      <div className="sticky top-0 z-40 w-full flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#09090f]/95 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#ff2a85]" />
          <h2 className="text-base font-bold text-white tracking-tight">Settings</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Close Settings"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Body Container */}
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6 flex-1 pb-16">
        {/* Section 1: Account & Cloud Sync */}
        <div>
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-[#ff2a85]" />
            <span>Account & Cloud Sync</span>
          </h3>

          {/* Diagnostic Error Banner if Google Auth encountered domain/popup barrier */}
          {authError && (
            <div className="p-3.5 mb-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">Sign In Notice</p>
                <p className="mt-0.5 text-[11px] text-zinc-300 leading-relaxed">{authError}</p>
                <button
                  onClick={clearAuthError}
                  className="mt-2 text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Dismiss notice
                </button>
              </div>
            </div>
          )}

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
                    {user.displayName || 'Phanteress User'}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {(user as any).isAnonymous ? 'Local / Cloud Guest Profile Active' : 'Firebase Cloud Sync Active'}
                    </span>
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
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <p className="text-xs text-zinc-300 leading-relaxed">
                Sign in with Google to synchronize your watchlist, episode progress, and custom lists across all your devices via Firebase.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={signInWithGoogle}
                  disabled={signingIn}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.35)] transition-all cursor-pointer disabled:opacity-60"
                >
                  {signingIn ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  <span>{signingIn ? 'Connecting...' : 'Sign In with Google'}</span>
                </button>

                <button
                  onClick={() => signInAsGuest('Movie Explorer')}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  title="Instant sync profile without popup requirements"
                >
                  <UserCheck className="w-4 h-4 text-[#ff2a85]" />
                  <span>Use Guest Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Data & Storage */}
        <div>
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-[#ff2a85]" />
            <span>Storage & Library Status</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850">
              <p className="text-zinc-500 text-[11px]">Tracked Titles</p>
              <p className="text-lg font-bold text-white font-mono mt-0.5">{library.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850">
              <p className="text-zinc-500 text-[11px]">Watched Episodes</p>
              <p className="text-lg font-bold text-[#ff2a85] font-mono mt-0.5">
                {episodes.filter((e) => e.watched).length}
              </p>
            </div>
          </div>

          <HoldToResetButton onReset={clearAllData} />
        </div>

        {/* Section 3: Credits & TMDB Attribution */}
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
          </div>
        </div>

        {/* Section 4: Treat Me */}
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

        {/* Section 5: About */}
        <div className="pt-4 border-t border-zinc-900 text-center text-xs text-zinc-500">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/logo.png"
              alt="Phanteress Library"
              className="w-9 h-9 rounded-xl object-cover shadow-[0_0_15px_rgba(255,42,133,0.4)] border border-[#ff2a85]/40"
            />
            <div className="text-left">
              <p className="font-bold text-white text-sm">Phanteress Library</p>
              <p className="text-[11px] text-zinc-400">Inspired by Showly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
