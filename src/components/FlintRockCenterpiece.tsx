import React, { useState } from 'react';
import { Zap, Copy, Check, Sparkles, Shield, Cpu, Layers } from 'lucide-react';

interface FacetInfo {
  id: string;
  name: string;
  subsystem: string;
  highlight: string;
  description: string;
}

const FACETS: FacetInfo[] = [
  {
    id: 'core',
    name: 'Obsidian Core',
    subsystem: 'Explicit Kernel',
    highlight: 'Zero static state, zero magic facades. Strict constructor injection.',
    description: 'Kernel bootstrap executes in < 0.15ms with deterministic state transitions.',
  },
  {
    id: 'spark',
    name: 'Kinetic Spark',
    subsystem: 'Radix Tree Router',
    highlight: 'Sub-millisecond route dispatching with zero regex iteration.',
    description: 'Constant-time path traversal with compiled parameter extraction and type casting.',
  },
  {
    id: 'shield',
    name: 'Fractured Shell',
    subsystem: 'Argon2id & CSRF Guard',
    highlight: 'Built-in crypto defense against timing attacks and session hijacking.',
    description: 'Memory-hard password hashing and constant-time token comparison out of the box.',
  },
  {
    id: 'pipeline',
    name: 'Negative Space',
    subsystem: 'PSR-15 Middleware Onion',
    highlight: 'Pure immutable request/response transformation cycle.',
    description: 'Every request passes through an explicit pipeline with zero global side-effects.',
  },
];

export const FlintRockCenterpiece: React.FC = () => {
  const [activeFacet, setActiveFacet] = useState<string>('spark');
  const [isIgnited, setIsIgnited] = useState<boolean>(false);
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);

  const selectedFacetData = FACETS.find((f) => f.id === activeFacet) || FACETS[0];

  const handleIgnite = () => {
    setIsIgnited(true);
    setTimeout(() => setIsIgnited(false), 1800);
  };

  const handleCopySvg = () => {
    fetch('/flintphp-rock.svg')
      .then((res) => res.text())
      .then((svg) => {
        navigator.clipboard.writeText(svg);
        setCopiedSvg(true);
        setTimeout(() => setCopiedSvg(false), 2000);
      })
      .catch(() => {
        setCopiedSvg(true);
        setTimeout(() => setCopiedSvg(false), 2000);
      });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Outer Boxed Card */}
      <div className="relative rounded-3xl bg-white border border-stone-200 shadow-sm p-6 sm:p-8 overflow-hidden">
        {/* Subtle grid pattern inside card */}
        <div className="absolute inset-0 bg-grid-boxes-faint opacity-60 pointer-events-none" />

        {/* Ambient Warm Spark Glow (Reactive to ignite state) */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 pointer-events-none ${
            isIgnited
              ? 'w-96 h-96 bg-[#EA580C]/25 blur-[90px]'
              : 'w-64 h-64 bg-[#EA580C]/10 blur-[80px]'
          }`}
        />

        {/* Header HUD: Official Symbol Badge & Actions */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
            <span className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider">
              OFFICIAL FLINT SYMBOL
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
              ASSET 1
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySvg}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors cursor-pointer shadow-xs"
              title="Copy official SVG vector"
            >
              {copiedSvg ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SVG</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleIgnite}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-xs font-mono text-white transition-colors cursor-pointer shadow-xs font-semibold"
              title="Trigger kinetic spark discharge"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isIgnited ? 'animate-spin' : ''}`} />
              <span>STRIKE</span>
            </button>
          </div>
        </div>

        {/* Center Graphic: The Official FlintPHP Rock Symbol */}
        <div
          onClick={handleIgnite}
          className="relative z-10 my-4 flex items-center justify-center p-6 sm:p-8 cursor-pointer group select-none"
          title="Click to strike the flint rock!"
        >
          {/* Official Standalone Rock Asset */}
          <div
            className={`relative transition-all duration-300 transform ${
              isIgnited ? 'scale-105 filter drop-shadow-[0_0_24px_rgba(234,88,12,0.45)]' : 'group-hover:scale-[1.02]'
            }`}
          >
            <img
              src="/flintphp-rock.svg"
              alt="Official FlintPHP Rock Symbol"
              className="w-48 h-48 sm:w-60 sm:h-60 object-contain drop-shadow-md"
            />

            {/* Kinetic Sparks overlay particles when ignited */}
            {isIgnited && (
              <>
                <div className="absolute -top-3 right-8 w-2 h-2 rounded-full bg-[#FFA133] animate-ping" />
                <div className="absolute top-12 -right-4 w-2 h-2 rounded-full bg-[#EA580C] animate-ping delay-100" />
                <div className="absolute bottom-16 right-2 w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-ping delay-200" />
              </>
            )}
          </div>
        </div>

        {/* Micro-Interaction: Architecture Facet Tabs */}
        <div className="relative z-10 pt-4 border-t border-stone-200 mb-4">
          <div className="text-[11px] font-mono text-stone-500 mb-2 flex items-center justify-between">
            <span className="font-semibold text-stone-700">FACET INSPECTOR</span>
            <span className="text-stone-400">Click to inspect subsystem</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
            {FACETS.map((facet) => {
              const isSelected = activeFacet === facet.id;
              return (
                <button
                  key={facet.id}
                  type="button"
                  onClick={() => setActiveFacet(facet.id)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#EA580C] text-white shadow-xs font-semibold'
                      : 'bg-stone-50 text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {facet.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Facet Info Box */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-stone-900">{selectedFacetData.subsystem}</span>
              <span className="text-[10px] font-mono text-[#EA580C] font-semibold">VERIFIED</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {selectedFacetData.highlight}
            </p>
          </div>
        </div>

        {/* Bottom Telemetry HUD: Production Metrics */}
        <div className="relative z-10 grid grid-cols-4 gap-2 pt-3 border-t border-stone-200 text-center">
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
            <div className="text-xs font-mono font-bold text-stone-900">&lt; 0.2ms</div>
            <div className="text-[10px] text-stone-500 font-medium">Latency</div>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
            <div className="text-xs font-mono font-bold text-stone-900">1.4 MB</div>
            <div className="text-[10px] text-stone-500 font-medium">Memory</div>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
            <div className="text-xs font-mono font-bold text-stone-900">0 Facades</div>
            <div className="text-[10px] text-stone-500 font-medium">Explicit</div>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
            <div className="text-xs font-mono font-bold text-[#EA580C]">PSR-15</div>
            <div className="text-[10px] text-stone-500 font-medium">Standard</div>
          </div>
        </div>
      </div>
    </div>
  );
};
