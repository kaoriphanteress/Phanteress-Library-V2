import React from 'react';
import { ClipboardList, Sparkles, MessageSquare, CheckCircle2, Plus } from 'lucide-react';

export const OrderView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <ClipboardList className="w-7 h-7 text-[#ff2a85]" />
          <span>Order</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Reserved staging workspace for your upcoming custom requests and modules.
        </p>
      </div>

      {/* Styled Staging Slate */}
      <div className="relative rounded-2xl bg-[#0c0c14] border border-dashed border-zinc-800 p-8 sm:p-14 text-center flex flex-col items-center justify-center overflow-hidden">
        {/* Pink Glow Accent */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#ff2a85]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#ff2a85]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#161622] to-[#201524] border border-[#ff2a85]/30 flex items-center justify-center text-[#ff2a85] mb-5 shadow-[0_0_20px_rgba(255,42,133,0.25)]">
          <ClipboardList className="w-8 h-8" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          This Canvas is Ready for You
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mb-8 leading-relaxed">
          As requested, this tab is currently an empty staging canvas. Send over your items, custom order list, or specifications whenever you're ready, and I will implement them directly here.
        </p>

        {/* Capacity / Limit Reassurance Card */}
        <div className="w-full max-w-md p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-left mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#ff2a85]" />
            <span>No Request Limits</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            You are <strong className="text-zinc-200">not up to any limit</strong>! You can continue requesting as many features, modules, visual changes, or data workflows as you wish.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-[#ff2a85]" />
          <span>Awaiting your instructions in chat</span>
        </div>
      </div>
    </div>
  );
};
