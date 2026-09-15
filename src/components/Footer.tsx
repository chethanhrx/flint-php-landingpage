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
            <a href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              {/* Official Logo Asset 2 */}
              <img
                src="/flintlogo2.png"
                alt="FlintPHP"
                className="h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </a>
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
                <a href="/docs/introduction"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'introduction'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Introduction
                </a>
              </li>
              <li>
                <a href="/docs/installation"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'installation'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Installation & Setup
                </a>
              </li>
              <li>
                <a href="/docs/first-application"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'first-application'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  First Application
                </a>
              </li>
              <li>
                <a href="/docs/project-structure"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'project-structure'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Project Structure
                </a>
              </li>
              <li>
                <a href="/docs/routing"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'routing'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Fast Routing
                </a>
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
                <a href="/docs/dependency-injection"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'dependency-injection'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Dependency Injection
                </a>
              </li>
              <li>
                <a href="/docs/middleware"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'middleware'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Middleware
                </a>
              </li>
              <li>
                <a href="/docs/database"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'database'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Database & PDO
                </a>
              </li>
              <li>
                <a href="/docs/orm"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'orm'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Data Mapper ORM
                </a>
              </li>
              <li>
                <a href="/docs/authentication"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'authentication'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Password Hashing
                </a>
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
                  <ExternalLink className="w-3 h-3 text-orange-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/flintphp/framework-skeleton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
                >
                  <span>Application Skeleton</span>
                  <ExternalLink className="w-3 h-3 text-orange-600" />
                </a>
              </li>
              <li>
                <a href="/docs/changelog"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'changelog'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Changelog & Releases
                </a>
              </li>
              <li>
                <a href="/docs/security"
                  onClick={(e) => { e.preventDefault(); onNavigate('docs', 'security'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Security Policy
                </a>
              </li>
              <li>
                <a href="/#no-magic"
                  onClick={(e) => { e.preventDefault(); onNavigate('home', 'no-magic'); }}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  No-Magic Manifesto
                </a>
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
            <span>PSR-11</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
