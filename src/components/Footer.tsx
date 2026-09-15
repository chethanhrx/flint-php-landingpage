import React from 'react';
import { Github, ExternalLink, Terminal, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-stone-200 bg-white text-stone-600 pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-200">
          {/* Brand Column with Official Logo (Asset 2) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              {/* Official Logo Asset 2 */}
              <img
                src="/flintphp-logo.svg"
                alt="FlintPHP Official Logo"
                className="h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </button>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed">
              A fast, secure, modern PHP framework designed from first principles. Explicit composition over magic, immutable HTTP foundations, and zero static facades.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/flintphp/framework"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-colors shadow-xs"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <div className="px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700 font-medium">
                <span>v1.0.0 Stable</span>
              </div>
            </div>
          </div>

          {/* Documentation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
              Documentation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'introduction')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Introduction
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'installation')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Installation & Setup
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'first-application')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  First Application
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'project-structure')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Project Structure
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'routing')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Radix Routing
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Core */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'dependency-injection')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Dependency Injection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'middleware')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  PSR-15 Middleware
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'database')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Database & PDO
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'orm')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Data Mapper ORM
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'authentication')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Argon2id Security
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
              Open Source
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/flintphp/framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
                >
                  <span>Framework Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#EA580C]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/flintphp/skeleton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
                >
                  <span>Application Skeleton</span>
                  <ExternalLink className="w-3 h-3 text-[#EA580C]" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'changelog')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Changelog & Releases
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs', 'security')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Security Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'no-magic')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  No-Magic Manifesto
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <div>
            © {new Date().getFullYear()} FlintPHP. Released under the permissive{' '}
            <span className="text-stone-900 font-semibold">MIT License</span>.
          </div>
          <div className="flex items-center gap-4">
            <span>Requires PHP 8.2+</span>
            <span>•</span>
            <span>PSR-7, PSR-11, PSR-15</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
