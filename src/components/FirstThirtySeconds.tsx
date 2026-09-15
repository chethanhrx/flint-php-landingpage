import React, { useState } from 'react';
import {
  HelpCircle,
  Code2,
  Cpu,
  Terminal,
  FileCode2,
  FolderGit2,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';

interface FirstThirtySecondsProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const FirstThirtySeconds: React.FC<FirstThirtySecondsProps> = ({ onNavigate }) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const items = [
    {
      id: 1,
      question: 'What FlintPHP is',
      summary: 'A fast, secure, modern PHP framework for building fast APIs and web services.',
      detail:
        'FlintPHP provides an explicit, typed foundation for modern PHP 8.2+ developers who need raw speed, strict architecture, and maintainability without relying on framework magic.',
      icon: Cpu,
      badge: 'Definition',
      actionText: 'Read Architecture',
      actionTarget: () => onNavigate('home', 'architecture'),
    },
    {
      id: 2,
      question: 'Why it exists',
      summary: 'To eliminate facades, global state, and unpredictable magical behaviors from PHP backends.',
      detail:
        'Mainstream PHP frameworks prioritize convenience by hiding behavior behind magic methods, dynamic resolution, and global static facades. FlintPHP exists for engineering teams that value clarity, composability, and direct predictability.',
      icon: HelpCircle,
      badge: 'Purpose',
      actionText: 'See Comparison',
      actionTarget: () => onNavigate('home', 'no-magic'),
    },
    {
      id: 3,
      question: 'What makes it different',
      summary: 'Explicit composition over magic. Every dependency is declared and injected.',
      detail:
        'No magic container singletons behind static calls. No auto-discovered hidden listeners. Your code reads like standard, clean, object-oriented PHP with zero surprises during debugging or unit testing.',
      icon: CheckCircle2,
      badge: 'Philosophy',
      actionText: 'Explore Principles',
      actionTarget: () => onNavigate('home', 'no-magic'),
    },
    {
      id: 4,
      question: 'How fast it runs (15,200 req/s)',
      summary: '~15,200 req/s raw HTTP dispatch, ~5,500 req/s with PDO, and an ultra-lean 1.4 MB memory footprint.',
      detail:
        'Independent bare-metal AMD EPYC benchmarks verify that FlintPHP is 2.2× faster than Slim, 5.6× faster than Symfony, and 10× faster than Laravel by eliminating runtime reflection and facades.',
      icon: Cpu,
      badge: 'Benchmarks',
      actionText: 'Explore Benchmarks',
      actionTarget: () => onNavigate('home', 'benchmarks'),
    },
    {
      id: 5,
      question: 'How to install it',
      summary: 'One standard Composer command creates your application framework dependency.',
      detail: 'composer create-project flintphp/skeleton my-app',
      isCode: true,
      code: 'composer create-project flintphp/skeleton my-app\ncd my-app',
      icon: Terminal,
      badge: 'Installation',
      actionText: 'Installation Guide',
      actionTarget: () => onNavigate('docs', 'installation'),
    },
    {
      id: 6,
      question: 'How to create an application',
      summary: 'Inspect the bin/flint console utility or start the PHP development server.',
      detail: 'php bin/flint',
      isCode: true,
      code: 'php bin/flint\nphp -S localhost:8000 -t public',
      icon: FileCode2,
      badge: 'Workflow',
      actionText: 'Project Guide',
      actionTarget: () => onNavigate('docs', 'project-structure'),
    },
    {
      id: 7,
      question: 'How to build the first route/API',
      summary: 'Declare routes in routes/api.php with typed Request and Response objects.',
      detail: `$router->get('/api/users', fn(Request $req): Response => Response::json($users));`,
      isCode: true,
      code: `$router->get('/api/hello', function (Request $request): Response {\n    return Response::json(['message' => 'Hello from FlintPHP']);\n});`,
      icon: Code2,
      badge: 'First Route',
      actionText: 'Routing Tutorial',
      actionTarget: () => onNavigate('docs', 'first-application'),
    },
    {
      id: 8,
      question: 'Where the documentation is',
      summary: 'Full official documentation platform integrated with search, code snippets, and guides.',
      detail:
        'Comprehensive documentation covering Getting Started, Core Architecture, Data Layer, Security, Infrastructure, Testing, and API Reference.',
      icon: BookOpen,
      badge: 'Docs',
      actionText: 'Open Documentation',
      actionTarget: () => onNavigate('docs'),
    },
    {
      id: 9,
      question: 'Where the source code is',
      summary: 'Open source under the permissive MIT license on GitHub (chethanhrx/flintphp).',
      detail:
        'Official repository: github.com/chethanhrx/flintphp and official project skeleton: github.com/chethanhrx/flintphp.',
      icon: FolderGit2,
      badge: 'Open Source',
      actionText: 'GitHub Repository',
      externalUrl: 'https://github.com/chethanhrx/flintphp',
    },
  ];

  const handleCopy = (code: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).catch(() => alert('Copy failed — select the code manually.'));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-3 shadow-xs">
            <span>30-SECOND ESSENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            Everything you need to know in 30 seconds.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            No marketing ambiguity. Nine direct answers to how FlintPHP works, why it exists, and how to start building immediately.
          </p>
        </div>

        {/* 9-Point Interactive Grid (Box-in-Box layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeItem === idx;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(idx)}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-50/80 border-orange-600 shadow-sm ring-1 ring-orange-600/20'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 text-orange-600 text-xs font-mono font-bold">
                      0{item.id}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-600 px-2 py-0.5 rounded bg-stone-100 border border-stone-200 font-medium">
                      {item.badge}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="text-base font-semibold text-stone-900 mb-2 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{item.question}</span>
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Code snippet if applicable */}
                  {item.isCode && item.code && (
                    <div className="relative mb-4 bg-stone-900 p-3 rounded-lg border border-stone-800 font-mono text-xs text-stone-100 overflow-x-auto group/code">
                      <pre className="text-xs text-orange-400">{item.code}</pre>
                      <button
                        type="button"
                        onClick={(e) => handleCopy(item.code!, idx, e)}
                        className="absolute top-2 right-2 p-1.5 rounded bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Action Link */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  {item.externalUrl ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700"
                    >
                      <span>{item.actionText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        item.actionTarget?.();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 cursor-pointer"
                    >
                      <span>{item.actionText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
