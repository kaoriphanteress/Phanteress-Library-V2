import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Layers,
  Film,
  Tv,
  ListOrdered,
  Calendar,
  Compass,
  SlidersHorizontal,
  Flame,
  Star,
  Check
} from 'lucide-react';
import {
  MarvelOrderConfig,
  FranchiseType,
  PropertySelection,
  WatchOrderType,
  DisplayLayoutType,
  getMarvelOrderItems,
  MarvelItem
} from '../data/marvelData';
import {
  saveOrderConfig,
  saveOrderItems,
  setOrderSetupDone
} from '../services/marvelOrderService';

interface OrderWizardProps {
  initialConfig: MarvelOrderConfig;
  onComplete: (config: MarvelOrderConfig, items: MarvelItem[]) => void;
  onCancel: () => void;
  hasExistingOrder: boolean;
}

export const OrderWizard: React.FC<OrderWizardProps> = ({
  initialConfig,
  onComplete,
  onCancel,
  hasExistingOrder
}) => {
  // Screens 1 to 6
  const [currentStep, setCurrentStep] = useState<number>(hasExistingOrder ? 2 : 1);

  const [franchise, setFranchise] = useState<FranchiseType>(initialConfig.franchise || 'marvel');
  const [property, setProperty] = useState<PropertySelection>(initialConfig.property || 'mcu');
  const [addCameos, setAddCameos] = useState<boolean>(initialConfig.addCameos || false);
  const [order, setOrder] = useState<WatchOrderType>(initialConfig.order || 'story');
  const [layout, setLayout] = useState<DisplayLayoutType>(initialConfig.layout || 'byphase');

  // Screen 6 generation animation
  const [genProgress, setGenProgress] = useState(0);
  const [generatedItems, setGeneratedItems] = useState<MarvelItem[]>([]);

  // Calculate configuration
  const currentConfig: MarvelOrderConfig = {
    franchise,
    property,
    addCameos,
    order,
    layout,
    generatedAt: new Date().toISOString()
  };

  // When step 6 is reached, trigger simulated loading animation
  useEffect(() => {
    if (currentStep === 6) {
      const items = getMarvelOrderItems(currentConfig);
      setGeneratedItems(items);
      setGenProgress(0);

      const interval = setInterval(() => {
        setGenProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(100, prev + 15);
        });
      }, 70);

      return () => clearInterval(interval);
    }
  }, [currentStep, property, addCameos, order, layout]);

  const handleFinish = () => {
    saveOrderConfig(currentConfig);
    saveOrderItems(generatedItems);
    setOrderSetupDone(true);
    onComplete(currentConfig, generatedItems);
  };

  const stepDots = [2, 3, 4, 5, 6];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 select-none">
      {/* Step Indicator Header (visible on screens 2 through 6) */}
      {currentStep > 1 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#ff2a85]/15 border border-[#ff2a85]/40 flex items-center justify-center text-[#ff2a85]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#ff2a85]">
                  Watchlist Setup Wizard
                </p>
                <p className="text-xs font-semibold text-zinc-400">
                  Step {currentStep} of 6
                </p>
              </div>
            </div>

            {hasExistingOrder && (
              <button
                onClick={onCancel}
                className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Close & Keep Active Order
              </button>
            )}
          </div>

          {/* Glowing Multi-step Progress Track */}
          <div className="grid grid-cols-5 gap-2">
            {stepDots.map((s) => {
              const isActive = s === currentStep;
              const isPast = s < currentStep;
              return (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff2a85] to-rose-400 shadow-[0_0_12px_rgba(255,42,133,0.6)]'
                      : isPast
                      ? 'bg-[#ff2a85]/60'
                      : 'bg-zinc-850'
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 1: Survey & Intro */}
      {/* ============================================================ */}
      {currentStep === 1 && (
        <div className="rounded-3xl bg-[#0a0a12] border border-zinc-800/80 p-8 sm:p-14 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Subtle Ambient Backing Glow */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#ff2a85]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#f43f5e]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1c1524] to-[#0d0d16] border border-[#ff2a85]/40 flex items-center justify-center text-[#ff2a85] mb-6 shadow-[0_0_30px_rgba(255,42,133,0.3)]">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
              Do you want to setup your own Watchlist?
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mb-10 leading-relaxed font-sans">
              Personalize your viewing experience using custom properties, canon timelines, grouping styles, and viewing calendars. This supports any franchise type, and you can suggest more franchises in the settings.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold text-sm shadow-[0_0_25px_rgba(255,42,133,0.4)] transition-all cursor-pointer transform active:scale-[0.98]"
              >
                <span>Yes, Let's Build</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCancel}
                className="w-full py-4 px-6 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 font-medium text-sm border border-zinc-800 transition-colors cursor-pointer"
              >
                No, Keep My Current Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 2: Universe & Franchise Selection */}
      {/* ============================================================ */}
      {currentStep === 2 && (
        <div className="rounded-3xl bg-[#0a0a12] border border-zinc-800/80 p-6 sm:p-10 relative overflow-hidden">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#ff2a85] uppercase tracking-wider">
              Universe Selection
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Which specific franchise would you prefer to acquire?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
              Select your entertainment universe. Phanteress Library allows curated deep dives across major cinematic franchises.
            </p>
          </div>

          <div className="space-y-3.5 mb-8">
            {/* Marvel (Active) */}
            <div
              onClick={() => setFranchise('marvel')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                franchise === 'marvel'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#1c111e] to-[#120f18] shadow-[0_0_20px_rgba(255,42,133,0.25)]'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Marvel
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ff2a85] text-white">
                      Active
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    The epic cinematic multiverse spanning 17+ years of gods, monsters, heroes, and cosmic battles—from Iron Man to the Road to Doomsday.
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    franchise === 'marvel'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {franchise === 'marvel' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
            </div>

            {/* DC (Coming Soon) */}
            <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/30 opacity-60 relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-base font-bold text-zinc-300">DC Universe</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-850 text-zinc-400 border border-zinc-800">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Coming Soon</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    From Gotham's shadows to Metropolis and the upcoming DCU slate. Expanding in future updates!
                  </p>
                </div>
              </div>
            </div>

            {/* Wizarding World (Coming Soon) */}
            <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/30 opacity-60 relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-base font-bold text-zinc-300">Wizarding World</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-850 text-zinc-400 border border-zinc-800">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Coming Soon</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Hogwarts, magical beasts, and the legendary history of witchcraft and wizardry.
                  </p>
                </div>
              </div>
            </div>

            {/* Star Wars (Coming Soon) */}
            <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/30 opacity-60 relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-base font-bold text-zinc-300">Star Wars Galaxy</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-850 text-zinc-400 border border-zinc-800">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Coming Soon</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    A galaxy far, far away—spanning the Skywalker Saga, Clone Wars, and the Mandoverse.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-bold shadow-[0_0_15px_rgba(255,42,133,0.35)] transition-all cursor-pointer"
            >
              <span>Continue to Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 3.1: Choose a Properties */}
      {/* ============================================================ */}
      {currentStep === 3 && (
        <div className="rounded-3xl bg-[#0a0a12] border border-zinc-800/80 p-6 sm:p-10 relative overflow-hidden">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#ff2a85] uppercase tracking-wider">
              Properties Selection
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Choose a Properties:
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
              Select how extensive you want your Marvel Watchlist to be.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* 1. Doomsday List (Instant Auto-Create Option) */}
            <div
              onClick={() => setProperty('doomsday')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                property === 'doomsday'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#201222] to-[#14101a] shadow-[0_0_20px_rgba(255,42,133,0.25)]'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Doomsday List
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setProperty('doomsday');
                        setCurrentStep(6);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ff2a85] hover:bg-[#ff3a95] text-white shadow-[0_0_12px_rgba(255,42,133,0.5)] transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Instant Auto-Create</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 mt-1">
                    Curated 15 Essential Multiverse & MCU Masterworks
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    property === 'doomsday'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {property === 'doomsday' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                X-Men, X2, The First Avenger, The Avengers, Infinity War, Endgame, Loki S1–S2, Shang-Chi, No Way Home, Wakanda Forever, Multiverse of Madness, Deadpool & Wolverine, Brave New World, Thunderbolts*, and First Steps.
              </p>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setProperty('doomsday');
                  setCurrentStep(6);
                }}
                className="mt-3.5 inline-flex items-center gap-2 text-xs font-bold text-[#ff2a85] hover:text-white transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tap here to immediately auto-generate this curated list!</span>
              </div>
            </div>

            {/* 2. Focus MCU (Sacred Timeline Canon) */}
            <div
              onClick={() => setProperty('mcu')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                property === 'mcu'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#201222] to-[#14101a] shadow-[0_0_20px_rgba(255,42,133,0.25)]'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Marvel Cinematic Universe
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Sacred Timeline Canon
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-300 mt-1">
                    The official Marvel Cinematic Universe canon timeline
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    property === 'mcu'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {property === 'mcu' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Complete mainline Marvel Cinematic Universe canon movies, Disney+ series & specials, Brand New Day, VisionQuest, and Phase 6 releases.
              </p>

              <div className="text-[11px] font-semibold text-[#ff2a85] mb-3">
                Total: 118 MCU Canon Titles (Enables Story Order!)
              </div>

              {/* Extra toggle for Cameos inside MCU option */}
              {property === 'mcu' && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddCameos(!addCameos);
                  }}
                  className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#ff2a85]" />
                    <span className="text-xs font-bold text-white">Add Cameo Movies?</span>
                    <span className="text-[10px] text-zinc-400">
                      (Raimi Spider-Man, Fox X-Men, Logan)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addCameos}
                    onChange={() => {}}
                    className="w-4 h-4 accent-[#ff2a85] rounded cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* 3. All Marvel Properties (Complete Marvel History) */}
            <div
              onClick={() => setProperty('all')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                property === 'all'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#201222] to-[#14101a] shadow-[0_0_20px_rgba(255,42,133,0.25)]'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      All Marvel Properties
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Complete Marvel History
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-300 mt-1">
                    Complete cinematic history including Fox, Sony, classic TV & animation
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    property === 'all'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {property === 'all' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                Every Marvel screen production from 1944 Captain America serial, 60s–90s animation, live-action classics, Fox/Sony multiverses, to modern MCU.
              </p>

              <div className="text-[11px] font-semibold text-purple-400">
                Total: 286 Master Properties
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (property === 'doomsday') {
                  setCurrentStep(6);
                } else {
                  setCurrentStep(4);
                }
              }}
              className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-bold shadow-[0_0_15px_rgba(255,42,133,0.35)] transition-all cursor-pointer"
            >
              <span>{property === 'doomsday' ? 'Generate Doomsday Order' : 'Continue to Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 4: Choose your Watch Order */}
      {/* ============================================================ */}
      {currentStep === 4 && (
        <div className="rounded-3xl bg-[#0a0a12] border border-zinc-800/80 p-6 sm:p-10 relative overflow-hidden">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#ff2a85] uppercase tracking-wider">
              Chronology & Roadmap
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Choose your Watch Order:
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
              How do you want your viewing roadmap sequenced?
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* 1. Release Order */}
            <div
              onClick={() => setOrder('release')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                order === 'release'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#201222] to-[#14101a] shadow-[0_0_20px_rgba(255,42,133,0.25)]'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Release Order
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ff2a85]/20 text-[#ff2a85] border border-[#ff2a85]/40">
                      The Theatrical Experience
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Watch every production in the order audiences originally experienced them, with naturally paced post-credit surprises.
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    order === 'release'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {order === 'release' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
            </div>

            {/* 2. Story Order (In-Universe Timeline) */}
            <div
              onClick={() => {
                if (property === 'mcu') {
                  setOrder('story');
                }
              }}
              className={`p-5 rounded-2xl border transition-all relative ${
                property !== 'mcu'
                  ? 'border-zinc-900 bg-zinc-950/30 opacity-60 cursor-not-allowed'
                  : order === 'story'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#201222] to-[#14101a] shadow-[0_0_20px_rgba(255,42,133,0.25)] cursor-pointer'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700 cursor-pointer'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Story Order
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      In-Universe Timeline
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Story Order (in-universe narrative timeline: Captain America: The First Avenger → Captain Marvel → Iron Man...) is exclusively available for Focus MCU.
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    order === 'story'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {order === 'story' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
            </div>

            {/* 3. Phanteress Order (Under Curation) */}
            <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/30 opacity-60 relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-zinc-300">Phanteress Order</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-950/60 text-purple-300 border border-purple-800/40">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Coming Soon · Under Curation</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Phanteress's custom narrative watch sequence is currently being curated and assembled. It will unlock automatically once the curated order is submitted!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(5)}
              className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-bold shadow-[0_0_15px_rgba(255,42,133,0.35)] transition-all cursor-pointer"
            >
              <span>Continue to Grouping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 5: List Layout & Organization */}
      {/* ============================================================ */}
      {currentStep === 5 && (
        <div className="rounded-3xl bg-[#0a0a12] border border-zinc-800/80 p-6 sm:p-10 relative overflow-hidden">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#ff2a85] uppercase tracking-wider">
              List Layout & Organization
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 font-serif uppercase">
              How would you like your list displayed?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
              Choose whether to categorize your watchlist into phases or view it as an unbroken marathon.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Option 1: By Phase */}
            <div
              onClick={() => setLayout('byphase')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                layout === 'byphase'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#201222] to-[#14101a] shadow-[0_0_20px_rgba(255,42,133,0.25)]'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#ff2a85]" />
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      [BY PHASE]
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Structured
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 mt-1">
                    Generate a list organized by Marvel Phases.
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    layout === 'byphase'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {layout === 'byphase' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Divides your watchlist into distinct chapters (Phase 1, Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Multiverse, and Upcoming) with phase header cards and progress counters.
              </p>
            </div>

            {/* Option 2: One Long List */}
            <div
              onClick={() => setLayout('onelonglist')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                layout === 'onelonglist'
                  ? 'border-[#ff2a85] bg-gradient-to-r from-[#201222] to-[#14101a] shadow-[0_0_20px_rgba(255,42,133,0.25)]'
                  : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-[#ff2a85]" />
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      [ONE LONG LIST]
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Continuous Stream
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 mt-1">
                    Just the list without phasing.
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    layout === 'onelonglist'
                      ? 'border-[#ff2a85] bg-[#ff2a85]'
                      : 'border-zinc-700'
                  }`}
                >
                  {layout === 'onelonglist' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Presents your entire watchlist as a single seamless numbered marathon from title 1 to the end, without phase divider banners.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
            <button
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(6)}
              className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white text-xs font-bold shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer"
            >
              <span>Generate My Order</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 6: Generation & Ready! */}
      {/* ============================================================ */}
      {currentStep === 6 && (
        <div className="rounded-3xl bg-[#0a0a12] border border-zinc-800/80 p-6 sm:p-10 relative overflow-hidden">
          {/* Top Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#ff2a85] uppercase tracking-wider">
                Generation Complete
              </span>
              <span className="text-xs font-mono font-bold text-[#ff2a85]">
                {genProgress}%
              </span>
            </div>

            {/* Glowing Progress bar */}
            <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-[#ff2a85] to-rose-400 shadow-[0_0_15px_rgba(255,42,133,0.6)] transition-all duration-150"
                style={{ width: `${genProgress}%` }}
              />
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Your Personalized Watchlist is Ready!
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              All {generatedItems.length} titles generated in your order (
              {property === 'doomsday'
                ? 'Road to Doomsday'
                : property === 'mcu'
                ? 'Marvel Cinematic Universe'
                : 'All Marvel Properties'}
              )!
            </p>
          </div>

          {/* Quick Config Summary Pill Card */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-850 mb-6 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-[#ff2a85]/15 border border-[#ff2a85]/30 text-[#ff2a85] font-semibold">
                {property === 'doomsday'
                  ? 'Doomsday (15 Titles)'
                  : property === 'mcu'
                  ? `Focus MCU (${generatedItems.length} Titles)`
                  : `All Properties (${generatedItems.length} Titles)`}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                {order === 'story' ? 'Story Order' : 'Release Order'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                {layout === 'byphase' ? 'By Phase' : 'One Long List'}
              </span>
            </div>

            <button
              onClick={() => setCurrentStep(3)}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer whitespace-nowrap"
            >
              Adjust Your Order
            </button>
          </div>

          {/* Titles Preview Scroll Box */}
          <div className="mb-6">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
              Watchlist Preview (First {Math.min(5, generatedItems.length)} of {generatedItems.length} Titles)
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar pr-1">
              {generatedItems.slice(0, 5).map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-850 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-[#ff2a85]">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                        {/* THE YEAR ON TITLES IS ADDED ON THE LIST OUTCOME */}
                        <span className="text-[#ff2a85] font-semibold">{item.year}</span>
                        <span>•</span>
                        <span>{item.runtime}</span>
                        <span>•</span>
                        <span className="truncate">{item.hero}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 shrink-0">
                    {item.mediaType === 'tv' ? 'Series' : item.mediaType === 'short' ? 'Short' : 'Movie'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-zinc-900">
            <button
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] text-white font-bold text-sm shadow-[0_0_25px_rgba(255,42,133,0.4)] transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>Start Watching</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs border border-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              Change Setup Options
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
