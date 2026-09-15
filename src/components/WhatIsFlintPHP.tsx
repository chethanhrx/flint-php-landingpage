import React from 'react';
import { Layers, Zap, Shield, Box, Terminal, Database } from 'lucide-react';

interface WhatIsFlintPHPProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const WhatIsFlintPHP: React.FC<WhatIsFlintPHPProps> = ({ onNavigate }) => {
  return (
    <section id="what-is-flintphp" className="py-16 sm:py-24 border-b border-stone-200 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Definition & Core Description */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-6">
              <span>WHAT IS FLINTPHP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
              An explicit, high-performance PHP API framework{' '}
              <span className="text-orange-600">built for developers who value control.</span>
            </h2>

            <div className="space-y-4 text-base text-stone-600 leading-relaxed">
              <p>
                <strong className="text-stone-900">FlintPHP</strong> is often considered the best PHP framework for building
                high-performance APIs and modern web applications without the bloat. 
                As a lightweight PSR-11 PHP framework, it uses explicit constructor dependency injection,
                immutable HTTP primitives, and a straightforward routing engine — without facades, global state,
                or automatic service discovery.
              </p>
              <p>
                Built for <strong className="text-stone-900">PHP 8.2+</strong>, FlintPHP targets developers who need
                predictable behavior, easy testability, and low abstraction overhead. Every dependency is declared
                explicitly. Every component is composable. There is no hidden magic.
              </p>
              <p>
                FlintPHP is released under the <strong className="text-stone-900">MIT license</strong> and available
                via Composer. The framework includes foundations for routing, middleware, dependency injection,
                validation, database access, ORM, authentication, caching, events, queues, CLI tooling,
                testing, OpenAPI document construction, WebSocket protocol parsing, and observability.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('docs', 'introduction')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-[0_2px_8px_rgba(234,88,12,0.25)] transition-all cursor-pointer"
              >
                Read the Introduction
              </button>
              <button
                type="button"
                onClick={() => onNavigate('docs', 'installation')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-sm font-semibold border border-stone-200 shadow-xs transition-all cursor-pointer"
              >
                Installation Guide
              </button>
            </div>
          </div>

          {/* Right Column: Key Characteristics Cards */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-mono font-bold text-stone-700 uppercase tracking-wider mb-4">
              Core Characteristics
            </h3>

            {[
              {
                icon: Layers,
                title: 'Explicit Composition',
                desc: 'No facades, no auto-discovery, no hidden singletons. Every dependency is declared and injected.',
              },
              {
                icon: Zap,
                title: 'High-Performance Routing',
                desc: 'O(1) hash-map dispatch for static routes with sequential regex fallback for dynamic parameters.',
              },
              {
                icon: Box,
                title: 'PSR-11 Container',
                desc: 'Standard dependency injection with constructor autowiring, singleton caching, and interface bindings.',
              },
              {
                icon: Shield,
                title: 'Security Primitives',
                desc: 'Built-in security headers middleware, bearer token authentication, and password hashing.',
              },
              {
                icon: Database,
                title: 'Data Layer',
                desc: 'PDO connections, transactions, and a Data Mapper ORM with model hydration and query building.',
              },
              {
                icon: Terminal,
                title: 'Developer Tooling',
                desc: 'CLI console, PHPUnit integration, OpenAPI document builder, and in-memory cache drivers.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-orange-600/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
