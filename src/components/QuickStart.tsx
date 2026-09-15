import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, CheckCircle2, ArrowRight } from 'lucide-react';

interface QuickStartProps {
  onNavigate: (view: 'home' | 'docs', docSlug?: string) => void;
}

export const QuickStart: React.FC<QuickStartProps> = ({ onNavigate }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [apiExecuted, setApiExecuted] = useState(false);

  const steps = [
    {
      step: 1,
      title: 'Create project from official skeleton',
      command: 'composer create-project flintphp/skeleton my-app',
      desc: 'Downloads flintphp/skeleton v1.0.0 and bootstraps your application directory.',
    },
    {
      step: 2,
      title: 'Enter project directory',
      command: 'cd my-app',
      desc: 'Navigate into your new FlintPHP codebase.',
    },
    {
      step: 3,
      title: 'Inspect Flint CLI utilities',
      command: 'php bin/flint',
      desc: 'Lists built-in console commands for migrations, routes, and testing.',
    },
    {
      step: 4,
      title: 'Start PHP development server',
      command: 'php -S localhost:8000 -t public',
      desc: 'Serves the application directly through public/index.php.',
    },
  ];

  const handleCopy = (text: string, stepNum: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNum);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <section id="quick-start" className="py-16 sm:py-24 border-b border-stone-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono text-[#EA580C] font-semibold mb-3">
            <span>QUICK START WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            Zero to production API in four commands.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Follow the standard FlintPHP CLI workflow to bootstrap and test your first endpoint locally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Steps in Modular Stone Boxes */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 hover:border-stone-300 transition-all flex flex-col gap-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 text-[#EA580C] font-mono text-xs font-bold border border-orange-200">
                      {s.step}
                    </span>
                    <h3 className="text-sm font-semibold text-stone-900">{s.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">{s.desc}</span>
                </div>

                <div className="relative flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-white border border-stone-200 font-mono text-xs text-stone-900 shadow-xs">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <span className="text-[#EA580C] select-none font-bold">$</span>
                    <code className="text-stone-800 font-medium">{s.command}</code>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(s.command, s.step)}
                    className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors shrink-0 cursor-pointer"
                    title="Copy command"
                  >
                    {copiedStep === s.step ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Minimal Working FlintPHP Route / API Example */}
          <div className="lg:col-span-6">
            <div className="rounded-xl bg-[#1C1917] border border-stone-800 overflow-hidden shadow-xl">
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
                    Real FlintPHP API
                  </span>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-stone-100">
                <pre className="text-stone-100">
                  <span className="text-purple-400">&lt;?php</span>{'\n\n'}
                  <span className="text-purple-400">declare</span>(strict_types=1);{'\n\n'}
                  <span className="text-purple-400">use</span> <span className="text-sky-300">Flint\Routing\Router</span>;{'\n'}
                  <span className="text-purple-400">use</span> <span className="text-sky-300">Flint\Http\Response</span>;{'\n'}
                  <span className="text-purple-400">use</span> <span className="text-sky-300">Flint\Http\ServerRequest</span>;{'\n\n'}
                  <span className="text-stone-500">/** @var Router $router */</span>{'\n'}
                  $router-&gt;<span className="text-emerald-400">get</span>(<span className="text-amber-300">'/api/status'</span>, <span className="text-purple-400">function</span> (<span className="text-sky-300">ServerRequest</span> $request): <span className="text-sky-300">Response</span> &#123;{'\n'}
                  {'    '}<span className="text-purple-400">return</span> <span className="text-sky-300">Response</span>::<span className="text-emerald-400">json</span>([
                  {'\n'}
                  {'        '}<span className="text-amber-300">'status'</span> =&gt; <span className="text-amber-300">'operational'</span>,{'\n'}
                  {'        '}<span className="text-amber-300">'framework'</span> =&gt; <span className="text-amber-300">'FlintPHP'</span>,{'\n'}
                  {'        '}<span className="text-amber-300">'version'</span> =&gt; <span className="text-amber-300">'1.0.0'</span>,{'\n'}
                  {'        '}<span className="text-amber-300">'php_version'</span> =&gt; PHP_VERSION,{'\n'}
                  {'        '}<span className="text-amber-300">'time'</span> =&gt; time(),{'\n'}
                  {'    '}]);{'\n'}
                  &#125;);
                </pre>
              </div>

              {/* Interactive Endpoint Simulation / Test */}
              <div className="border-t border-stone-800 bg-[#141416] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <Terminal className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>curl -X GET http://localhost:8000/api/status</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApiExecuted(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
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
  "version": "1.0.0",
  "php_version": "8.3.4",
  "time": ${Math.floor(Date.now() / 1000)}
}`}</pre>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
              <span>Official skeleton includes tests, migrations, and CLI</span>
              <button
                type="button"
                onClick={() => onNavigate('docs', 'first-application')}
                className="text-[#EA580C] hover:text-[#C2410C] font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read First Application Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
