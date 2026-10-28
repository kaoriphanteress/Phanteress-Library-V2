import React, { useState } from 'react';
import { X, Check, SlidersHorizontal, Sparkles, Layers, ListOrdered, Film, Shield, Zap, Lock } from 'lucide-react';
import {
  MarvelOrderConfig,
  MarvelItem,
  FranchiseType,
  PropertySelection,
  WatchOrderType,
  DisplayLayoutType,
  getMarvelOrderItems
} from '../data/marvelData';

interface AdjustOrderModalProps {
  isOpen: boolean;
  currentConfig: MarvelOrderConfig;
  onClose: () => void;
  onApply: (newConfig: MarvelOrderConfig, newItems: MarvelItem[]) => void;
}

export const AdjustOrderModal: React.FC<AdjustOrderModalProps> = ({
  isOpen,
  currentConfig,
  onClose,
  onApply,
}) => {
  const [franchise] = useState<FranchiseType>('marvel');
  const [property, setProperty] = useState<PropertySelection>(currentConfig.property || 'doomsday');
  const [order, setOrder] = useState<WatchOrderType>(currentConfig.order || 'story');
  const [addCameos, setAddCameos] = useState<boolean>(currentConfig.addCameos ?? true);
  const [layout, setLayout] = useState<DisplayLayoutType>(currentConfig.layout || 'byphase');

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedConfig: MarvelOrderConfig = {
      ...currentConfig,
      franchise,
      property,
      order,
      addCameos,
      layout,
      generatedAt: new Date().toISOString(),
    };
    const newItems = getMarvelOrderItems(updatedConfig);
    onApply(updatedConfig, newItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0c0c14] border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-850 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ff2a85]/15 border border-[#ff2a85]/30 flex items-center justify-center text-[#ff2a85]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Adjust Watch Order</h2>
              <p className="text-xs text-zinc-400">All order customizations in one single view</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto space-y-5 py-4 pr-1 text-xs sm:text-sm">
          {/* 1. Franchise Choice */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Franchise Universe
              </label>
              <span className="text-[10px] text-zinc-500 font-medium">1 Active · 3 Upcoming</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'marvel' as FranchiseType, name: 'Marvel', icon: Shield, note: 'MCU & Multiverse', available: true },
                { id: 'dc' as FranchiseType, name: 'DC Universe', icon: Zap, note: 'DCEU & Elseworlds', available: false },
                { id: 'starwars' as FranchiseType, name: 'Star Wars', icon: Sparkles, note: 'Skywalker Saga', available: false },
                { id: 'wizarding' as FranchiseType, name: 'Wizarding', icon: Film, note: 'Harry Potter & Beasts', available: false },
              ].map((f) => {
                const Icon = f.icon;
                const active = f.available && franchise === f.id;

                if (!f.available) {
                  return (
                    <div
                      key={f.id}
                      aria-disabled="true"
                      className="flex items-center justify-between p-3 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-zinc-600 opacity-50 cursor-not-allowed select-none"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 shrink-0 text-zinc-600" />
                        <div className="min-w-0">
                          <div className="font-semibold text-zinc-400 text-xs truncate">{f.name}</div>
                          <div className="text-[10px] text-zinc-600 truncate">{f.note}</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Soon</span>
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={f.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      active
                        ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white shadow-[0_0_15px_rgba(255,42,133,0.2)]'
                        : 'border-zinc-850 bg-zinc-950/60 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#ff2a85]' : 'text-zinc-500'}`} />
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-xs">{f.name}</div>
                        <div className="text-[10px] text-zinc-400 truncate">{f.note}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#ff2a85] text-white shrink-0">
                      Active
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Scope / Properties Selection */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              Watchlist Scope
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'doomsday' as PropertySelection,
                  title: 'Road to Avengers: Doomsday',
                  desc: 'Key Multiverse events, Doctor Doom connections, X-Men & major Avengers pivots.',
                },
                {
                  id: 'mcu' as PropertySelection,
                  title: 'MCU Sacred Timeline Only',
                  desc: 'Official Marvel Studios canon releases across Phases 1 through 6.',
                },
                {
                  id: 'all' as PropertySelection,
                  title: 'All Marvel Properties (280+ Titles)',
                  desc: 'Complete cinematic library: Tobey/Andrew Spider-Man, Fox X-Men, Netflix Defenders, legacy animations.',
                },
              ].map((p) => {
                const active = property === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setProperty(p.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      active
                        ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white shadow-[0_0_15px_rgba(255,42,133,0.2)]'
                        : 'border-zinc-850 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      active ? 'border-[#ff2a85] bg-[#ff2a85]' : 'border-zinc-700'
                    }`}>
                      {active && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-xs">{p.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{p.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Sequence / Chronology */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              Viewing Chronology
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  id: 'story' as WatchOrderType,
                  title: 'Story Chronological',
                  desc: 'Events ordered by timeline chronology (starts with Captain America 1942)',
                },
                {
                  id: 'release' as WatchOrderType,
                  title: 'Theatrical Release',
                  desc: 'Ordered exactly as released in theaters (starts with Iron Man 2008)',
                },
              ].map((o) => {
                const active = order === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOrder(o.id)}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      active
                        ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white shadow-[0_0_12px_rgba(255,42,133,0.2)]'
                        : 'border-zinc-850 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-semibold text-white text-xs">{o.title}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5 leading-tight">{o.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Multiverse Cameos Toggle */}
          <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-850 flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white text-xs">Include Multiverse Cameos</div>
              <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                Adds Tobey/Andrew Spider-Man & X-Men films relevant to Secret Wars & Doomsday.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAddCameos(!addCameos)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                addCameos ? 'bg-[#ff2a85]' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  addCameos ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* 5. Display Layout Mode */}
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              Timeline Display Layout
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLayout('byphase')}
                className={`flex items-center gap-2 p-3 rounded-2xl border cursor-pointer text-left transition-all ${
                  layout === 'byphase'
                    ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white'
                    : 'border-zinc-850 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Layers className="w-4 h-4 text-[#ff2a85] shrink-0" />
                <div>
                  <div className="font-semibold text-white text-xs">By Phase / Era</div>
                  <div className="text-[10px] text-zinc-500">Grouped into MCU Phases</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLayout('onelonglist')}
                className={`flex items-center gap-2 p-3 rounded-2xl border cursor-pointer text-left transition-all ${
                  layout === 'onelonglist'
                    ? 'border-[#ff2a85] bg-[#ff2a85]/15 text-white'
                    : 'border-zinc-850 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <ListOrdered className="w-4 h-4 text-[#ff2a85] shrink-0" />
                <div>
                  <div className="font-semibold text-white text-xs">One Long List</div>
                  <div className="text-[10px] text-zinc-500">Single scrollable queue</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-zinc-850 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff3a95] hover:to-[#f54f6e] shadow-[0_0_15px_rgba(255,42,133,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save & Apply Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
