import React, { useState } from 'react';
import {
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Zap,
  Layers,
  BarChart3,
  Flame,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import { FlintRockCenterpiece } from './FlintRockCenterpiece';

interface HeroProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'composer create-project flintphp/skeleton my-app';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd).catch(() => alert('Copy failed — select the code manually.'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToBenchmarks = () => {
    const el = document.getElementById('benchmarks');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('home', 'benchmarks');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200 bg-grid-boxes">
      {/* Background ambient lighting and grid fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50/40 via-transparent to-stone-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-orange-500/12 via-amber-500/6 to-transparent blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Technical Positioning & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Row: Release Badge + Prominent Performance Telemetry Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-xs text-xs text-stone-600">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-600 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600" />
                </span>
                <span className="text-stone-900 font-mono font-semibold">FlintPHP v1.0.0</span>
                <span className="text-stone-300">|</span>
                <span className="text-stone-500">PHP 8.2+</span>
              </div>

              {/* Clickable Performance Banner Pill */}
              <button
                type="button"
                onClick={scrollToBenchmarks}
                className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/10 hover:bg-orange-600/15 border border-orange-600/30 text-xs font-mono text-orange-700 transition-all cursor-pointer shadow-xs"
              >
                <Flame className="w-3.5 h-3.5 text-orange-600" />
                <span className="font-bold">~15,200 req/s</span>
                <span className="text-stone-400">•</span>
                <span className="hidden sm:inline">Nginx + PHP-FPM</span>
                <ChevronRight className="w-3.5 h-3.5 text-orange-600 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Framework Name & Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.08] mb-4">
              The modern, fast PHP framework{' '}
              <span className="text-orange-600 block sm:inline">with no hidden magic.</span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed mb-6">
              FlintPHP is a high-performance, lightweight PHP framework designed for building scalable APIs. 
              As a powerful Laravel alternative, it features explicit constructor dependency injection,
              immutable HTTP primitives, and a hash-map routing engine for developers who demand{' '}
              <span className="font-semibold text-stone-900">maximum speed</span> and predictable behavior — 
              without facades or global state.
            </p>

            {/* Interactive Composer Installation Box */}
            <div className="w-full max-w-xl mb-7">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1.5 px-1">
                <span className="font-semibold text-stone-700">QUICK INSTALL</span>
                <span className="text-stone-400">composer require</span>
              </div>
              <div className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-stone-200 hover:border-stone-300 transition-all font-mono text-sm shadow-xs group">
                <div className="flex items-center gap-2.5 overflow-x-auto py-0.5 text-stone-900">
                  <span className="text-orange-600 select-none font-bold">$</span>
                  <span className="whitespace-nowrap font-medium">{installCmd}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors shrink-0 cursor-pointer"
                  title="Copy command to clipboard"
                  aria-label="Copy installation command"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-sans font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-sans font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action CTAs: Enhanced Hierarchy */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                type="button"
                onClick={() => onNavigate('docs', 'installation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base font-semibold shadow-[0_4px_16px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.4)] transition-all duration-200 cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={scrollToBenchmarks}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 hover:text-stone-900 text-sm sm:text-base font-semibold border-2 border-orange-600/30 hover:border-orange-600 shadow-xs transition-all cursor-pointer group"
              >
                <BarChart3 className="w-4 h-4 text-orange-600" />
                <span>View Benchmarks</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-orange-600/10 text-orange-600 font-mono font-bold">
                  ~15k req/s
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('docs')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 text-sm sm:text-base font-medium border border-stone-200 shadow-xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-stone-500" />
                <span>Docs</span>
              </button>
            </div>

            {/* 4 Standout Micro Telemetry Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-stone-200 w-full max-w-xl text-left">
              <div className="p-2.5 rounded-lg bg-white/70 border border-stone-200/80">
                <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">THROUGHPUT</div>
                <div className="text-base font-mono font-bold text-stone-900">~15,200 <span className="text-xs text-orange-600">req/s</span></div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-stone-200/80">
                <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">WITH DB</div>
                <div className="text-base font-mono font-bold text-stone-900">~5,500 <span className="text-xs text-orange-600">req/s</span></div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-stone-200/80">
                <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">PHP</div>
                <div className="text-base font-mono font-bold text-emerald-600">8.2+</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 border border-stone-200/80">
                <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">CONTAINER</div>
                <div className="text-base font-mono font-bold text-stone-900">PSR-11</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Craft FlintPHP Official Rock Symbol Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <FlintRockCenterpiece />
          </div>
        </div>
      </div>
    </section>
  );
};
