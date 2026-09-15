import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsFlintPHP } from './components/WhatIsFlintPHP';
import { FirstThirtySeconds } from './components/FirstThirtySeconds';
import { BenchmarkSection } from './components/BenchmarkSection';
import { ComparisonSection } from './components/ComparisonSection';
import { FaqSection } from './components/FaqSection';
import { QuickStart } from './components/QuickStart';
import { NoMagicSection } from './components/NoMagicSection';
import { ArchitectureVisualization } from './components/ArchitectureVisualization';
import { RouteMatcherSandbox } from './components/RouteMatcherSandbox';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { CodeExamplesSection } from './components/CodeExamplesSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { DocumentationView } from './components/DocumentationView';
import { DocSearchModal } from './components/DocSearchModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'docs'>('home');
  const [activeDocSlug, setActiveDocSlug] = useState<string>('introduction');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll to top on load and sync with History API
  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleLocationChange = () => {
      const path = window.location.pathname;
      
      // Fallback for old hash URLs just in case
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('docs/')) {
        const slug = hash.replace('docs/', '');
        window.history.replaceState({}, '', `/docs/${slug}`);
        setCurrentView('docs');
        setActiveDocSlug(slug);
        return;
      }
      
      if (path.startsWith('/docs')) {
        setCurrentView('docs');
        // Extract the slug from the path (e.g., /docs/routing or /docs/core/routing)
        const slug = path.replace(/^\/docs\/?/, '') || 'introduction';
        setActiveDocSlug(slug);
      } else {
        setCurrentView('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: 'home' | 'docs', docSlug?: string) => {
    setCurrentView(view);
    if (view === 'docs') {
      const targetSlug = docSlug || activeDocSlug || 'introduction';
      setActiveDocSlug(targetSlug);
      window.history.pushState({}, '', `/docs/${targetSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectDocFromSearch = (slug: string) => {
    setActiveDocSlug(slug);
    setCurrentView('docs');
    setIsSearchOpen(false);
    window.history.pushState({}, '', `/docs/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Universal Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Switcher */}
      {currentView === 'home' ? (
        <main className="flex-1">
          {/* 1. Hero — Clear positioning */}
          <Hero onNavigate={handleNavigate} />

          {/* 2. What is FlintPHP — AEO/GEO optimized definition */}
          <WhatIsFlintPHP onNavigate={handleNavigate} />

          {/* 3. Benchmarks — Accurate + trustworthy */}
          <BenchmarkSection />

          {/* 4. Comparison — Laravel vs Slim vs FlintPHP */}
          <ComparisonSection />

          {/* 5. FAQ — High AEO value */}
          <FaqSection />

          {/* 6. First 30 Seconds — Quick answers */}
          <FirstThirtySeconds onNavigate={handleNavigate} />

          {/* 7. Quick Start — Getting started */}
          <QuickStart onNavigate={handleNavigate} />

          {/* 8. Philosophy — No Magic */}
          <NoMagicSection />

          {/* 9. Architecture — Explicit Composition */}
          <ArchitectureVisualization />

          {/* 10. Routing — Interactive Sandbox */}
          <RouteMatcherSandbox />

          {/* 11. Code Examples */}
          <CodeExamplesSection />

          {/* 12. CLI Terminal */}
          <InteractiveTerminal />

          {/* 13. Capabilities */}
          <CapabilitiesSection onNavigate={handleNavigate} />
        </main>
      ) : (
        <div className="flex-1">
          <DocumentationView
            activeSlug={activeDocSlug}
            onSelectSlug={(slug) => handleNavigate('docs', slug)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onBackToHome={() => handleNavigate('home')}
          />
        </div>
      )}

      {/* Global Command / Search Palette */}
      <DocSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDoc={handleSelectDocFromSearch}
      />

      {/* Official Footer with Asset 2 */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
