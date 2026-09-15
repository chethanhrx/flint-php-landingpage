import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, ArrowRight, Server, Apple, Monitor } from 'lucide-react';

interface QuickStartProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const QuickStart: React.FC<QuickStartProps> = ({ onNavigate }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeOS, setActiveOS] = useState<'linux' | 'macos' | 'windows'>('linux');
  const [apiExecuted, setApiExecuted] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => alert('Copy failed.'));
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getOsCommand = () => {
    if (activeOS === 'windows') {
      return 'composer create-project flintphp/skeleton my-app; cd my-app; php bin/flint';
    }
    return 'composer create-project flintphp/skeleton my-app && cd my-app && php bin/flint';
  };

  return (
    <section id="quickstart" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            Create your first FlintPHP app
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Start with the official Skeleton. One command creates a ready-to-develop application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Installation Flow */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Installation: Skeleton */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 bg-white">
                <span className="font-semibold text-stone-900 text-sm">1. Create Project & Run CLI</span>
                <div className="flex bg-stone-100 rounded-md p-0.5">
                  <button
                    onClick={() => setActiveOS('linux')}
                    className={`px-3 py-1 text-[11px] font-bold uppercase rounded-sm transition-colors ${activeOS === 'linux' ? 'bg-white shadow-xs text-orange-600' : 'text-stone-500 hover:text-stone-700'}`}
                    aria-label="Linux installation command"
                    aria-pressed={activeOS === 'linux'}
                  >
                    Linux
                  </button>
                  <button
                    onClick={() => setActiveOS('macos')}
                    className={`px-3 py-1 text-[11px] font-bold uppercase rounded-sm transition-colors ${activeOS === 'macos' ? 'bg-white shadow-xs text-orange-600' : 'text-stone-500 hover:text-stone-700'}`}
                    aria-label="macOS installation command"
                    aria-pressed={activeOS === 'macos'}
                  >
                    macOS
                  </button>
                  <button
                    onClick={() => setActiveOS('windows')}
                    className={`px-3 py-1 text-[11px] font-bold uppercase rounded-sm transition-colors ${activeOS === 'windows' ? 'bg-white shadow-xs text-orange-600' : 'text-stone-500 hover:text-stone-700'}`}
                    aria-label="Windows PowerShell installation command"
                    aria-pressed={activeOS === 'windows'}
                  >
                    Windows
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[#18181B] relative group">
                <pre className="font-mono text-xs sm:text-[13px] text-stone-300 whitespace-pre-wrap break-all pr-8 leading-relaxed">
                  <span className="text-orange-500 font-bold select-none">$</span> {getOsCommand()}
                </pre>
                <button
                  type="button"
                  aria-label="Copy installation command"
                  onClick={() => handleCopy(getOsCommand(), 'install')}
                  className="absolute top-4 right-4 p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                >
                  {copiedSection === 'install' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 2: Dev Server */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="px-4 py-3 bg-white border-b border-stone-200">
                <span className="font-semibold text-stone-900 text-sm">2. Start development server</span>
              </div>
              <div className="p-4 bg-[#18181B] relative group">
                <pre className="font-mono text-xs sm:text-[13px] text-stone-300 whitespace-pre-wrap break-all pr-8 leading-relaxed">
                  <span className="text-orange-500 font-bold select-none">$</span> php -S localhost:8000 -t public/
                </pre>
                <button
                  type="button"
                  aria-label="Copy development server command"
                  onClick={() => handleCopy('php -S localhost:8000 -t public/', 'server')}
                  className="absolute top-4 right-4 p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                >
                  {copiedSection === 'server' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Secondary Installation: Framework */}
            <div className="pt-4 border-t border-stone-200">
              <span className="text-sm font-semibold text-stone-700 mb-2 block">Existing Composer project</span>
              <div className="relative flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-white border border-stone-200 font-mono text-xs text-stone-900 shadow-xs">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-orange-600 select-none font-bold">$</span>
                  <code className="text-stone-800 font-medium whitespace-nowrap">composer require flintphp/framework</code>
                </div>
                <button
                  type="button"
                  aria-label="Copy framework package command"
                  onClick={() => handleCopy('composer require flintphp/framework', 'framework')}
                  className="p-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedSection === 'framework' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Working FlintPHP Route / API Example */}
          <div className="lg:col-span-6">
            <div className="rounded-xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#18181B] border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-stone-400 ml-2">routes/api.php</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                    Interactive Example
                  </span>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-stone-100">
                <pre className="text-stone-100">
                  <span className="text-purple-400">&lt;?php</span>{'\n\n'}
                  <span className="text-purple-400">declare</span>(strict_types=1);{'\n\n'}
                  <span className="text-purple-400">use</span> <span className="text-sky-300">FlintPHP\Framework\Routing\Router</span>;{'\n'}
                  <span className="text-purple-400">use</span> <span className="text-sky-300">FlintPHP\Framework\Http\Response</span>;{'\n'}
                  <span className="text-purple-400">use</span> <span className="text-sky-300">FlintPHP\Framework\Http\Request</span>;{'\n\n'}
                  <span className="text-stone-500">/** @var Router $router */</span>{'\n'}
                  $router-&gt;<span className="text-emerald-400">get</span>(<span className="text-amber-300">'/api/status'</span>, <span className="text-purple-400">function</span> (<span className="text-sky-300">Request</span> $request): <span className="text-sky-300">Response</span> &#123;{'\n'}
                  {'    '}<span className="text-purple-400">return</span> <span className="text-sky-300">Response</span>::<span className="text-emerald-400">json</span>([{'\n'}
                  {'        '}<span className="text-amber-300">'status'</span> =&gt; <span className="text-amber-300">'operational'</span>,{'\n'}
                  {'        '}<span className="text-amber-300">'framework'</span> =&gt; <span className="text-amber-300">'FlintPHP'</span>,{'\n'}
                  {'        '}<span className="text-amber-300">'time'</span> =&gt; time(),{'\n'}
                  {'    '}]);{'\n'}
                  &#125;);
                </pre>
              </div>

              {/* Interactive Endpoint Simulation / Test */}
              <div className="border-t border-stone-800 bg-[#141416] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <Terminal className="w-3.5 h-3.5 text-orange-600" />
                    <span>curl -X GET http://localhost:8000/api/status</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApiExecuted(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Send Request</span>
                  </button>
                </div>

                {apiExecuted && (
                  <div className="bg-[#0C0A09] p-3 rounded-lg border border-stone-800 font-mono text-xs text-emerald-400 animate-in fade-in duration-200">
                    <div className="text-[11px] text-stone-500 mb-1">HTTP/1.1 200 OK • Content-Type: application/json</div>
                    <pre>{`{
  "status": "operational",
  "framework": "FlintPHP",
  "time": ${Math.floor(Date.now() / 1000)}
}`}</pre>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-stone-500 px-1">
              <span>Skeleton includes routing, middleware, and standard folder structure.</span>
              <button
                type="button"
                onClick={() => onNavigate('docs', 'routing')}
                className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Routing Docs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
