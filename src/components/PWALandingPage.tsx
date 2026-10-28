import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Tv,
  Film,
  PlayCircle,
  Bookmark,
  Share2,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWALandingPageProps {
  onEnterStandalone: () => void;
}

export const PWALandingPage: React.FC<PWALandingPageProps> = ({ onEnterStandalone }) => {
  const { isInstallable, install, isIOS } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installing, setInstalling] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      setInstalling(true);
      const success = await install();
      setInstalling(false);
      if (success) {
        onEnterStandalone();
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // In browsers where beforeinstallprompt already fired or is not supported (e.g. desktop Firefox/Safari),
      // allow immediate entry while instructing user how to pin/install
      onEnterStandalone();
    }
  };

  return (
    <div className="min-h-screen bg-[#060609] text-zinc-100 flex flex-col justify-between selection:bg-[#ff2a85] selection:text-white relative overflow-hidden">
      {/* Background Neon Pink Scrims */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#ff2a85]/20 via-[#ff2a85]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#ff2a85]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Simple Brand Marker */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Phanteress Library"
            className="w-9 h-9 rounded-xl object-cover shadow-[0_0_20px_rgba(255,42,133,0.5)] border border-[#ff2a85]/40"
          />
          <span className="text-xl font-extrabold tracking-tight text-white">
            PHANTERESS <span className="text-[#ff2a85]">LIBRARY</span>
          </span>
        </div>

        <button
          onClick={onEnterStandalone}
          className="text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800"
        >
          <span>Open in Browser</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#ff2a85]" />
        </button>
      </header>

      {/* Main Hero & Installation Action */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 text-center flex flex-col items-center">
        {/* App Logo Display */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-[#ff2a85]/40 rounded-3xl blur-2xl group-hover:bg-[#ff2a85]/60 transition-all" />
          <img
            src="/logo.png"
            alt="Phanteress Library Logo"
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-[#ff2a85]/60 shadow-[0_10px_35px_rgba(255,42,133,0.5)] transition-transform hover:scale-105"
          />
        </div>

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#ff2a85]" />
          <span>Progressive Web App · Native Mobile Experience</span>
        </div>

        {/* Primary Required Welcome Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 max-w-2xl [text-wrap:balance]">
          Welcome to <span className="bg-gradient-to-r from-white via-zinc-100 to-[#ff2a85] bg-clip-text text-transparent">Phanteress Library</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mb-8 leading-relaxed">
          Inspired by the Showly App. Track movies and TV series down to the exact episode, manage custom lists, explore releases, and sync your watch journey.
        </p>

        {/* Primary Required Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleInstallClick}
            disabled={installing}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(255,42,133,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Download className="w-5 h-5" />
            <span>Install App to Start Tracking</span>
          </button>

          <button
            onClick={onEnterStandalone}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            Continue in Browser
          </button>
        </div>

        {/* Mock Phone Visual / Highlight Cards */}
        <div className="mt-12 w-full max-w-2xl p-4 sm:p-6 rounded-2xl bg-[#0c0c14] border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4 text-xs">
            <span className="font-semibold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#ff2a85]" />
              <span>Full Showly Tracking Suite Included</span>
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              PWA Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
              <PlayCircle className="w-4 h-4 text-[#ff2a85]" />
              <p className="font-semibold text-white">Progress Tab</p>
              <p className="text-[11px] text-zinc-400">Next episodes, shows/movies toggle & 1-tap checkmark.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
              <Film className="w-4 h-4 text-[#ff2a85]" />
              <p className="font-semibold text-white">Discover & TMDB</p>
              <p className="text-[11px] text-zinc-400">Pill search capsule, live API data, and trailers.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
              <Layers className="w-4 h-4 text-[#ff2a85]" />
              <p className="font-semibold text-white">Custom Lists</p>
              <p className="text-[11px] text-zinc-400">Watchlist, Completed, and personalized custom lists.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 text-center text-xs text-zinc-500">
        <p>Phanteress Library · Powered by TMDB & Firebase · Pure Black and Hot Pink Theme</p>
      </footer>

      {/* iOS Installation Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0f0f18] border border-zinc-800 p-6 text-left shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#ff2a85]/10 border border-[#ff2a85]/30 flex items-center justify-center text-[#ff2a85] mb-3">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Install on iOS Safari</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              1. Tap the <strong className="text-white">Share</strong> button in Safari's toolbar.<br />
              2. Scroll down and tap <strong className="text-white">Add to Home Screen</strong>.<br />
              3. Open Phanteress Library from your home screen for the full app experience!
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowIOSModal(false);
                  onEnterStandalone();
                }}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold cursor-pointer"
              >
                Proceed in Browser
              </button>
              <button
                onClick={() => setShowIOSModal(false)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
