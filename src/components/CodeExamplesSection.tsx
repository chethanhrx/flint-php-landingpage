import React, { useState } from 'react';
import { CODE_EXAMPLES, CodeExample } from '../data/codeExamples';
import { Copy, Check, FileCode, Terminal, Sparkles } from 'lucide-react';

export const CodeExamplesSection: React.FC = () => {
  const [selectedExampleId, setSelectedExampleId] = useState<string>('bootstrap');
  const [copied, setCopied] = useState<boolean>(false);

  const activeExample =
    CODE_EXAMPLES.find((e) => e.id === selectedExampleId) || CODE_EXAMPLES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-examples" className="py-16 sm:py-24 border-b border-stone-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-3">
            <span>PRODUCTION-READY PHP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            Real code. Zero fabricated syntax.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Copyable PHP 8.2+ examples illustrating how to structure applications, handle requests, bind dependencies, and write safe database transactions.
          </p>
        </div>

        {/* Layout: Selector List + Code Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of 12 real code examples (Boxed List) */}
          <div className="lg:col-span-4 space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {CODE_EXAMPLES.map((example) => {
              const isSelected = selectedExampleId === example.id;

              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => setSelectedExampleId(example.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-stone-50 border-orange-600 shadow-xs ring-1 ring-orange-600/20'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCode
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-orange-600' : 'text-stone-400'
                      }`}
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-stone-900 truncate">
                        {example.title}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 truncate">
                        {example.filename}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-stone-600 px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 shrink-0 font-medium">
                    {example.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Code Editor & Runner */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 bg-[#18181B] border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono font-medium text-stone-200">
                    {activeExample.filename}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 px-2 py-0.5 rounded bg-stone-800/80 border border-stone-700">
                    PHP 8.2+
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 border border-stone-700 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description Bar */}
              <div className="px-4 py-2 bg-[#141416] border-b border-stone-800 text-xs text-stone-400">
                <span className="font-semibold text-stone-200 mr-1.5">Concept:</span>
                {activeExample.description}
              </div>

              {/* Code Pre Block */}
              <div className="p-4 sm:p-6 bg-[#0C0A09] font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-stone-200">
                <pre className="text-stone-200 whitespace-pre">{activeExample.code}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
