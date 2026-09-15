import React, { useState } from 'react';
import { Activity, ShieldCheck, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export const BenchmarkSection: React.FC = () => {
  const [showMethodology, setShowMethodology] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  
  const reproduceCmd = 'php -S localhost:8000 -t public/ & wrk -t4 -c50 -d10s http://localhost:8000/text';

  const copyReproduceCmd = () => {
    navigator.clipboard.writeText(reproduceCmd).catch(() => alert('Copy failed — select the code manually.'));
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="benchmarks" className="py-24 border-t border-stone-800 bg-stone-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-orange-600/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-900 border border-stone-800 text-xs font-mono text-orange-600 font-semibold mb-6">
            <Activity className="w-3.5 h-3.5" />
            <span>MEASURED LOCALLY WITH PHP BUILT-IN SERVER, CONCURRENCY 50</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Performance Measurements
          </h2>
          <p className="text-lg text-stone-400 max-w-2xl leading-relaxed">
            FlintPHP prioritizes low kernel overhead. Here is how it compares on a simple plaintext endpoint.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl bg-black border border-stone-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-6">
            {/* FlintPHP Bar */}
            <div className="group">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">FLINTPHP</span>
                <span className="text-white text-base">3,964 RPS</span>
              </div>
              <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-orange-600 to-orange-400 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Slim Bar */}
            <div className="group">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-stone-400">SLIM 4</span>
                <span className="text-stone-300">1,908 RPS</span>
              </div>
              <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-stone-600 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>

            {/* Laravel Bar */}
            <div className="group">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-stone-400">LARAVEL 11</span>
                <span className="text-stone-300">307 RPS</span>
              </div>
              <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-stone-600 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-stone-800">
            <button
              type="button"
              onClick={() => setShowMethodology(!showMethodology)}
              className="w-full flex items-center justify-between text-xs font-mono text-stone-400 hover:text-stone-200 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-stone-300">BENCHMARK REPRODUCTION</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#FF8C38]">
                <span>{showMethodology ? 'Hide methodology' : 'View reproducible test setup'}</span>
                {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showMethodology && (
              <div className="mt-4 p-5 rounded-2xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-400 space-y-4">
                <p>These numbers represent local measurements on a standard development machine using Apache Bench (ab) or wrk, sending requests to the PHP built-in server.</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-stone-500">Reproduce on your own hardware:</span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <code className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 text-[11px] truncate">
                      {reproduceCmd}
                    </code>
                    <button
                      type="button"
                      onClick={copyReproduceCmd}
                      className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors shrink-0 cursor-pointer"
                      title="Copy benchmark command"
                    >
                      {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
