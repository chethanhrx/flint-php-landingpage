import React, { useState } from 'react';
import { Search, Github, Menu, X, Terminal, ExternalLink, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'docs';
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'docs', anchorId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view);
    if (view === 'home' && anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Official FlintPHP Logo (Asset 2) */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded-md transition-transform"
            aria-label="FlintPHP Home"
          >
            {/* Official Logo Asset 2 */}
            <img
              src="/flintphp-logo.svg"
              alt="FlintPHP Logo"
              className="h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            />
          </button>

          {/* Version Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-stone-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            <span className="text-stone-900 font-semibold">v1.0.0</span>
            <span className="text-stone-300">•</span>
            <span className="text-[11px] text-stone-500">PHP 8.2+</span>
          </div>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-600">
          <button
            type="button"
            onClick={() => handleNavClick('docs')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentView === 'docs'
                ? 'bg-stone-100 text-[#EA580C] font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-100/70'
            }`}
          >
            Docs
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'quick-start')}
            className="px-3 py-1.5 rounded-lg hover:text-stone-900 hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            Quick Start
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'architecture')}
            className="px-3 py-1.5 rounded-lg hover:text-stone-900 hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            Architecture
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'routing')}
            className="px-3 py-1.5 rounded-lg hover:text-stone-900 hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            Router
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'terminal')}
            className="px-3 py-1.5 rounded-lg hover:text-stone-900 hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            CLI Console
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'benchmarks')}
            className="px-3 py-1.5 rounded-lg hover:text-stone-900 hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            Benchmarks
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'no-magic')}
            className="px-3 py-1.5 rounded-lg hover:text-stone-900 hover:bg-stone-100/70 transition-colors cursor-pointer"
          >
            Philosophy
          </button>
        </nav>

        {/* Right: Search + GitHub + Get Started CTA */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/70 border border-stone-200 text-xs text-stone-600 hover:text-stone-900 transition-all group cursor-pointer"
            aria-label="Search documentation"
          >
            <Search className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-stone-200 rounded text-stone-500 shadow-xs">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/flintphp/framework"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-colors"
            title="FlintPHP on GitHub"
            aria-label="FlintPHP GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => handleNavClick('docs', 'installation')}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-semibold shadow-[0_1px_3px_rgba(234,88,12,0.3)] transition-all duration-200 cursor-pointer"
          >
            <span>Get Started</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-xs font-mono font-medium text-stone-600">FlintPHP Framework</span>
            <span className="text-xs font-mono text-[#EA580C] bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md font-semibold">
              v1.0.0 Stable
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleNavClick('docs')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-900 hover:bg-stone-100"
          >
            Documentation
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'quick-start')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            Quick Start
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'routing')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            Radix Router Sandbox
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'terminal')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            Interactive CLI Terminal
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'benchmarks')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            Performance Benchmarks
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('home', 'no-magic')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            Philosophy (No Magic)
          </button>
          <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
            <a
              href="https://github.com/flintphp/framework"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900"
            >
              <Github className="w-4 h-4" />
              <span>GitHub (flintphp/framework)</span>
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('docs', 'installation')}
              className="px-3 py-1.5 rounded-lg bg-[#EA580C] text-white text-xs font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
