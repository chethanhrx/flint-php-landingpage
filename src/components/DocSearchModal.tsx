import React, { useState, useEffect, useRef } from 'react';
import { DOCS_DATA, DocPage } from '../data/docsContent';
import { Search, X, ChevronRight, Hash, Code, BookOpen } from 'lucide-react';

interface DocSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoc: (slug: string) => void;
}

export const DocSearchModal: React.FC<DocSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoc,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Cmd+K & Escape shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open from parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Flatten all pages
  const allPages = DOCS_DATA.flatMap((cat) => cat.pages);

  // Filtered results
  const results = query.trim() === ''
    ? allPages.slice(0, 6)
    : allPages.filter((page) => {
        const q = query.toLowerCase();
        const matchesTitle = page.title.toLowerCase().includes(q);
        const matchesDesc = page.description.toLowerCase().includes(q);
        const matchesCategory = page.category.toLowerCase().includes(q);
        const matchesSection = page.content.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            (s.text && s.text.toLowerCase().includes(q))
        );
        return matchesTitle || matchesDesc || matchesCategory || matchesSection;
      });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 bg-stone-50/70">
          <Search className="w-5 h-5 text-[#EA580C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, API references, or guides..."
            className="w-full bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-white border border-stone-200 rounded text-stone-500 shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-stone-100 bg-white">
          {results.length > 0 ? (
            results.map((page) => (
              <button
                key={page.slug}
                type="button"
                onClick={() => {
                  onSelectDoc(page.slug);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-stone-50 transition-colors flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#EA580C] px-1.5 py-0.5 rounded bg-orange-50 border border-orange-200 font-semibold">
                      {page.category}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {page.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#EA580C] transition-colors">
                    {page.title}
                  </h4>
                  <p className="text-xs text-stone-500 truncate mt-0.5">
                    {page.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-sm text-stone-500">
              No documentation pages found for <span className="text-stone-900 font-mono font-medium">"{query}"</span>.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <span>FlintPHP v1.0.0 Documentation</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
