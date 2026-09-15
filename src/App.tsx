import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FirstThirtySeconds } from './components/FirstThirtySeconds';
import { QuickStart } from './components/QuickStart';
import { NoMagicSection } from './components/NoMagicSection';
import { ArchitectureVisualization } from './components/ArchitectureVisualization';
import { RouteMatcherSandbox } from './components/RouteMatcherSandbox';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { CodeExamplesSection } from './components/CodeExamplesSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { BenchmarkSection } from './components/BenchmarkSection';
import { DocumentationView } from './components/DocumentationView';
import { DocSearchModal } from './components/DocSearchModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'docs'>('home');
  const [activeDocSlug, setActiveDocSlug] = useState<string>('introduction');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync with window.location.hash for shareable links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('docs/')) {
        const slug = hash.replace('docs/', '');
        setCurrentView('docs');
        setActiveDocSlug(slug);
      } else if (hash === 'docs') {
        setCurrentView('docs');
      } else if (hash) {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
      window.location.hash = `docs/${targetSlug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectDocFromSearch = (slug: string) => {
    setActiveDocSlug(slug);
    setCurrentView('docs');
    setIsSearchOpen(false);
    window.location.hash = `docs/${slug}`;
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
          {/* Primary Hero with 3D Flint Rock Asset 1 */}
          <Hero onNavigate={handleNavigate} />

          {/* First 30 Seconds Checklist (9 Essential Questions) */}
          <FirstThirtySeconds onNavigate={handleNavigate} />

          {/* Head-to-Head Transparent Performance Benchmarks (Authoritative Evidence) */}
          <BenchmarkSection />

          {/* Quick Start 4-Step Flow & Working API Preview */}
          <QuickStart onNavigate={handleNavigate} />

          {/* "No Magic" Core Philosophy & Code Comparison */}
          <NoMagicSection />

          {/* Interactive Architecture Flow (Explicit Composition) */}
          <ArchitectureVisualization />

          {/* Radix Tree Route Matcher & Pipeline Dispatcher Sandbox */}
          <RouteMatcherSandbox />

          {/* Real Code Examples (12 Essential PHP Samples) */}
          <CodeExamplesSection />

          {/* Live Interactive Flint CLI Terminal */}
          <InteractiveTerminal />

          {/* Structured Framework Capabilities */}
          <CapabilitiesSection onNavigate={handleNavigate} />
        </main>
      ) : (
        <div className="flex-1">
          <DocumentationView
            initialSlug={activeDocSlug}
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
