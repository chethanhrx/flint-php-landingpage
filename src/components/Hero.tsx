import React, { useState } from 'react';
import { Copy, Check, ArrowRight, BookOpen, ShieldCheck, Zap, Layers } from 'lucide-react';
import { FlintRockCenterpiece } from './FlintRockCenterpiece';

interface HeroProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'composer create-project flintphp/skeleton my-app';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200 bg-grid-boxes">
      {/* Background ambient lighting and grid fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50/40 via-transparent to-stone-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Technical Positioning & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Release Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-xs text-xs text-stone-600 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EA580C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA580C]" />
              </span>
              <span className="text-stone-900 font-mono font-semibold">FlintPHP v1.0.0</span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500">Stable Release</span>
              <span className="text-stone-300">|</span>
              <span className="text-[#EA580C] font-mono font-medium">PHP 8.2+</span>
            </div>

            {/* Framework Name & Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1] mb-4">
              Build PHP without the <span className="text-[#EA580C]">magic.</span>
            </h1>

            {/* Core Value Pillars */}
            <div className="flex items-center gap-3 text-lg sm:text-xl font-mono font-bold text-stone-800 mb-5">
              <span className="text-[#EA580C]">Fast.</span>
              <span className="text-stone-300">•</span>
              <span>Secure.</span>
              <span className="text-stone-300">•</span>
              <span className="text-[#EA580C]">Explicit.</span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed mb-8">
              A modern PHP framework for building production-ready APIs and web applications.
              Built on explicit composition, immutable HTTP foundations, and zero global static facades.
            </p>

            {/* Interactive Composer Installation Box */}
            <div className="w-full max-w-xl mb-8">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1.5 px-1">
                <span className="font-semibold text-stone-700">QUICK INSTALL</span>
                <span className="text-stone-400">skeleton v1.0.0</span>
              </div>
              <div className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-stone-200 hover:border-stone-300 transition-all font-mono text-sm shadow-xs group">
                <div className="flex items-center gap-2.5 overflow-x-auto py-0.5 text-stone-900">
                  <span className="text-[#EA580C] select-none font-bold">$</span>
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

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('docs', 'installation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm sm:text-base font-semibold shadow-[0_2px_10px_rgba(234,88,12,0.25)] transition-all duration-200 cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('docs')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-sm sm:text-base font-semibold border border-stone-200 shadow-xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#EA580C]" />
                <span>Documentation</span>
              </button>
            </div>

            {/* Micro Feature Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-stone-200 w-full max-w-xl text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span className="font-medium">Radix-Tree Routing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span className="font-medium">Argon2id & Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span className="font-medium">Data Mapper ORM</span>
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
