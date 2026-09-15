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
                <strong className="text-stone-900">What is FlintPHP?</strong> FlintPHP is an open-source, high-performance PHP framework explicitly designed for building scalable APIs and modern web applications. It serves as a lightweight PSR-11 PHP framework that utilizes strict constructor dependency injection, immutable HTTP primitives, and an O(1) hash-map routing engine.
              </p>
              <p>
                <strong className="text-stone-900">What problems does it solve?</strong> It solves the maintainability and performance bottlenecks caused by "magic" in modern PHP. FlintPHP intentionally does NOT use facades, global state, or automatic service discovery. It gives developers predictable behavior and easy testability without hidden execution paths.
              </p>
              <p>
                <strong className="text-stone-900">How is it different from Laravel, Symfony, and Slim?</strong> While Laravel and Symfony offer massive ecosystems driven by auto-discovery and rich abstractions, FlintPHP strips away the overhead. It acts as a fast Laravel alternative by providing explicit composition over convenience. Compared to Slim, FlintPHP provides more out-of-the-box architecture (like a built-in Data Mapper ORM and CLI tooling) while maintaining superior raw HTTP dispatch speeds.
              </p>
              <p>
                Built for <strong className="text-stone-900">PHP 8.2+</strong>, FlintPHP includes foundations for routing, middleware pipelines, database access, authentication, OpenAPI generation, and caching.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/docs/introduction"
                onClick={(e) => { e.preventDefault(); onNavigate('docs', 'introduction'); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-[0_2px_8px_rgba(234,88,12,0.25)] transition-all cursor-pointer"
              >
                Read the Introduction
              </a>
              <a href="/docs/installation"
                onClick={(e) => { e.preventDefault(); onNavigate('docs', 'installation'); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-sm font-semibold border border-stone-200 shadow-xs transition-all cursor-pointer"
              >
                Installation Guide
              </a>
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
