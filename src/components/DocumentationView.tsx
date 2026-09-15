import React, { useState, useMemo } from 'react';
import { DOCS_DATA, DocPage, DocCategory } from '../data/docsContent';
import {
  Search,
  BookOpen,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Clock,
  Tag,
  Menu,
  X,
  ExternalLink,
  Code2,
  HelpCircle,
  Hash,
  Share2,
} from 'lucide-react';

interface DocumentationViewProps {
  activeSlug?: string;
  onSelectSlug?: (slug: string) => void;
  onOpenSearch: () => void;
  onBackToHome: () => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  activeSlug,
  onSelectSlug,
  onOpenSearch,
  onBackToHome,
}) => {
  // Flatten all pages for easy lookup & prev/next calculation
  const allPages = useMemo(() => {
    return DOCS_DATA.flatMap((cat) => cat.pages);
  }, []);

  
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Active page
  const currentPage = useMemo(() => {
    return allPages.find((p) => p.slug === activeSlug) || allPages[0];
  }, [allPages, activeSlug]);

  // Active category
  const currentCategory = useMemo(() => {
    return DOCS_DATA.find((cat) =>
      cat.pages.some((p) => p.slug === currentPage.slug)
    );
  }, [currentPage]);

  // Index in flat list for Prev / Next
  const currentIndex = useMemo(() => {
    return allPages.findIndex((p) => p.slug === currentPage.slug);
  }, [allPages, currentPage]);

  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const handleSelectPage = (slug: string) => {
    if (onSelectSlug) onSelectSlug(slug);
    setMobileSidebarOpen(false);
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code).catch(() => alert('Copy failed — select the code manually.'));
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      {/* Docs Top Action Bar (Mobile Hamburger + Breadcrumb bar) */}
      <div className="lg:hidden sticky top-16 z-30 flex items-center justify-between px-4 py-2.5 bg-white border-b border-stone-200 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
        >
          <Menu className="w-4 h-4 text-orange-600" />
          <span>Documentation Menu</span>
        </button>
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 text-xs font-medium text-stone-700 border border-stone-200 cursor-pointer shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-orange-600" />
          <span>Search</span>
        </button>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex">
        {/* Persistent Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 py-8 pr-6 border-r border-stone-200 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Quick Filter / Search Trigger */}
          <div className="mb-6">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-stone-200 hover:border-stone-300 text-xs text-stone-500 hover:text-stone-900 transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-orange-600" />
                <span>Search docs...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-stone-100 rounded border border-stone-200 text-stone-600">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Categories */}
          <div className="space-y-6">
            {DOCS_DATA.map((category) => (
              <div key={category.id}>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-2 px-2">
                  {category.name}
                </h4>
                <ul className="space-y-0.5">
                  {category.pages.map((page) => {
                    const isActive = page.slug === currentPage.slug;
                    return (
                      <li key={page.slug}>
                        <button
                          type="button"
                          onClick={() => handleSelectPage(page.slug)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                            isActive
                              ? 'bg-orange-50 text-orange-600 font-semibold border-l-2 border-orange-600'
                              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                          }`}
                        >
                          <span className="truncate">{page.title}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile Drawer Navigation */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-white border-r border-stone-200 p-5 overflow-y-auto h-full z-10 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                  <span className="text-xs font-mono font-bold text-stone-900">Documentation</span>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-md text-stone-500 hover:text-stone-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  {DOCS_DATA.map((category) => (
                    <div key={category.id}>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold mb-2">
                        {category.name}
                      </h4>
                      <ul className="space-y-1">
                        {category.pages.map((page) => {
                          const isActive = page.slug === currentPage.slug;
                          return (
                            <li key={page.slug}>
                              <button
                                type="button"
                                onClick={() => handleSelectPage(page.slug)}
                                className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors ${
                                  isActive
                                    ? 'bg-orange-600 text-white font-semibold'
                                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                                }`}
                              >
                                {page.title}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 text-xs font-mono text-stone-500">
                FlintPHP v1.0.0
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 py-8 lg:pl-10 lg:pr-8 max-w-4xl min-w-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-medium">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-stone-900 cursor-pointer"
            >
              Docs
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-600">{currentPage.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-orange-600 font-semibold">{currentPage.title}</span>
          </nav>

          {/* Page Title & Meta */}
          <div className="border-b border-stone-200 pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200 font-semibold shadow-xs">
                <Tag className="w-3 h-3" />
                <span>v1.0.0</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500">
                <Clock className="w-3 h-3" />
                <span>{currentPage.readTime}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-4">
              {currentPage.title}
            </h1>

            {/* Lead Paragraph */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {currentPage.content.lead}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {currentPage.content.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2 group">
                  <Hash className="w-4 h-4 text-orange-600 opacity-70 group-hover:opacity-100" />
                  <span>{section.heading}</span>
                </h2>

                {section.text && (
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {section.text}
                  </p>
                )}

                {/* Bullet points */}
                {section.bulletPoints && (
                  <ul className="space-y-2 text-sm text-stone-600 pl-2">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-orange-600 font-mono mt-0.5 font-bold">•</span>
                        <span className="leading-relaxed">{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Code Block with Copy Button */}
                {section.codeBlock && (
                  <div className="rounded-xl bg-stone-900 border border-stone-800 overflow-hidden shadow-lg my-4">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181B] border-b border-stone-800">
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                        <Code2 className="w-3.5 h-3.5 text-orange-600" />
                        <span>{section.codeBlock.filename || section.codeBlock.language}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(section.codeBlock!.code, sIdx)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                      >
                        {copiedCodeIndex === sIdx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-sans font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="font-sans">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 sm:p-5 bg-[#0C0A09] font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-stone-200">
                      <pre className="text-stone-200">{section.codeBlock.code}</pre>
                    </div>
                  </div>
                )}

                {/* Table if present */}
                {section.table && (
                  <div className="rounded-xl border border-stone-200 overflow-hidden my-4 shadow-xs">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-stone-100 border-b border-stone-200 text-stone-800 font-semibold">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 bg-white">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-stone-50">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3.5 ${
                                  cIdx === 0
                                    ? 'text-orange-600 font-bold'
                                    : 'text-stone-600 font-sans'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Previous / Next Navigation */}
          <div className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPage ? (
              <button
                type="button"
                onClick={() => handleSelectPage(prevPage.slug)}
                className="p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-xs transition-all text-left group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500 mb-1">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  <span>PREVIOUS</span>
                </div>
                <div className="text-sm font-semibold text-stone-900 group-hover:text-orange-600 transition-colors truncate">
                  {prevPage.title}
                </div>
              </button>
            ) : <div />}

            {nextPage ? (
              <button
                type="button"
                onClick={() => handleSelectPage(nextPage.slug)}
                className="p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-xs transition-all text-right group cursor-pointer sm:col-start-2 shadow-xs"
              >
                <div className="flex items-center justify-end gap-1 text-[11px] font-mono text-stone-500 mb-1">
                  <span>NEXT</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-sm font-semibold text-stone-900 group-hover:text-orange-600 transition-colors truncate">
                  {nextPage.title}
                </div>
              </button>
            ) : <div />}
          </div>
        </main>
      </div>
    </div>
  );
};
